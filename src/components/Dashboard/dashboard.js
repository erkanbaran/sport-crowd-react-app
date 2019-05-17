import React, { Component } from 'react';
import style from './dashboard.css'
import FormField from '../Widgets/FormFields/formField';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { FirebaseTeams, FirebaseArticles, firebase } from '../../firebase';
import Uploader from '../Widgets/FileUploader/fileUploader';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        postError: '',
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter author'
                },
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter title'
                },
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            },
            team: {
                element: 'select',
                value: '',
                config: {
                    name: '_input',
                    options: []
                },
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    }

    componentDidMount() {
        this.loadTeam();
    }

    loadTeam = () => {
        FirebaseTeams.once('value')
            .then((snapshot) => {
                let team = [];

                snapshot.forEach((childSnapshot) => {
                    team.push({
                        id: childSnapshot.val().teamId,
                        name: childSnapshot.val().city
                    })
                })

                const newFormdata = { ...this.state.formData };
                const newElement = { ...newFormdata['team'] };
                newElement.config.options = team;
                newFormdata['team'] = newElement;

                this.setState({
                    formdata: newFormdata
                })
            })
    }

    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        if (content === '') {
            newElement.value = element.event.target.value;

        } else {
            newElement.value = content;

        }

        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        this.setState({
            formData: newFormdata
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if (element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5' : ''}`;
            error = !valid ? [valid, message] : error
        }

        if (element.validation.reqiured) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;
            error = !valid ? [valid, message] : error
        }
        return error;
    }

    showError = () => (
        this.state.registerError !== '' ?
            <div className={style.error}>{this.state.registerError}</div>
            : <div></div>
    )

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);

        this.updateForm({ id: 'body' }, html)

        this.setState({
            editorState
        })
    }


    submitForm = (event) => {
        event.preventDefault();


        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
        }
        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            this.setState({
                loading: true,
                postError: ''
            })

            FirebaseArticles.orderByChild('id')
                .limitToLast(1).once('value')
                .then(snapshot => {
                    let articleId = null;

                    snapshot.forEach(childSnapshot => {
                        articleId = childSnapshot.val().id
                    });

                    dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                    dataToSubmit['id'] = articleId + 1;
                    dataToSubmit['team'] = parseInt(dataToSubmit['team']);

                    FirebaseArticles.push(dataToSubmit)
                        .then(article => {
                            this.props.history.push(`/articles/${article.key}`)
                        }).catch(error => {
                            this.setState({
                                postError: error.message
                            })
                        })
                })
        }
        else {
            this.setState({
                postError: 'Something error'
            })
        }


    }

    submitButton = () => (
        this.state.loading ? 'loading..' :
            <div>
                <button type="submit">Add post</button>
            </div>
    )

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename);
    }

    render() {
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <Uploader
                        filename={(filename) => this.storeFilename(filename)}
                    ></Uploader>

                    <FormField
                        id={'author'}
                        formdata={this.state.formData.author}
                        change={(element) => this.updateForm(element)}
                    ></FormField>

                    <FormField
                        id={'title'}
                        formdata={this.state.formData.title}
                        change={(element) => this.updateForm(element)}
                    ></FormField>

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    ></Editor>

                    <FormField
                        id={'team'}
                        formdata={this.state.formData.team}
                        change={(element) => this.updateForm(element)}
                    ></FormField>

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        );
    }
}

export default Dashboard;
import React, { Component } from 'react';
import style from '../../articles.css';
// import axios from 'axios';
// import { URL } from '../../../../config';
import Header from './header';
import { firebaseDB, FirebaseTeams, firebaseLooper } from '../../../../firebase'

class NewArticles extends Component {

    state = {
        article: [],
        team: []
    }

    componentWillMount() {
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
            .then((snapshot) => {
                let article = snapshot.val();

                FirebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
                    .then((snapshot) => {
                        const team = firebaseLooper(snapshot);
                        this.setState({
                            article,
                            team
                        })
                    })
            })


        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        //     .then(response => {
        //         let article = response.data[0];

        //         axios.get(`${URL}/teams?id=${article.team}`)
        //             .then(response => {
        //                 this.setState({
        //                     article,
        //                     team: response.data
        //                 })
        //             })
        //     })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div className={style.articleWrapper}>
                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                ></Header>
                <div className={style.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={style.articleImage}
                        style={{
                            background: `url(/images/articles/${article.image})`
                        }}></div>

                    <div className={style.articleText}>
                        {article.body}
                    </div>

                </div>
            </div>
        );
    }
}

export default NewArticles;
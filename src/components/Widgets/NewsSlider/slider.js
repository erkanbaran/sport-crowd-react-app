import React, { Component } from 'react';
import SliderTemplates from '../NewsSlider/slider_templates'
import { FirebaseArticles, firebaseLooper, firebase } from '../../../firebase'

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        FirebaseArticles.limitToFirst(3).once("value")
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);

                // news.forEach((item, i) => {
                //     firebase.storage().ref('images')
                //         .child(item.image).getDownloadURL()
                //         .then(url => {
                //             news[i].image = url;

                //             this.setState({
                //                 news
                //             })
                //         })
                // })

                const asyncFunction = (item, i, cb) => {
                    firebase.storage().ref('images')
                        .child(item.image).getDownloadURL()
                        .then(url => {
                            news[i].image = url;

                            cb();
                        })
                }

                //let request=[]
                let requests = news.map((item, i) => {
                    return new Promise((resolve) => {
                        asyncFunction(item, i, resolve)
                    })
                })

                Promise.all(requests).then(() => {
                    this.setState({
                        news
                    })
                })

            });
    }

    render() {
        return (
            <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}></SliderTemplates>
        );
    }
}

export default NewsSlider;
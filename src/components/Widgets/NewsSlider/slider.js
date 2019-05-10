import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../config';
import SliderTemplates from '../NewsSlider/slider_templates'
import { FirebaseArticles, firebaseLooper } from '../../../firebase'

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        FirebaseArticles.limitToFirst(3).once("value")
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);
                this.setState({
                    news
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
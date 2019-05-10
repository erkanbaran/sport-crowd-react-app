import React, { Component } from 'react';
import style from '../../articles.css';
// import axios from 'axios';
// import { URL } from '../../../../config';
import Header from './header';
import VideosRelated from '../../../Widgets/VideosList/VideosRelated/videosRelated';
import { firebaseDB, FirebaseTeams, FirebaseVideos, firebaseLooper } from '../../../../firebase'

class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentWillMount() {
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
            .then((snapshot) => {
                let article = snapshot.val();

                FirebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
                    .then((snapshot) => {
                        const team = firebaseLooper(snapshot);
                        this.setState({
                            article,
                            team
                        });
                        this.getRelated();
                    })
            })

        // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        //     .then(response => {
        //         let article = response.data[0];

        //         axios.get(`${URL}/teams?id=${article.team}`)
        //             .then(response => {
        //                 this.setState({
        //                     article,
        //                     team: response.data
        //                 });
        //                 this.getRelated();
        //             })
        //     })
    }

    getRelated = () => {
        FirebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaseLooper(snapshot);

                FirebaseVideos
                    .orderByChild("team")
                    .equalTo(this.state.article.team)
                    .limitToFirst(3).once('value')
                    .then((snapshot) => {
                        const related = firebaseLooper(snapshot);
                        this.setState({
                            teams,
                            related
                        })
                    })
            })


        // axios.get(`${URL}/teams`)
        //     .then(response => {
        //         let teams = response.data;

        //         axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //             .then(response => {
        //                 this.setState({
        //                     teams,
        //                     related: response.data
        //                 })
        //             })
        //     })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header
                    teamData={team[0]}
                ></Header>
                <div className={style.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`http://www.youtube.com/embed/${article.url}`}
                    ></iframe>
                </div>
                <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}>
                </VideosRelated>
            </div>
        );
    }
}

export default VideoArticle;
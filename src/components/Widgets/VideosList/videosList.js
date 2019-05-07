import React, { Component } from 'react';
import style from './videosList.css';
import axios from 'axios';
import Button from '../Buttons/button'
import { URL } from '../../../config';
import VideosListTemplate from '../VideosList/videosListTemplate'


class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    request = (start, end) => {

        if (this.state.teams.length < 1) {
            axios.get(`${URL}/teams`)
                .then(response => {
                    this.setState({
                        teams: response.data
                    })
                })
        }

        axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
            .then(response => {
                this.setState({
                    videos: [...this.state.videos, ...response.data],
                    start,
                    end
                })
            })
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }

    renderVideos = () => {
        let template = null;

        switch (this.props.type) {
            case ('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}></VideosListTemplate>
                break;
            default:
                template = null;
        }
        return template;
    }

    renderButton = () => {
        return this.props.loadmore ?
            <Button type="loadmore" cta="Load More Videos" loadMore={() => this.loadMore()}></Button>
            :
            <Button type="linkto" cta="More Videos" linkTo="/videos"></Button>
    }

    renderTitle = (title) => {
        return title ?
            <h3><strong>Sports</strong> Videos</h3>
            : null
    }

    render() {
        return (
            <div className={style.videoList_wrapper}>
                {this.renderTitle(this.props.title)}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;
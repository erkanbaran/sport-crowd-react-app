import React from 'react';
import style from '../videosList.css';
import VideosListTemplate from '../videosListTemplate'


const VideosRelated = (props) => {
    return (
        <div className={style.relatedWrapper}>
            <VideosListTemplate
                data={props.data}
                teams={props.teams}

            ></VideosListTemplate>

        </div>
    );
}

export default VideosRelated;
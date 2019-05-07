import React from 'react';
import VideosList from '../../../Widgets/VideosList/videosList';


const VideosMain = () => {
    return (
        <div>
            <VideosList
                type="card"
                title={false}
                loadmore={true}
                start={0}
                amount={10}>
            </VideosList>
        </div>
    );

}

export default VideosMain;
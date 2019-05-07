import React from 'react';
import NewsSlider from '../../../Widgets/NewsSlider/slider';
import NewsList from '../../../Widgets/NewsList/newsList';


const NewsMain = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                settings={{ dots: false }}
                start={0}
                amount={3}
            >
            </NewsSlider>
            <NewsList
            type="cardMain"
            loadMore={true}
            start={3}
            amount={10}
            >
            </NewsList>
        </div>
    );

}

export default NewsMain;
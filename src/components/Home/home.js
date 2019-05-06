import React from 'react';
import NewsSlider from '../Widgets/NewsSlider/slider'
import NewsList from '../Widgets/NewsList/newsList'

const Home = () => {
    return (
        <div>
            <NewsSlider type="featured"
                start={0}
                amount={3}
                settings={{
                    dots: false
                }}>

            </NewsSlider>

            <NewsList
                type="card"
                loadmore={true}
                start={3}
                amount={3}
            >

            </NewsList>
        </div>
    )
}

export default Home;
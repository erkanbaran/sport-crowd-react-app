import React from 'react';
import TeamNfo from '../../Elements/teamNfo'
import PostData from '../../Elements/postData'


const Header = (props) => {

    const teamNfo = (team) => {
        return team ? (
            <TeamNfo team={team}></TeamNfo>
        )
            : null;
    }

    const postData = (date, author) => (
       <PostData data={{date,author}}></PostData>
    )

    return (
        <div>
            {teamNfo(props.teamData)}
            {postData(props.date, props.author)}
        </div>
    );
};

export default Header;
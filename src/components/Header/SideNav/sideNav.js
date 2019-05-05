import React from 'react';
import SideNav from 'react-simple-sidenav';

const SideNavigaton = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '200px'
                }}
            >

            </SideNav>
        </div>
    );
};

export default SideNavigaton;
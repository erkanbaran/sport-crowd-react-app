import React from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './sideNav_items'

const SideNavigaton = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#d3d3d3',
                    maxWidth: '200px'
                }}
            >
                <SideNavItems {...props}></SideNavItems>
            </SideNav>
        </div>
    );
};

export default SideNavigaton;
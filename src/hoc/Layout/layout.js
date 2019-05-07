import React from 'react';
import './layout.css';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'

class Layout extends React.Component {

    state = {
        showNav: false
    }

    toggleSidenav = (action) => {
        this.setState({
            showNav: action
        })
    }
    render() {
        return (
            <div>
                <Header
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSidenav(false)}
                    onOpenNav={() => this.toggleSidenav(true)}
                ></Header>
                {this.props.children}
                <Footer></Footer>
            </div>
        );
    }
}

export default Layout;
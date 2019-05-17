import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { firebase } from './firebase'

const App = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Routes {...props}>

                </Routes>
            </BrowserRouter>
        </div>
    );
};
firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<App user={user} />, document.getElementById('root'));
})
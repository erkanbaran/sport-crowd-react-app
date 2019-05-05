import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                </Routes>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

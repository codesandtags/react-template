import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadable from '@loadable/component';

const Header = loadable(() => import(/* webpackChunkName: "Header" */ './components/Header/Header'));
const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ './components/Footer/Footer'));
const Home = loadable(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const News = loadable(() => import(/* webpackChunkName: "News" */ './pages/News'));
const Redux = loadable(() => import(/* webpackChunkName: "Redux" */ './pages/ReduxComponent/ReduxComponent'));
const RequestAPI = loadable(() => import(/* webpackChunkName: "RequestAPI" */ './pages/RequestAPI/RequestAPI'));
const FormikForm = loadable(() => import(/* webpackChunkName: "FormikForm" */ './pages/FormikForm/FormikForm'));

class App extends Component {
    render() {
        const props = {
            children: null
        };

        return (
            <div>
                <Helmet>
                    <title>App</title>
                </Helmet>
                <Route path="/" render={() => <Header/>}/>
                <div className="content">
                    <Switch>
                        <Route exact path="/" render={() => <Home/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/redux" render={() => <Redux/>}/>
                        <Route path="/axios" render={() => <RequestAPI {...props} />}/>
                        <Route path="/formik" render={() => <FormikForm />}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;

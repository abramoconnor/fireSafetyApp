import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './buildings/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Staging from './buildings/Staging';
import Fire_Extinguisher from './buildings/Fire Extinguisher';
import FEInspection_List from "./buildings/FEInspectionList";
import AED from './buildings/AED';
import Form from "./buildings/Form";
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
	timeout: 3000,
	position: 'top center'
};
//blane testing master push two
class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Fragment>
							<Header />
							<Alerts />
							<div className="container">
								<Switch>
									<PrivateRoute exact path="/" component={Dashboard} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									<PrivateRoute exact path="/Staging" component={Staging} />
									<PrivateRoute exact path="/Fire Extinguisher" component={Fire_Extinguisher} />
									<PrivateRoute exact path="/FEInspection" component={FEInspection_List} />
									<PrivateRoute exact path="/AED" component={AED} />
									<PrivateRoute exact path="/Form" component={Form} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

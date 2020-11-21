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
import FireExtinguisherList from './buildings/FireExtinguisherList';
import FEInspection from "./buildings/FEInspection";
import FireExtinguisher from "./buildings/FireExtinguisher";
import AED from './buildings/AED';
import AEDInspection_List from "./buildings/AEDInspectionList";
import Form from "./buildings/Form";
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import Home from "./buildings/Home";
import Sprinkler from "./buildings/Sprinkler";
import SprinklerInspection_List from "./buildings/SprinklerInspectionList";
import Alarm from "./buildings/Alarm";
import AlarmInspection_List from "./buildings/AlarmInspectionList";
import CreateFEForm  from "./buildings/CreateFEForm";
import CreateBuildingForm  from "./buildings/CreateBuildingForm";


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
									<PrivateRoute exact path="/FireExtinguisherList" component={FireExtinguisherList} />
									<PrivateRoute exact path="/FEInspection" component={FEInspection} />
									<PrivateRoute exact path="/FireExtinguisher" component={FireExtinguisher} />
									<PrivateRoute exact path="/AED" component={AED} />
									<PrivateRoute exact path="/AEDInspection" component={AEDInspection_List} />
									<PrivateRoute exact path="/Form" component={Form} />
									<PrivateRoute exact path="/Home" component={Home} />
									<PrivateRoute exact path="/Alarm" component={Alarm} />
									<PrivateRoute exact path="/AlarmInspection" component={AlarmInspection_List} />
									<PrivateRoute exact path="/Sprinkler" component={Sprinkler} />
									<PrivateRoute exact path="/SprinklerInspection" component={SprinklerInspection_List} />
									<PrivateRoute exact path="/CreateFEForm" component={CreateFEForm} />
									<PrivateRoute exact path="/CreateBuildingForm" component={CreateBuildingForm} />
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

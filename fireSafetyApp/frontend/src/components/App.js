import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import store from '../store';
import AlertTemplate from 'react-alert-template-basic';
import { loadUser } from '../actions/auth';
import PrivateRoute from './common/PrivateRoute';

import Login from './accounts/Login';
import Register from './accounts/Register';
import Header from './layout/Header';
import Home from "./buildings/Home";
import CreateBuildingForm  from "./buildings/CreateBuildingForm";
import Dashboard from './buildings/Dashboard';
import Alerts from './layout/Alerts';
import Assets from './buildings/Assets';
import FireExtinguisherList from './buildings/FireExtinguishers/FireExtinguisherList';
import CreateFEForm  from "./buildings/FireExtinguishers/CreateFEForm";
import FireExtinguisher from "./buildings/FireExtinguishers/FireExtinguisher";
import FEInspection from "./buildings/FireExtinguishers/FEInspection";
import FEReport  from "./buildings/FireExtinguishers/FEReport";
import AED from './buildings/AEDs/AED';
import AEDInspection_List from "./buildings/AEDs/AEDInspectionList";
import Alarm from "./buildings/Alarms/Alarm";
import AlarmInspection_List from "./buildings/Alarms/AlarmInspectionList";
import Sprinkler from "./buildings/Sprinklers/Sprinkler";
import SprinklerInspection_List from "./buildings/Sprinklers/SprinklerInspectionList";


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
									<Route exact path="/login" component={Login} />
									<PrivateRoute exact path="/" component={Dashboard} />
									<PrivateRoute exact path="/register" component={Register} />
									<PrivateRoute exact path="/Home" component={Home} />
									<PrivateRoute exact path="/CreateBuildingForm" component={CreateBuildingForm} />
									<PrivateRoute exact path="/Assets" component={Assets} />
									<PrivateRoute exact path="/FireExtinguisherList" component={FireExtinguisherList} />
									<PrivateRoute exact path="/CreateFEForm" component={CreateFEForm} />
									<PrivateRoute exact path="/FireExtinguisher" component={FireExtinguisher} />
									<PrivateRoute exact path="/FEInspection" component={FEInspection} />
									<PrivateRoute exact path="/FEReport" component={FEReport} />
									<PrivateRoute exact path="/AED" component={AED} />
									<PrivateRoute exact path="/AEDInspection" component={AEDInspection_List} />
									<PrivateRoute exact path="/Alarm" component={Alarm} />
									<PrivateRoute exact path="/AlarmInspection" component={AlarmInspection_List} />
									<PrivateRoute exact path="/Sprinkler" component={Sprinkler} />
									<PrivateRoute exact path="/SprinklerInspection" component={SprinklerInspection_List} />
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

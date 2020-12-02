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
import AlarmSystem from "./buildings/Alarms/AlarmSystem";
import CreateASForm from "./buildings/Alarms/CreateASForm";
import ASInspection from "./buildings/Alarms/AlarmSystemInspection";
import ASReport from "./buildings/Alarms/AlarmSystemReport";
import SprinklerSystemList from './buildings/Sprinklers/SprinklerSystemList';
import CreateSSForm  from "./buildings/Sprinklers/CreateSSForm";
import SprinklerSystem from "./buildings/Sprinklers/SprinklerSystem";
import SSInspection from "./buildings/Sprinklers/SSInspection";
import SSReport  from "./buildings/Sprinklers/SSReport";
import AED from './buildings/AEDs/AED';
import AEDInspection_List from "./buildings/AEDs/AEDInspectionList";


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
									<PrivateRoute exact path="/AlarmSystem" component={AlarmSystem} />
									<PrivateRoute exact path="/ASInspection" component={ASInspection} />
									<PrivateRoute exact path="/ASReport" component={ASReport} />
									<PrivateRoute exact path="/CreateASForm" component={CreateASForm} />
									<PrivateRoute exact path="/SprinklerSystemList" component={SprinklerSystemList} />
									<PrivateRoute exact path="/CreateSSForm" component={CreateSSForm} />
									<PrivateRoute exact path="/SprinklerSystem" component={SprinklerSystem} />
									<PrivateRoute exact path="/SSInspection" component={SSInspection} />
									<PrivateRoute exact path="/SSReport" component={SSReport} />
									<PrivateRoute exact path="/AED" component={AED} />
									<PrivateRoute exact path="/AEDInspection" component={AEDInspection_List} />
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

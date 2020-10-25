import ReactDOM from 'react-dom';
import goat from './goat.jpg';
import kocharena from './charles koch arena.jpg';
import './App.css';
import React, { Fragment, Component, useEffect, useState } from 'react';
import { Button } from './components/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SimpleTable from './components/Table';
import Header from './components/header.jsx';
import wsu from './wsu.jpg';
import Sprinkler from './components/sprinkler';
import Alarm from './components/Alarm';
import AED from './components/AED';

/* the main part, the "adjustdown" is a css function in button.css, I was learning how to move the button. the problem is I cant just copy and past this button code
to make another button, it throws an error and the solution I found online says I need to use fragments most likely.*/
/*const App = () => {
	return (
		<Router>
			<main>
				<nav />
				<Route path="/" exact component={Home} />
				<Route path="/about" component={About} />
				<Route path="/Inventory" component={Inventory} />
				<Route path="/Fire_Extinguishers" component={Fire_Extinguishers} />
				<Route path="/Sprinklers" component={Sprinklers} />
				<Route path="/Alarms" component={Alarms} />
				<Route path="/AEDs" component={AEDs} />
			</main>
		</Router>
	);
	};*/
/*You have to wrap the button in a router to pass links. I got it to swap pages but the button was still on the page. We need to set up a home.*/

/* goes inside main up there ^*/

/*doesnt work*/
/*yes it does*/
//export default App;

export const Home = () => (
	<Fragment>
		<Header />
		<div className="App buttons">
			<a href="about">
				<li>
					<Link to="/about">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Building 1
						</Button>
					</Link>
				</li>
			</a>

			<Button
				onClick={() => {
					console.log('click click click');
				}}
				type="button"
				buttonStyle="btn--white--outline"
				buttonSize="btn--medium"
			>
				Building 2
			</Button>

			<Button
				onClick={() => {
					console.log('click click click');
				}}
				type="button"
				buttonStyle="btn--white--outline"
				buttonSize="btn--medium"
			>
				Building 3
			</Button>

			<Button
				onClick={() => {
					console.log('click click click');
				}}
				type="button"
				buttonStyle="btn--white--outline"
				buttonSize="btn--medium"
			>
				Building 4
			</Button>

			<Button
				onClick={() => {
					console.log('click click click');
				}}
				type="button"
				buttonStyle="btn--white--outline"
				buttonSize="btn--medium"
			>
				Building 5
			</Button>

			<Button
				onClick={() => {
					console.log('click click click');
				}}
				type="button"
				buttonStyle="btn--white--outline"
				buttonSize="btn--medium"
			>
				Building 6
			</Button>
		</div>
		<footer className="footer, footertext">
			<div>Internet Explorers 2020 ©</div>
		</footer>
	</Fragment>
);
export default Home;

/*const About = () => (
	<Fragment>
		<header className="header">
			<div>
				<img alt="wichita" className="fiximage" src={wsu} />
				<div className="fixtext">Building 1</div>
			</div>
		</header>
		<div className="App buttons">
			<a href="about">
				<li>
					<Link to="/Inventory">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Inventory
						</Button>
					</Link>
				</li>
			</a>
			<a href="about">
				<li>
					<Link to="/Inspections">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Inspections
						</Button>
					</Link>
				</li>
			</a>
		</div>
		<footer className="footer, footertext">
			<div>Internet Explorers 2020 ©</div>
		</footer>
	</Fragment>
);

const Fire_Extinguishers = () => (
	<Fragment>
		<div>
			<SimpleTable />
		</div>
	</Fragment>
);


const Inventory = () => (
	<Fragment>
		<header className="header">
			<div>
				<img alt="wichita" className="fiximage" src={wsu} />
				<div className="fixtext">Inventory</div>
			</div>
		</header>
		<div className="App buttons">
			<a href="about">
				<li>
					<Link to="/Fire_Extinguishers">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Fire Extinguishers
						</Button>
					</Link>
				</li>
			</a>
			<a href="about">
				<li>
					<Link to="/Sprinklers">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Sprinklers
						</Button>
					</Link>
				</li>
			</a>
			<a href="about">
				<li>
					<Link to="/Alarms">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							Alarms
						</Button>
					</Link>
				</li>
			</a>
			<a href="about">
				<li>
					<Link to="/AEDs">
						<Button
							onClick={() => {
								console.log('click click click');
							}}
							type="button"
							buttonStyle="btn--white--outline"
							buttonSize="btn--medium"
						>
							AEDs
						</Button>
					</Link>
				</li>
			</a>
		</div>
		<footer className="footer, footertext">
			<div>Internet Explorers 2020 ©</div>
		</footer>
	</Fragment>
);
const Sprinklers = () => (
<Fragment>
<Sprinkler />
</Fragment>
);

const Alarms = () =>(
<Fragment>
<Alarm />
</Fragment>
);

const AEDs = () => (
<Fragment>
<AED />
</Fragment>
);*/

import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class Staging extends Component {

    render() {
        const {building} = this.props.location.state
        console.log(building);
        return (
            <Fragment>
                <h1>{building.name}</h1>
				<li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Fire Extinguisher
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/AED', state:{building:building}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> AED
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Sprinkler
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Alarms
							</Button>
					</Link>
				</li>
      </Fragment>
    );
}
}

export default Staging;

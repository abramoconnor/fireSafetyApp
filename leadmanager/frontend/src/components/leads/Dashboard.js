import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';
import Buildings from './Buildings';

//this dashboard is the secondary place we go after logging in. This is where we will want to display the building buttons
export default function Dashboard() {
	return (
	<Fragment>
		<Form>
		</Form>
		<Leads>
		</Leads>
		<Buildings>	
		</Buildings>
  	</Fragment>
	);
}
//
//

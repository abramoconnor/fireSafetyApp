import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import createData from './data';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const rows = [
	createData(1, 'F8', '17 Feb 20', '17 Jan 20', 'Jim'),
	createData(2, 'F2', '18 Feb 20', '18 Jan 20', 'Steve'),
	createData(3, 'F3', '19 Feb 20', '19 Jan 20', 'Charles'),
	createData(4, 'F4', '20 Feb 20', '20 Jan 20', 'Jim'),
	createData(5, 'F5', '21 Feb 20', '21 Jan 20', 'Jim')
];

export default function Sprinkler() {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>QR Code</TableCell>
						<TableCell align="right">Location</TableCell>
						<TableCell align="right">Next Inspection</TableCell>
						<TableCell align="right">Previous Inspection</TableCell>
						<TableCell align="right">Last Inspector</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.QR}
							</TableCell>
							<TableCell align="right">{row.loc}</TableCell>
							<TableCell align="right">{row.next}</TableCell>
							<TableCell align="right">{row.prev}</TableCell>
							<TableCell align="right">{row.last}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

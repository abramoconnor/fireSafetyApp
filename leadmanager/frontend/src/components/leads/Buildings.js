import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';
import {Card} from "react-bootstrap";
import { render } from '@testing-library/react';
import { myButton } from './myButton';
import './button.css';

export class Buildings extends Component {

    render() {
		return (
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
                                Koch Arena
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
    }
}
export default connect(null, { addLead })(Buildings);


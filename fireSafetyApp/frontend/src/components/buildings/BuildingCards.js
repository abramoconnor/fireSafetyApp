import React, { Component, Fragment } from 'react';
import '../fet/app.css';
import {Card, Button} from "react-bootstrap";


const BuildingCards = () => {
    
    const buildingInfo = [
        	{title: "something", text: "Click here to access"},
        	{title: "Shocker Hall", text: "Click here to access"},
        	{title: "Heskett Center", text: "Click here to access"},
        	{title: "Koch Arena", text: "Click here to access"}
        ]

    const renderCard = (card, index) => {
        return(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                <Card.Title> {card.title} </Card.Title>
                <Card.Text>
                    Inspections
                </Card.Text>
                <Button variant="primary">{card.text}</Button>
                </Card.Body>
            </Card>
            ); 
    };

        return <div className="App">
            {buildingInfo.map(renderCard)}
        </div>
    };

    export default BuildingCards;



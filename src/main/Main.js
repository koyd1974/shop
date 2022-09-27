import React from 'react';
import { Link } from 'react-router-dom';
import bg from "./bg.jpg";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const Main = (props) => {
  
   
	return (
      <>
        {/* Main-bg */}
      <img id='main-bg' className="main-bg" src ={bg}></img>
      <Container>
      <Row>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>
      </Container>
      

     
     
      </>  
	);
};


export default Main;

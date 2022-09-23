import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card }  from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bg from "./bg.jpg";

const Main = (props) => {
  
   
	return (
      <>
        {/* Main-bg */}
      <img id='main-bg' className="main-bg" src ={bg}></img>
    
     
      </>  
	);
};

export default Main;

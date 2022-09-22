import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card }  from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Main = (props) => {
  
   
	return (
   
        <div className="container" >
          
      <Link to="/product/1">
      <Row xs={1} md={2} className="g-4">  
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col> 
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>상품 제목입니다.</Card.Title>
              <Card.Text>
            상품내용입니다.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    
      ))}
    </Row>
    </Link>
      </div>
	);
};

export default Main;

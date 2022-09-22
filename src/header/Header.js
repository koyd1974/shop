import React from 'react';
import {Link} from 'react-router-dom';
import bg from "./bg.jpg";


function Header(props) {
    return (
		<>
    {/* Navbar */}
    
    <div id="header">
            <div className="inner">
                <h1><Link to ='/'>PetShop</Link></h1>
                <ul>
                    <li><Link to ='/upload/2'>상품등록하기</Link></li>
                    <li><Link to ='/product2/3'>상품보기</Link></li>
                    <li><Link to ='/comunity/4'>커뮤니티</Link></li>
                </ul>
            </div>
        </div>   
    
      {/* Main-bg */}
      <img id='main-bg' className="main-bg" src ={bg}></img>
        
    
    </>
    );
}

export default Header;

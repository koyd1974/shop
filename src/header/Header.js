import React from 'react';
import {NavLink} from 'react-router-dom';



function Header(props) {
    return (
		<>
    {/* Navbar */}
    
    <div id="header">
            <div className="navbar">
                <h1><NavLink to ='/'style={{paddingLeft: 13, textDecoration: 'none'}}>PetShop</NavLink></h1>
                <ul>
                    <li><NavLink to ='/upload/2'style={{paddingLeft: 13, textDecoration: 'none'}}>상품등록하기</NavLink></li>
                    <li><NavLink to ='/product2/3'style={{paddingLeft: 13, textDecoration: 'none'}}>상품보기</NavLink></li>
                    <li><NavLink to ='/comunity/4'style={{paddingLeft: 13, textDecoration: 'none'}}>커뮤니티</NavLink></li>
                    <li><NavLink to ='/cart/5'style={{paddingLeft: 13, textDecoration: 'none'}}>장바구니</NavLink></li>
                </ul>
            </div>
        </div>   
    
      
        
    
    </>
    );
}

export default Header;

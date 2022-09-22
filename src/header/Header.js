import React from 'react';
import {Link} from 'react-router-dom';



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
                    <li><Link to ='/cart/5'>장바구니</Link></li>
                </ul>
            </div>
        </div>   
    
      
        
    
    </>
    );
}

export default Header;

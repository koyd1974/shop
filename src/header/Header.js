import { NavLink } from 'react-router-dom';
import { Navbar, Container} from 'react-bootstrap'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';


function Header(props) {

  
    return (
		<>
    {/* Navbar */}
    
    <div id="header">
    <Navbar bg="light" variant="light">
        <Container>
            <h1><NavLink to ='/'style={{paddingLeft: 13, textDecoration: 'none'}}>PetShop</NavLink></h1>
            <ul>
                    <li><NavLink to ='/upload/upload'style={{paddingLeft: 13, textDecoration: 'none'}}>상품등록</NavLink></li>
                    <li><NavLink to ='/product2/product2'style={{paddingLeft: 13, textDecoration: 'none'}}>상품보기</NavLink></li>
                    <li><NavLink to ='/comunity/comunity'style={{paddingLeft: 13, textDecoration: 'none'}}>커뮤니티</NavLink></li>
                    <li><NavLink to ='/cart/cart'style={{paddingLeft: 13, textDecoration: 'none'}}>장바구니</NavLink></li>
                    <li><NavLink to ='/login/login'style={{paddingLeft: 13, textDecoration: 'none', color : 'black'}}><UserOutlined /></NavLink></li>
                    <li><NavLink to ='/signup/signup'style={{paddingLeft: 13, textDecoration: 'none' , color : 'black'}}><UserAddOutlined /></NavLink></li>
                </ul>
        </Container>
      </Navbar>
        
        </div>   
    
      
        
    
    </>
    );
}

export default Header;

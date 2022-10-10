import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase'
import '../scss/Link.css'

const Header = ({isLoggedIn})=> {
  const navigate = useNavigate()

  const onClickLogOut = ()=> {
      authService.onAuthStateChanged((user)=> {
          if(user) {
              navigate("/")
              authService.signOut()
          }
      })
  }
  const onClickFunc = ()=> {
      authService.onAuthStateChanged((user)=> {
          if (user) {

          } else {
              const ok = window.confirm(`로그인이 필요한 화면입니다. 로그인하시겠습니까?`)
              if (ok === true) {
                  navigate('/login')
              } else {
                  navigate('/')
              }
          }
      })
  }

   
    return (
		<>
    {/* Navbar */}
    
    <div id="navbar">

        {isLoggedIn ?(
                        <>
                            <h1><NavLink to ='/' className='text-link'>PetShop</NavLink></h1>
                            <ul>
                                <li><NavLink to ='/upload/2' className='text-link'>상품등록하기</NavLink></li>
                                <li><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                <li><NavLink to ='/comunity/4' name='comunity' className='text-link'>커뮤니티</NavLink></li>
                                <li><NavLink to ='/cart/5' className='text-link'>장바구니</NavLink></li>
                                {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                <li><NavLink onClick={onClickLogOut} className='text-link'>logout</NavLink></li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <h1><NavLink to ='/' className='text-link'>PetShop</NavLink></h1>
                            <ul>
                                <li><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                <li><NavLink to ='/comunity/4' onClick={onClickFunc} className='text-link'>커뮤니티</NavLink></li>
                                <li><NavLink to ='/cart/5' onClick={onClickFunc} className='text-link'>장바구니</NavLink></li>
                                {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                <li><NavLink to="/login" className='text-link'>login</NavLink></li>
                                <li><NavLink to="/signup" className='text-link' >회원가입</NavLink></li>
                            </ul>
                        </>
                    )}
        

            {/* <h1><NavLink to ='/'style={{paddingLeft: 13, textDecoration: 'none'}}>PetShop</NavLink></h1>
            <ul>
                    <li><NavLink to ='/upload/upload'style={{paddingLeft: 13, textDecoration: 'none'}}>상품등록</NavLink></li>
                    <li><NavLink to ='/product2/product2'style={{paddingLeft: 13, textDecoration: 'none'}}>상품보기</NavLink></li>
                    <li><NavLink to ='/comunity/comunity'style={{paddingLeft: 13, textDecoration: 'none'}}>커뮤니티</NavLink></li>
                    <li><NavLink to ='/cart/cart'style={{paddingLeft: 13, textDecoration: 'none'}}>장바구니</NavLink></li>
                    <li><NavLink to ='/login/login'style={{paddingLeft: 13, textDecoration: 'none', color : 'black'}}><UserOutlined /></NavLink></li>
                    <li><NavLink to ='/signup/signup'style={{paddingLeft: 13, textDecoration: 'none' , color : 'black'}}><UserAddOutlined /></NavLink></li>
                </ul> */}
       
        
        </div>   
    
      
        
    
    </>
    );
}

export default Header;

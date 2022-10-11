import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase'
import '../scss/custom.scss'
import {AlignCenterOutlined} from '@ant-design/icons'


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
//   const onClick= () => {
//     setIsToggled(!isToggled);
//   }

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
          const [isToggled, setIsToggled] = useState(false);
          onClick =(onClick)=>{
            setIsToggled(!isToggled)
          }
        }
      )
  }

   
    return (
		<>
    {/* Navbar */}
    
    <nav id="navbar" className="navBar">

        {isLoggedIn ?(
                        <>
                        <h1 className='navBar_main'><NavLink to ='/' className='text-link'>PetShop</NavLink></h1>
                            <ul className="navBar_menus">
                                <li className="navBar_menus_menu"><NavLink to ='/upload/2' className='text-link'>상품등록하기</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to ='/comunity/4' name='comunity' className='text-link'>커뮤니티</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to ='/cart/5' className='text-link'>장바구니</NavLink></li>
                                {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                <li className="navBar_menus_menu"><NavLink onClick={onClickLogOut} className='text-link'>logout</NavLink></li>
                            </ul>
                            <ul className="bavBar_icons">
                            <AlignCenterOutlined onClick={onClick}/>
                            </ul>
                        </>
                    ) : (
                        <>
                            <h1 className='navBar_main'><NavLink to ='/' className='text-link'>PetShop</NavLink></h1>
                            <ul>
                                <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to ='/comunity/4' onClick={onClickFunc} className='text-link'>커뮤니티</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to ='/cart/5' onClick={onClickFunc} className='text-link'>장바구니</NavLink></li>
                                {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                <li className="navBar_menus_menu"><NavLink to="/login" className='text-link'>login</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to="/signup" className='text-link' >회원가입</NavLink></li>
                            </ul>
                            <ul className="bavBar_icons">
                            <AlignCenterOutlined  onClick={onClick} />
                            </ul>
                        </>
                    )
                    
                }
                {isToggled ?(
                        <>
                        <ul className="togleMenus">
                            <li className="toggle_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                            <li className="toggle_menu"><NavLink to ='/comunity/4' onClick={onClickFunc} className='text-link'>커뮤니티</NavLink></li>
                            <li className="toggle_menu"><NavLink to ='/cart/5' onClick={onClickFunc} className='text-link'>장바구니</NavLink></li>
                            <li className="toggle_menu"><NavLink to="/login" className='text-link'>login</NavLink></li>
                            <li className="toggle_menu"><NavLink to="/signup" className='text-link' >회원가입</NavLink></li>

                        </ul>
                     
                        </>
                    ) : (
                        <>
                         
                          
                        </>
                    )
                    
                }
        </nav>   
    </>
    );
}

export default Header;

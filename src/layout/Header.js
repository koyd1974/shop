import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase'
import '../scss/custom.scss'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'


const Header = ({isLoggedIn})=> {
    const navigate = useNavigate()
    const [isToggled, setIsToggled] = useState(false);

    const onClickLogOut = ()=> {
        authService.onAuthStateChanged((user)=> {
            if(user) {
                authService.signOut()
                navigate("/")
            }
        })
    }
    const onClickBar = ()=> {
        setIsToggled(!isToggled)
        console.log('gd')
    }
   
    return (
        <div>
    {/* Navbar */}
    
            <nav className="navBar">
                <h1 className='navBar_main'><NavLink to ='/' className='text-link'>PetShop</NavLink></h1>
                <div className='no-bar'>
                    {isLoggedIn ? (
                            <div>
                                <ul className="navBar_menus">
                                    <li className="navBar_menus_menu"><NavLink to ='/upload/2' className='text-link'>상품등록하기</NavLink></li>
                                    <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                    <li className="navBar_menus_menu"><NavLink to ='/comunity/4' name='comunity' className='text-link'>커뮤니티</NavLink></li>
                                    <li className="navBar_menus_menu"><NavLink to ='/cart/5' className='text-link'>장바구니</NavLink></li>
                                    {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                    <li className="navBar_menus_menu"><NavLink onClick={onClickLogOut} className='text-link'>logout</NavLink></li>
                                </ul>
                            </div>
                    ) : (
                        <div>
                            <ul>
                                <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                <li className="navBar_menus_menu"><NavLink to="/login" className='text-link'>login</NavLink></li>
                                <li className="navBar_menus_menu"><NavLink to="/signup" className='text-link' >회원가입</NavLink></li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='is-bar'>
                    {isToggled ? (
                        <div>
                            <ul className="bavBar_icons">
                                {isToggled ? <CloseOutlined onClick={onClickBar} /> : <MenuOutlined onClick={onClickBar} />}
                            </ul>
                            <div className={isToggled ? 'active-bar' : 'hidden-bar'}>
                                {isLoggedIn ? (
                                    <div>
                                        <ul className="navBar_menus">
                                            <li className="navBar_menus_menu"><NavLink to ='/upload/2' className='text-link'>상품등록하기</NavLink></li>
                                            <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                            <li className="navBar_menus_menu"><NavLink to ='/comunity/4' name='comunity' className='text-link'>커뮤니티</NavLink></li>
                                            <li className="navBar_menus_menu"><NavLink to ='/cart/5' className='text-link'>장바구니</NavLink></li>
                                            {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                            <li className="navBar_menus_menu"><NavLink onClick={onClickLogOut} className='text-link'>logout</NavLink></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div>
                                        <ul className='navBar_menus'>
                                            <li className="navBar_menus_menu"><NavLink to ='/product2/3' className='text-link'>상품보기</NavLink></li>
                                            {/* <li>{init ? <Router isLoggedIn={isLoggedIn} /> : '!'}</li> */}
                                            <li className="navBar_menus_menu"><NavLink to="/login" className='text-link'>login</NavLink></li>
                                            <li className="navBar_menus_menu"><NavLink to="/signup" className='text-link' >회원가입</NavLink></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <ul className="bavBar_icons">
                                {isToggled ? <CloseOutlined onClick={onClickBar} /> : <MenuOutlined onClick={onClickBar} />}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>   
        </div>
    );
}

export default Header;
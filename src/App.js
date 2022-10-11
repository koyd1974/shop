import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {  useEffect, useState } from 'react';
import { authService } from './fbase';
import Header from './layout/Header';
import Main from './main/Main';
import Product from './main/Product';
import Footer from './layout/Footer';
import Product2 from './main/Product2';
import Upload from './upload/Upload';
import Comunity from './main/Comunity';
import Cart from './main/Cart';
import Login from './page/Login';
import Signup from './page/Signup';
import "./scss/custom.scss"; 


const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null) //최초 정보값.

    useEffect(()=> {
        authService.onAuthStateChanged((user)=> {
            if (user) {
                setIsLoggedIn(true)
                setUserObj(user)
            } else {
                setIsLoggedIn(false)
            }
            setInit(true)
            console.log(userObj.uid)
        })
    }, [])
    return (
        
        <BrowserRouter>
        <div className='wrapper'>
        <div className='contentWrapper'>   
        {init ? <Header isLoggedIn={isLoggedIn} /> : "Initializing..." }
      
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
				<Route path="/product/:1" element={<Product />} />
									{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
				<Route path="/product2/:2" element={<Product2 userObj={userObj} />} />
				<Route path="/upload/:3" element={<Upload userObj={userObj} />} />
				<Route path="/Cart/:5" element={<Cart userObj={userObj} />} />
                <Route path="/comunity/:4" element={<Comunity userObj={userObj}/>} />
            </Routes>
            </div>
            <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

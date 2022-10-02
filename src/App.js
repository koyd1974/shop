import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {  useEffect, useState } from 'react';
import { authService } from './fbase';
import Header from './header/Header';
import Main from './main/Main';
import Product from './main/Product';
import Footer from './Footer/Footer';
import Product2 from './main/Product2';
import Upload from './Upload/Upload';
import Comunity from './main/Comunity';
import Cart from './main/Cart';
import Login from './Page/Login';
import Signup from './Page/Signup';
import "./scss/custom.scss"; 


const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null)

  useEffect(()=> {
      authService.onAuthStateChanged((user)=> {
          if (user) {
              setIsLoggedIn(true)
              setUserObj(user)
          } else {
              setIsLoggedIn(false)
          }
          setInit(true)
        //   console.log(userObj.uid)
      })
  }, [])
	return (
		<div className='App'>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path="/" element={<Main />} ></Route>
					<Route path='/login/:log' element={<Login />} />
                	<Route path='/signup/:sig' element={<Signup />} />
					<Route path="/product/:1" element={<Product />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					<Route path="/product2/:2" element={<Product2 />}></Route>
					<Route path="/upload/:3" element={<Upload />}></Route>
					<Route path="/comunity/:4" element={<Comunity />}></Route>
					<Route path="/Cart/:5" element={<Cart/>}></Route>
				</Routes>
				<Footer />
			</BrowserRouter>

		</div>
	);
}

export default App;

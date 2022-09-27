import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
  

const Signup = ()=> {
    const [newId, setNewId] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const onSubmit = (e)=> {
        e.preventDefault()
    }
    const CreateNewAccount = (event)=> {
        const {target: {name, value}} = event
        
        if (name === 'newId') {
            setNewId(value)
        } else if (name === 'newPassword') {
            setNewPassword(value)
        }
    }
    const onClick = async(event)=> {
        const auth = getAuth()
        const regexId = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        const regexPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
        if (regexId.test(newId) === true && regexPassword.test(newPassword) === true) {
            createUserWithEmailAndPassword(auth, newId, newPassword)
            .then((userCredential)=> {
                const user = userCredential.user
            })
            .catch((error)=> {
                setError(error.message)
            })
            navigate('/login')
        } else if (regexId.test(newId) === false && regexPassword.test(newPassword) === true) {
            event.preventDefault()
            alert(`아이디를 다시 입력하세요`)
        } else if (regexId.test(newId) === true && regexPassword.test(newPassword) === false) {
            event.preventDefault()
            alert(`비밀번호를 다시 입력하세요`)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' name='newId' value={newId} onChange={CreateNewAccount} placeholder='아이디' required/>
                <input type='password' name='newPassword' value={newPassword} onChange={CreateNewAccount} placeholder='비밀번호' required/>
                {error}
            </form>
            <button id='createBtn' onClick={onClick} name='click'>생성</button>
            <p>이미 회원이면? <Link to='/login' className='text-link'>로그인</Link></p>
        </div>
    );
}

export default Signup;
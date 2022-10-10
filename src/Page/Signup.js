import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { dbService } from '../fbase';
import '../scss/Link.css'
  

const Signup = ()=> {
    const [newId, setNewId] = useState("")
    const [name, setName] = useState("")
    const [blankId, setBlankId] = useState(false)
    const [blankName, setBlankName] = useState(false)
    const [blankPw, setBlankPw] = useState(false)
    const [blankPw2, setBlankPw2] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [userInfo, setUserInfo] = useState([])
    const [error, setError] = useState("")
    const [samePwd, setSamePwd] = useState(false)
    const [sameId, setSameId] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (e)=> {
        e.preventDefault()
    }
    const CreateNewAccount = (event)=> {
        const {target: {name, value}} = event
        
        if (name === 'newId') {
            setNewId(value)
            setSamePwd(false)
        } else if (name === 'newPassword') {
            setNewPassword(value)
            setSamePwd(true)
        }
    }
    const onChange = (e)=> {
        const {target: {value, name}} = e
        if (name === "name") {
            setName(value)
        } else if (name === "pwd2") {
            if (newPassword !== value) {
                console.log('비번이 달라요')
                setCheckPassword(value)
            } else if (newPassword === value) {
                setCheckPassword(value)
                console.log('비번 일치!')
            }
        }
    }
    const onClick = async(event)=> {
        const auth = getAuth()
        const regexId = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        const regexPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
        if (newId === "" && newPassword === "" && name === "" && checkPassword === "") {

        } else if (newId === "" && newPassword === "") {
            setBlankId(true)
            setBlankName(false)
            setBlankPw(true)
            setBlankPw2(false)
        } else if (newId === "" && name === "") {
            setBlankId(true)
            setBlankName(true)
            setBlankPw(false)
            setBlankPw2(false)
        } else if (newId === "" && checkPassword === "") {
            setBlankId(true)
            setBlankName(false)
            setBlankPw(false)
            setBlankPw2(true)
        } else if (newPassword === "" && name === "") {
            setBlankId(false)
            setBlankName(true)
            setBlankPw(true)
            setBlankPw2(false)
        } else if (newPassword === "" && checkPassword === "") {
            setBlankId(false)
            setBlankName(false)
            setBlankPw(true)
            setBlankPw2(true)
        } else if (name === "" && checkPassword === "") {
            setBlankId(false)
            setBlankName(true)
            setBlankPw(false)
            setBlankPw2(true)
        } else if (newId === "") {
            setBlankId(true)
            setBlankName(false)
            setBlankPw(false)
            setBlankPw2(false)
        } else if (newPassword === "") {
            setBlankId(false)
            setBlankName(false)
            setBlankPw(true)
            setBlankPw2(false)
        } else if (name === "") {
            setBlankId(false)
            setBlankName(true)
            setBlankPw(false)
            setBlankPw2(false)
        } else if (checkPassword === "") {
            setBlankId(false)
            setBlankName(false)
            setBlankPw(false)
            setBlankPw2(true)
        } else {
            setBlankId(false)
            setBlankName(false)
            setBlankPw(false)
            setBlankPw2(false)
            if (sameId === true) {
                if (samePwd === true) {
                    if (regexId.test(newId) === true && regexPassword.test(newPassword) === true) {
                        createUserWithEmailAndPassword(auth, newId, newPassword)
                        .then((userCredential)=> {
                            dbService.collection('userInfo').add({
                                id: newId,
                                password: newPassword,
                                nickName: name
                            })
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
                } else {
                    alert('비밀번호가 다릅니다')
                }
            } else {
                alert('중복 체크 눌러주세요')
            } 
        }
    }
    const duplicateCheck = ()=> {
        if (newId === "") {
            alert('아이디를 입력해주세요')
        } else {
            dbService.collection("userInfo").onSnapshot(snapshot=> {
                const userInfoArray = snapshot.docs.map((doc)=> ({
                    id: doc.id,
                    ...doc.data()
                }))
                setUserInfo(userInfoArray)
            })
            userInfo.map((data)=> {
                if (newId === data.id) {
                    setNewId(false)
                    setNewId("")
                } else if (newId !== data.id) {
                    setSameId(true)
                }
            })
        }
    }
    return (
        <div>
            <form className='sinup-container' onSubmit={onSubmit}>
                <ul className='signup'>
                    <li>
                        <input className={blankId ? 'blank' : 'no_blank'} type='text' name='newId' value={newId} onChange={CreateNewAccount} placeholder='아이디' required/>
                        <button onClick={duplicateCheck}>{sameId ? '사용 가능한 아이디' : '중복 체크'}</button>
                    </li>
                    <li>
                        <input className={blankName ? 'blank' : 'no_blank'} name='name' type='text' placeholder='이름' value={name} onChange={onChange}/>
                    </li>
                    <li>
                        <input className={blankPw ? 'blank' : 'no_blank'} type='password' name='newPassword' value={newPassword} onChange={CreateNewAccount} placeholder='비밀번호' required/>
                    </li>
                    <li>
                        <input className={blankPw2 ? 'blank' : 'no_blank'} type='password' name='pwd2' onChange={onChange} value={checkPassword} placeholder='비밀번호 확인'/>
                    </li>
                </ul>
                {error}
                <div id='createBtn'>
                    <button id='create-user-button' onClick={onClick} name='click'>생성</button>
                </div>
            </form>
            <div id='usered'>
                <p id='usered'>이미 회원이면? <Link to='/login' className='text-link'>로그인</Link></p>
            </div>
        </div>
    );
}

export default Signup;
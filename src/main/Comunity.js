import React, { Component, useEffect } from 'react';
import { useState, useRef } from 'react';
import { dbService } from '../fbase'
import styled from 'styled-components';
import WriteButton from './WriteButton';
import "../scss/comunity.css"

const  Comunity = ({userObj})=> {
    const [write, setWrite] = useState("")
    const [writes, setWrites] = useState([])
    const date = new Date()
    const AmOrPm = parseInt(date.getHours()) <= 12 ? '오전' : '오후'
    const min = String(date.getMinutes()).padStart(2, "0")
    const hours = (parseInt(date.getHours())%12)||12;
    const scrollRef = useRef();
    useEffect(()=> {
        dbService.collection('user').onSnapshot(snapshot => {
            const writeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setWrites(writeArray)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        })
    }, [write])
    const onSubmit = (e)=> {
        e.preventDefault();
    }
    const onChange = (event)=> {
        const {target : {value}} = event
        setWrite(value)
    }
    const onClick = async()=> {
        const db = dbService
        await db.collection("user").add({ 
            text: write,
            newTime: AmOrPm,
            createdAt: Date.now(),
            time: `${hours}:${min}`,
            creatorId: userObj.email
        })
        setWrite("")
    }
    const enterEvent = (e)=> {
        if (e.keyCode === 13 && e.keyCode === 16) {
            e.preventDefault();
            const val = e.target.value;
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.value = val.substring(0, start) + "\t" + val.substring(end);
            e.target.selectionStart = e.target.selectionEnd = start + 1;
            onChange(e);
            return false;
        }
    }

    return (
        // textarea 최대 42글자까지 가능하게 만들기
        // 만약 40자가 넘으면 저절로 줄바꿈 처리
        <div>
            <div className='input-community'>
                <div className='comunity'>
                    <StyledAllwaysScrollSection ref={scrollRef}>
                        <div>
                            {writes.sort((a,b) => a.createdAt - b.createdAt).map((write)=> (
                                <WriteButton userObj={userObj} key={write.id} writeObj={write} isOwner={write.creatorId === userObj.email} />
                            ))}
                        </div>
                    </StyledAllwaysScrollSection>
                </div>
            </div>
            <form onSubmit={onSubmit} className="chat-container">
                <textarea className='Chat chat-input' rows={1} value={write} onChange={onChange} type='text' placeholder='작성해주세요' maxLength={200} onKeyDown={enterEvent} />
                <button className='Chat chat-button' onClick={onClick}>작성</button>
            </form>
        </div>
    );
}
const StyledAllwaysScrollSection = styled.div`
    overflow: scroll;
    height: 500px;
    width: 100%;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 6px;
        background-color: rgb(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`

export default  Comunity;
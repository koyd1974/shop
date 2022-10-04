import React, { useEffect } from 'react';
import { useState } from 'react';
import { dbService } from '../fbase'
import styled from 'styled-components';
import WriteButton from './WriteButton';
import "../scss/comunity.css"

const  Comunity = ({userObj})=> {
    const [write, setWrite] = useState("")
    const [writes, setWrites] = useState([])
    const date = new Date()  // 현시간 입력데이터

    useEffect(()=> {
        dbService.collection('user').onSnapshot(snapshot => {
            const writeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setWrites(writeArray)  // data 입력하기
            
        })
    }, [])
    const onSubmit = (e)=> {
        e.preventDefault();  
    }
    const onChange = (event)=> {
        const {target : {value}} = event
        setWrite(value)  //입력 값이 바뀔떄마다 value값에 포함시킨다.
    }
    const time = {
        hour: String(date.getHours()).padStart(2, "0"),
        min: String(date.getMinutes()).padStart(2, "0")  // 채팅 입력시 입력시간 추가
    }
    const onClick = async()=> {
        const db = dbService
        await db.collection("user").add({ 
            text: write,
            createdAt: Date.now(),
            time: `${time.hour}:${time.min}`,
            creatorId: userObj.email
        })
        setWrite("")
    }  // 작성버튼 클릭시 data입력.

    return (
        <div>
            <div className='comunity'>
                <StyledAllwaysScrollSection>
                    <div>
                        {writes.sort((a,b) => a.createdAt - b.createdAt).map((write)=> (
                            <WriteButton key={write.id} writeObj={write} isOwner={write.creatorId === userObj.email} />
                        ))}
                    </div>
                </StyledAllwaysScrollSection>
            </div>
            <form onSubmit={onSubmit}>
                <input value={write} onChange={onChange} type='text' placeholder='작성해주세요' maxLength={200} />
                <button onClick={onClick}>작성</button>
            </form>
        </div>
    );
}
const StyledAllwaysScrollSection = styled.div`
    overflow: scroll;
    height: 500px;
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
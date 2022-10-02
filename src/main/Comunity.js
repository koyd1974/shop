import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { dbService } from '../fbase'
import WriteButton from './WriteButton';

const  Comunity = ({userObj})=> {
    const [write, setWrite] = useState("")
    const [writes, setWrites] = useState([])

    useEffect(()=> {
        dbService.collection('user').onSnapshot(snapshot => {
            const writeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() 
            }))
            setWrites(writeArray)
        })
    }, [])

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
            createdAt: Date.now(),
            creatorId: userObj.email
        })
        setWrite("")
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={write} onChange={onChange} type='text' placeholder='작성해주세요' maxLength={200} />
                <button onClick={onClick}>작성</button>
            </form>
            <div>
                {writes((write)=> (
                    <WriteButton key={write.id} writeObj={write} isOwner={write.creatorId === userObj.email} />
                ))}
            </div>
        </div>
    );
}
export default Comunity;
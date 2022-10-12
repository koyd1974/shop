import React, { Component, useEffect, useState } from 'react';
import { dbService } from '../fbase';
import '../scss/Link.css'

const WriteButton = ({ writeObj, isOwner, userObj })=> {
    const [editing, setEditing] = useState(false)
    const [newWrite, setNewWrite] = useState(writeObj.text)
    const [isUser, setIsUser] = useState(false)
    const date = new Date()
    // console.log(userObj)
    useEffect(()=> {
        if (writeObj.creatorId === userObj.email) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [])

    const onDeleteClick = async()=> {
        const ok = window.confirm(`정말로 삭제하시겠습니까?`)
        if (ok) {
            await dbService.doc(`user/${writeObj.id}`).delete()
        }
    }
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }
    const onSubmit = (event)=> {
        event.preventDefault();
    }
    const onClick = async () => {
        if (newWrite !== writeObj.text) {
          await dbService.doc(`user/${writeObj.id}`).update({
            text: newWrite,
          });
        }
        setEditing(false);
    };
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewWrite(value);
    };
    return (
        <div>
            {
                editing ? (
                    <div className={isUser ? 'isUser' : 'notUser'}>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="수정하세요" value={newWrite} required onChange={onChange} />
                            <button onClick={onClick}>게시</button>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </div>
                ) : (
                    <div className={isUser ? 'isUser' : 'notUser'}>
                       {isUser ? (
                            <div className='Chat2'>
                                <span>{writeObj.newTime} {writeObj.time}</span>
                                <div className='chatUser'><h3>{writeObj.text}</h3></div>
                            </div> 
                       ) : (
                            <div className='Chat2'>
                                <h3 className='chatUser'>{writeObj.text}</h3>
                                <span>{writeObj.newTime} {writeObj.time}</span>
                            </div>
                       )}
                        {isOwner && (
                            <div>
                                <button onClick={toggleEditing}>수정</button>
                                <button onClick={onDeleteClick}>삭제</button>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default WriteButton;
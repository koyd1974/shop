import React, { Component, useEffect, useState } from 'react';
import { dbService } from '../fbase';
import '../css/Link.css'

const WriteButton = ({ writeObj, isOwner })=> {
    const [editing, setEditing] = useState(false)
    const [newWrite, setNewWrite] = useState(writeObj.text)
    const date = new Date()

    const time = {
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    }
    const timeString = `${time.hour}:${time.min}:${time.sec}`

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
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="수정하세요" value={newWrite} required onChange={onChange} />
                            <button onClick={onClick}>게시</button>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <div>
                        <h4>{writeObj.text}</h4>
                        <h6>{timeString}</h6>
                        {isOwner && (
                            <div>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default WriteButton;
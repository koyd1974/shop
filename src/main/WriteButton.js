import React, { useState } from 'react';
import { dbService } from '../fbase';
// import '../css/Link.css'

const WriteButton = ({ writeObj, isOwner })=> {
    const [editing, setEditing] = useState(false)
    const [newWrite, setNewWrite] = useState(writeObj.text)
   
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
    //수정을 클릭햇을 시 원래 입력햇던 값과 입력이 다를경우 다른 입력값을 업로드 함.
    const onClick = async () => {  
        if (newWrite !== writeObj.text) {
          await dbService.doc(`user/${writeObj.id}`).update({
            text: newWrite,
          });
        }
        setEditing(false);
    };
    //수정 시 바뀌는 입력값 저장
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewWrite(value);
    };
    return (
        <div>
            {
                editing ? ( //3항 연산자.
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
                        {isOwner && ( // 글쓴이 주인이면 수정,삭제 가능 기능.
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
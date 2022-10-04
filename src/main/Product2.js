import React from 'react';
import { dbService } from '../fbase'
import { useState, useEffect } from 'react';
import WriteButton from './WriteButton';
import { upload } from '@testing-library/user-event/dist/upload';


const Product2 = (props) => {
    useEffect(()=> {
        dbService.collection('user').onSnapshot(snapshot => {
            const writeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            upload(writeArray)
        })
    }, [])
    return (
        
        <>
            <h3></h3>
        </>
    );
}

export default Product2;

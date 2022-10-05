import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { storageService } from '../fbase'
import styled from 'styled-components';


const Product2 = () => {
    const [goodsArray, setGoodsArray] = useState([])
    useEffect(()=> {
        dbService.collection('goodsInfo').onSnapshot(snapshot=> {
            const goodsInfoArray = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data()
            }))
            setGoodsArray(goodsInfoArray)
        })
    }, [])
    return (
        <div>
            <div>
                <StyledAllwaysScrollSection>
                    <div>
                        <p>상품보기 페이지</p>
                        {goodsArray.sort((a,b)=> a.createdAt - b.createdAt).map((data,index)=> (
                            <div key={index}>
                                <ul>
                                    <li><img src={data.fileUrl} width={50} height={50} /></li>
                                    <li>{data.text.seller}님</li>
                                    <li>{data.text.name}</li>
                                    <li>{data.text.price}원</li>
                                    <li>{data.text.description}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </StyledAllwaysScrollSection>
            </div>
            {/* <div>
                <p>상품보기 페이지</p>
                {goodsArray.map((data,index)=> (
                    <div key={index}>{data.text.seller}님</div>
                ))}
            </div> */}
        </div>
    );    
}

export default Product2;

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
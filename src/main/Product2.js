import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
// import { storageService } from '../fbase'
import styled from 'styled-components';


const Product2 = ({userObj}) => { 
    const [goodsArray, setGoodsArray] = useState([])
    useEffect(()=> {
        dbService.collection('goodsInfo').onSnapshot(snapshot=> {
            const goodsInfoArray = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data()
            }))
            setGoodsArray(goodsInfoArray)
        })
    }, [])//useEffect 의존성배열, 디팬던시공부
    const onClick = async(data)=> {
        console.log(data)
        // 내가 넣을 값인지 찍어봐요. 그 값의 타입이 내가 넣으려는 탑인지 확인해ㅑ요
        const img = data.fileUrl
        dbService.collection("Cart").add({
            text: data.text,
            user: userObj.email,
            img
        }) // 클릭시 업로드 했던 정보를 가져옴.
    }
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
                                    <li><button onClick={onClick.bind(null, data)}>장바구니추가하기</button></li>
                                      {/* bind 함수로 인해 우리가 원하는 한가지 값만 가져옴. - > Cart로 보냄.*/}
                                </ul>
                            </div>
                        ))}
                    </div>
                </StyledAllwaysScrollSection>
            </div>
  
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
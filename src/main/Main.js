import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { getStorage, ref, getDownloadURL  } from "firebase/storage";
import styled from 'styled-components';
import bg from "./bg.jpg";

const Main = (props) => { 
  const storage = getStorage();
  
  const [goodsArray, setGoodsArray] = useState([])  
   useEffect(()=> {
      dbService.collection('goodsInfo').onSnapshot(snapshot=> { //firebase에서 goodsinfo에대한 정보를 실시간으로 업데이트
          const goodsInfoArray = snapshot.docs.map((doc)=> ({   //기존에 가지고 있는 정보에 새로운 정보가 들어왔을떄 기존 정보는 지워지지 않고 업데이트됨
              id: doc.id,
              ...doc.data()
          }))
          setGoodsArray(goodsInfoArray) //새로 만들어진 파일을 생성
      })
  }, [])
  
	return (
      <>
        {/* Main-bg */}
      <img id='main-bg' className="main-bg" src ={bg}></img>
    

      <div>
      <div>
                <StyledAllwaysScrollSection>
                    <div>
                        <p>상품보기 페이지</p>
                        {goodsArray.sort((a,b)=> a.createdAt - b.createdAt).map((data,index)=> (
                            <div key={index}>
                                <ul>
                                    <li><img src={data.fileUrl} width={50} height={50} /></li>
                                    <li>{data.text.name}</li>
                                    <li>{data.text.price}원</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </StyledAllwaysScrollSection>
            </div> 
     </div>

      </>  
	);
};

export default Main;

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
    }`

import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';

import { Carousel } from 'antd';
import bg from "./bg.jpg";
import bg2 from "./bg2.jpg";
import bg3 from "./bg3.jpg";



const Main = (props) => { 

    // mainbg antd
    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '400px',
        textAlign: 'center',
        background: '#364d79',
      };

  
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
    <Carousel autoplay>
    <div>
      <h3 style={contentStyle}><img src={bg}height='100%' width='100%'></img></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={bg2}height='100%' width='100%' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={bg3}height='100%' width='100%' /></h3>
    </div>
    </Carousel>

      <div>
      <div>
               
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
               
            </div> 
        

           
     </div>

      </>  
	);
};

export default Main;


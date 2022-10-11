import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Carousel } from 'antd';
import bg from "../img/bg.jpg";
import bg2 from "../img/bg2.jpg";
import bg3 from "../img/bg3.jpg";
import '../scss/custom.scss';



const Main = (props) => {
  const storage = getStorage()
  const [goodsArray, setGoodsArray] = useState([])
  useEffect(() => {
    dbService.collection('goodsInfo').onSnapshot((snapshot) => {
      //firebase에서 goodsinfo에대한 정보를 실시간으로 업데이트
      const goodsInfoArray = snapshot.docs.map((doc) => ({
        //기존에 가지고 있는 정보에 새로운 정보가 들어왔을떄 기존 정보는 지워지지 않고 업데이트됨
        id: doc.id,
        ...doc.data(),
      }))
      setGoodsArray(goodsInfoArray) //새로 만들어진 파일을 생성
    })
  }, [])
  return (
    <div>
      {/* Main-bg */}
      <Carousel autoplay>
        <div>
          <h3 className='contentStyle'><img src={bg}height='100%' width='100%'></img></h3>
        </div>
        <div>
          <h3 className='contentStyle'><img src={bg2}height='100%' width='100%' /></h3>
        </div>
        <div>
          <h3 className='contentStyle'><img src={bg3}height='100%' width='100%' /></h3>
        </div>
      </Carousel>
      <div>
        <div>
          {/* <div className="descriptionBox">
            <h2>애완동물들의 쇼핑몰</h2>
          </div> */}
          <div>
            <div className='title-bestgoods'>
              <span>베스트 상품</span>
            </div>
            {/* 작업 
                    1. 기본와꾸 => 애니메이션
                    2. 큰것부터 작은거*/}
              <ul id='best-goods' className="bestGoodsContainer">
                {goodsArray
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((data, index) => (
                    <li className="BestGoods" key={index}>
                      <div className={'BestGoods' + index}>
                        <ul
                          className={
                            index % 2 == 1
                              ? 'BestGoodsItem-right bestGoodsItem'
                              : 'BestGoodsItem-left bestGoodsItem'
                          }
                        >
                          <li className='imgContainer'>
                            <img src={data.fileUrl} />
                          </li>
                          <li className="itemContainer">
                            <li><span>상품명:</span> <span>{data.text.name}</span></li>
                            <li><span>가격:</span> <span>{data.text.price}원</span></li>
                            <li><span>상품 설명:</span> <span>{data.text.description}</span></li>
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Main;


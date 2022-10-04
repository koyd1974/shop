import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';



const Product2 = () => {  
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
    const Test = ()=> {
        console.log(goodsArray)
      
    }
    // const Test = ()=> {
    //     const [goodsInfo, setGoodsInfo] = useState("")
    //     dbService.collection('goodsInfo').onSnapshot(snapshot=> {
    //         const goodsInfoArray = snapshot.docs.map((doc)=> ({
    //             id: doc.id,
    //             ...doc.data()
    //         }))
    //         goodsInfoArray.map((num)=> {
                
    //         })
    //     })
    // }
    return (
        <div>
            <button onClick={Test}>test</button>
            <div>
                <p>상품보기 페이지</p>
                {goodsArray.map((data,index)=> (
                    <div key={index}>
                        <ul>    
                            <li>{data.text.fileName}</li>
                            <li>{data.text.seller}</li>
                            <li>{data.text.name}</li>
                            <li>{data.text.price}</li>
                            <li>{data.text.description}</li>  
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default Product2;
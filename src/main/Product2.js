import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { getStorage, ref, getDownloadURL  } from "firebase/storage";



const Product2 = () => {  
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


    const getImgUrl = ((fileName) => {
        getDownloadURL(ref(storage, "/dogimg/"+fileName)).then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
        
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
        console.log(url)
            
            // Or inserted into an <img> element
            // const img = document.getElementById('myimg');
            // img.setAttribute('src', url);
          })
          .catch((error) => {
            // Handle any errors
          });
    })
  
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
                             <li><img src="https://firebasestorage.googleapis.com/v0/b/dogmall-595ed.appspot.com/o/dogimg%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-10-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%207.32.57.png?alt=media&token=2adbc989-3182-4039-9fe4-3061a50582ab"></img></li>
                         </ul>
                    </div>
                ))}
            </div>
     </div>
    );    
}

export default Product2;
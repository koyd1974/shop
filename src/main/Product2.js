import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import { Button } from 'antd';


// import { storageService } from '../fbase'


const { Meta } = Card;
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

    const printTag = (data, index) => {


        

        var a = (index % 4 === 1) ? <Row> : <Row>
            
        
        a+=<Col>
        a+=<Card hoverable style={{width: 260,}} cover={<img alt="example" src={data.fileUrl}/> }>
   
        a+= <Meta title="Europe Street beat" description={data.text.name} />
        a+=<Meta description={data.text.seller} />
        a+=<Meta description={data.text.description} />
        a+=<Meta description={data.text.price} />
        a+=<Button block onClick={onClick.bind(null, data)}>장바구니추가하기</Button>
 
        a+=</Card>
        a+=</Col>
        a+=</Row>

        //document.getElementById('printData').innerHTML = a;
        
        return a
        
    }



    return (
        <div>
            <div>
                <p>상품보기 페이지</p>
                    {goodsArray.sort((a,b)=> a.createdAt - b.createdAt).map((data,index)=> (

                        printTag(data, index)

                        
                    
                       
                    ))}
                    {/* <div id="printData">

                    </div> */}
            </div>
   
            
  
        </div>
    );    
}



export default Product2;


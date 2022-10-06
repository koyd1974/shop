import { dbService } from '../fbase';
import React, { useEffect, useState } from 'react';

const Cart = ({userObj})=> {
  const [cart, setCart] = useState([])
  useEffect(()=> {
    dbService.collection("Cart").onSnapshot(snapshot=> {
      const cartArray = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }))
      const resultArray = cartArray.filter((data)=> {
        return data.user === userObj.email
      })
      setCart(resultArray)
    })
  }, [])

  const onClick = async(data)=>{
    const ok = window.confirm(`삭제하시겠습니까?`)
    if (ok){
      await dbService.doc(`Cart/${data.id}`).delete() // firebase store database 에 cart라는 경로로 이동후 내가쓴 id값을 삭제.
    }
  }
  return(
    <div>
      <div>
        {cart.sort((a,b)=> a.createdAt - b.createdAt).map((data, index)=> (
          <div key={index}>
              <ul>
                <li><img src={data.img} width={50} height={50}/></li>
                <li>상품명 : {data.text.name}</li>
                <li>{data.text.price}원</li>
                <button onClick = {onClick.bind(null, data)}>취소</button>
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart;
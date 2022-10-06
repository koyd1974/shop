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
      await dbService.doc(`carqt/${data.id}`).delete()
    }
  }
  return(
    <div>
      <div>
        {cart.sort((a,b)=> a.createdAt - b.createdAt).map((data, index)=> (
          <div key={index}>
              <ul>
                <li><img src={data.img} width={50} height={50}/></li>
                <li>{data.text}원</li>
                <button onClick = {onClick.bind(null, data)}>취소</button>
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart;
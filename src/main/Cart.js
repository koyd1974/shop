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
  return(
    <div>
      <div>
        {cart.sort((a,b)=> a.createdAt - b.createdAt).map((data, index)=> (
          <div key={index}>
              <ul>
                <li><img src={data.img} width={50} height={50}/></li>
                <li>{data.text}원</li>
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart;
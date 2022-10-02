import React, { useCallback, useEffect } from 'react'
import { Form, Divider, Input, Button } from 'antd';
// import '../scss/upload.css';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { dbService } from '../fbase'
import { useNavigate } from 'react-router-dom';


const Upload = ({userObj}) => {

//     const value = {
//         seller: seller,
//         name: name,
//         price: price,
//         description: description,
//         imgupload: imgupload  
//       }
  
  
    var file = null
    
    const useInput = (userObj) => {
        const [value, setValue] = useState(userObj);
        const handler = (event) => {
          setValue(event.target.value);
        };
        return [value, handler];
    }

    const [form] = Form.useForm();
    // const [imgupload, setImgUpload] = useInput('');
    // const [seller, setSeller] = useInput('');
    // const [name, setName] = useInput('');
    // const [price, setPrice] = useInput('');
    // const [description, setDescription] = useInput('');
    const [input, setInput] = useState({
        seller: '',
        name: '',
        price: '',
        description: ''
    })
    const [goodsInfo, setGoodsInfo] = useState([])
    const {seller, name, price, description} = input
    const navigate = useNavigate()
    
    const onChangeImage = ((event) => {
        
        file = event.target.files[0];
        console.log("file", file)
    })
    const onsubmitForm = useCallback(({ imgUpload, seller , name, price, description }) => {
       

        const formData = new FormData()
    
        
        formData.append( "seller", seller)
        formData.append( "name", name)
        formData.append( "price", price)
        formData.append( "description", description)
        formData.append(  "imgUpload", imgUpload  )
       
        
        for(  let str  of formData ) {
            // console.log( str   )
        }
        
    })
    
    // const onClick = async()=> {
    //     const db = dbService
    //     await db.collection("Name").add({ 
    //         text: form ,
    //         createdAt: Date.now(),
    //         creatorId: form.email
    //     })
    //     form("")
    // }
    
    
    useEffect(()=> {
        dbService.collection('goodsInfo').onSnapshot(snapshot=> {
            const goodsInfoArray = snapshot.docs.map(doc=> ({
                id: doc.id,
                ...doc.data()
            }))
            setGoodsInfo(goodsInfoArray)
        })
    }, [])
    const onSubmit = (e)=> {
        e.preventDefault()
    }
    const onChange = (e)=> {
        const {target: {name, value}} = e
        setInput({
            ...input,
            [name]: value
        })
    }

    const onClick = async () => {
        // const questions = window.confirm(`이 상품을 올리시겠습니까?`)
        // if (questions) {
        //     await dbService.collection("goodsInfo").add({
        //         text: input,
        //         createdAt: Date.now(),
        //         creatorId: userObj.email // userObj: props로 넘겨준 login한 user 정보
        //     });
        //     setInput("")
        //     // navigate('/product2/3')
        // }
      };
      const Test = ()=> {
        console.log(input.text)
        
        setGoodsInfo(input)
        
      }
        // 파이어베이스 -> formData 넘겨줌 ->  파이어베이스 응답 ->  응답에 따라 처리(성공/실패) -> 성공 : 상세페이지로 이동 / 메인페이지로 이동 
        //                                                                                      -> 실패 : 무슨문젠지 알림            

 
    return (
        <div id="upload-container" className='inner'>      
            <Form name="productUpload" onFinish={onsubmitForm} onSubmit={onSubmit} form={form}>  
                <Form.Item name="imgUpload"
                    label={<div className='upload-label'>상품사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="images/icons/camera.png" alt="" />
                        <span>이미지를 업로드 해주세요.</span>
                        <input type={"file"}  onChange={onChangeImage} />
                    </div>
                </Form.Item>
                <Divider/>
                <Form.Item name="seller" 
                    label={<div className='upload-label'>판매자명</div>}>
                    <Input onChange={onChange} value={seller} className="nameUpload" size='large'
                    placeholder='판매자 이름을 입력하세요 ' name="seller"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="name"
                label={<div className='upload-label'>상품이름</div>}>
                    <Input
                        onChange={onChange} value={name}
                        className='upload-name'
                        size='large'
                        placeholder='상품 이름을 입력해주세요'
                        name="name"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="price"
                label={<div className='upload-label'>상품가격</div>}>
                    <Input type='number' onChange={onChange} value={price} defaultValue={0} size="large" name="price"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="description"
                label={<div className='upload-label'>상품소개</div>}>
                <Input.TextArea
                    onChange={onChange} value={description}
                    size='large'
                    id = "product-description"
                    name="description"
                    maxLength={300}
                    placeholder="상품 소개를 적어주세요"
                />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType='submit' onClick={onClick} >
                        상품등록하기
                    </Button>
                    <button onClick={Test}>TEST</button>
                    
                </Form.Item>
            </Form>
        </div>
    );
};

export default Upload;
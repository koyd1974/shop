import { Form, Divider, Input, Button, Result } from 'antd';
// import '../scss/upload.css';
import 'antd/dist/antd.min.css';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { dbService } from '../fbase'
import { storageService } from '../fbase'
import { useNavigate } from 'react-router-dom';



const Upload = ({userObj}) => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    // 서버로 전달하기위해 하나의 input값으로 지정 textData
    const [goods, setGoods] = useState({
        seller: '',
        name: '',
        price: '',
        description: ''
    }) 
    const {seller, name, price, description} = goods  
    
    const onChange = (e)=> {
        const {target: {name, value}} = e
        setGoods({
            ...goods,
            [name]: value
        })
    } //input갑에 저장하기 위한 함수


    const onClick = async () => {
        const fileRef = storageService.ref().child(`dogimg/${uuidv4()}`)
        const response = await fileRef.putString(file, "data_url")
        const fileUrl = await response.ref.getDownloadURL()
        const questions = window.confirm(`이 상품을 올리시겠습니까?`)

    
        
        if (questions) { 
            await dbService.collection("goodsInfo").add({
                text: goods,
                createdAt: Date.now(),
                creatorId: userObj.email,
                fileUrl
            }).then( (result) => {
                alert("상품페이지로 이동하시겠습니까?");
            } ).catch((error) => {
                alert("실패")
            })


            navigate("/product2/:2")
            setGoods("")
            setFile(null)
        }
    };
    const onChangeImage = ((event)=> {
        const {target: {files}} = event
        const theFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (finishedEvent)=> {
            const {currentTarget: {result}} = finishedEvent
            setFile(result)
        }
        reader.readAsDataURL(theFile)
    })
    return (
        <div id="upload-container" className='inner'>      
            <Form name="productUpload" >  
                <Form.Item name="fileName"
                    label={<div className='upload-label'>상품사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="images/icons/camera.png" alt="" />
                        {file ?  <img src={file} width={50} height={50} /> : <span>이미지를 업로드 해주세요.</span>}
                        <input type="file"  name="fileName"  onChange={onChangeImage}  />
                    </div>
                </Form.Item>
                <Divider/>
                <Form.Item name="seller" 
                    label={<div className='upload-label'>판매자명</div>}>
                    <Input  value={seller} onChange={onChange} className="nameUpload" size='large'
                    placeholder='판매자 이름을 입력하세요 ' name="seller" />
                </Form.Item>
                <Divider/>
                <Form.Item name="name"
                label={<div className='upload-label'>상품이름</div>}>
                    <Input
                        value={name}
                        onChange={onChange}
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
                     value={description}
                     onChange={onChange}
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
                </Form.Item>
            </Form>
        </div>
    );
};

export default Upload;
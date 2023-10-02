import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails =async()=>{
        console.log(params);
        let result = await fetch(`http://localhost:4500/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct =async()=>{
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:4500/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        navigate('/')
    }


    return (
        <div className='product'>Update product
            <input type='text' placeholder='Enter product name'
               value={name} className='inputBox' onChange={(e)=>{setName(e.target.value)}} />

            <input type='text' placeholder='Enter product price'
            value={price} className='inputBox' onChange={(e)=>{setPrice(e.target.value)}}/>

            <input type='text' placeholder='Enter product category'
            value={category} className='inputBox' onChange={(e)=>{setCategory(e.target.value)}}/>

            <input type='text' placeholder='Enter product company'
            value={company}  className='inputBox' onChange={(e)=>{setCompany(e.target.value)}}/>

            <button className='appButton' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
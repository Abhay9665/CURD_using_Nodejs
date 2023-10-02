import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError]= useState(false)

    const addProduct =async()=>{

        if(!name || !price ||!category ||!company)
        {
            setError(true)
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result =await fetch('http://localhost:4500/add-product',{
            method:'POST',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        console.log(result);
    }

    return (
        <div className='product'>AddProduct
            <input type='text' placeholder='Enter product name'
               value={name} className='inputBox' onChange={(e)=>{setName(e.target.value)}} />
               {error && !name && <span className='invalid-input'>Inter valid name</span>}

            <input type='text' placeholder='Enter product price'
            value={price} className='inputBox' onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className='invalid-input'>Inter valid price</span>}

            <input type='text' placeholder='Enter product category'
            value={category} className='inputBox' onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className='invalid-input'>Inter valid category</span>}

            <input type='text' placeholder='Enter product company'
            value={company}  className='inputBox' onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className='invalid-input'>Inter valid company</span>}

            <button className='appButton' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;
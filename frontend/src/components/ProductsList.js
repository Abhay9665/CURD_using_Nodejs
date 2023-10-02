import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:4500/products',)
        result = await result.json();
        setProducts(result)
        console.log("result", result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4500/product/${id}`, {
            method: 'Delete'
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (e) => {
        console.log();
        let key = e.target.value;

        if (key) {
            let result = await fetch(`http://localhost:4500/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input className='search-product-box' type='text' placeholder='Search Products' onChange={searchHandle} />
            <ul>
                <li>S.Number</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                products.length>0 ? products.map((item, index) =>
                    <ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>

                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={'/update/' + item._id}>Update</Link>

                        </li>
                    </ul>
                )
                :
                <h2>No Record Found</h2>
            }
        </div>
    )
}

export default ProductList;
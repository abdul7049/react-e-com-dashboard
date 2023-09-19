import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if (result) {
            alert("Deleted Succesfully")
            getProducts()
        }
    }
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }
    return (
        <div className="product-list">
            <input type="text " placeholder="search" className='searchbox'
                onChange={searchHandle}
            />
            <h3>Product List</h3>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Compant</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}Rs/-</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li ><button onClick={() => deleteProduct(item._id)} >Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>) : <h2>No Product found</h2>
            }
        </div>
    )
}

export default ProductList

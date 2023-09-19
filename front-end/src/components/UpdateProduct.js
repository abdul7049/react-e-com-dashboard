import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, [])

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json();
    console.warn(result);
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }
  const updateProduct = async () => {
    let result = await await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
    })
    result = await result.json()
    navigate("/")
  }

  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input type="text" className="inputBox" placeholder="Enter Product name"
        onChange={(e) => { setName(e.target.value) }} value={name}

      />
      <input type="text" className="inputBox" placeholder="Enter Product price"
        onChange={(e) => { setPrice(e.target.value) }} value={price}
      />

      <input type="text" className="inputBox" placeholder="Enter Product category"
        onChange={(e) => { setCategory(e.target.value) }} value={category}
      />

      <input type="text" className="inputBox" placeholder="Enter Product company"
        onChange={(e) => { setCompany(e.target.value) }} value={company}
      />

      <button onClick={updateProduct} className="appbtn" type='button'>Update product</button>
    </div>
  )
}

export default UpdateProduct

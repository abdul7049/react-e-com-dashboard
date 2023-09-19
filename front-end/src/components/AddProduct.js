import React from 'react'

const AddProduct = () => {

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [error, setError] = React.useState(false);

  const addProduct = async () => {

    if (!name || !price || !category || !company) {
      setError(true)
      return false;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
    })
    result = await result.json();
    console.warn(result);
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    alert("Product added succesfully")

  }
  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type="text" className="inputBox" placeholder="Enter Product name"
        onChange={(e) => { setName(e.target.value) }} value={name}
      />
    {error && !name &&  <span className="invalid-input">Enter valid Name</span>}
      <input type="text" className="inputBox" placeholder="Enter Product price"
        onChange={(e) => { setPrice(e.target.value) }} value={price}
      />
    {error && !price &&  <span className="invalid-input">Enter valid price</span>}

      <input type="text" className="inputBox" placeholder="Enter Product category"
        onChange={(e) => { setCategory(e.target.value) }} value={category}
      />
    {error && !category &&  <span className="invalid-input">Enter valid category</span>}

      <input type="text" className="inputBox" placeholder="Enter Product company"
        onChange={(e) => { setCompany(e.target.value) }} value={company}
      />
    {error && !company &&  <span className="invalid-input">Enter valid company</span>}

      <button onClick={addProduct} className="appbtn" type='button'>Add product</button>
    </div>
  )
}

export default AddProduct

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    })

    const handelLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        } else {
            alert("Invalid Credentials! ")
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="text" className="inputBox" placeholder="Enter password"
                onChange={(e) => setpassword(e.target.value)} value={password} />
            <button onClick={handelLogin} className="appbtn" type="button">Login</button>


        </div>
    )
}

export default Login

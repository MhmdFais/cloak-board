import { useState } from "react"
import axios  from "axios"
import './login.css'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/', {
                email,
                password
            });
            console.log('Login successful', res.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Login failed: ', error.response.data.message)
                alert('Login failed: ', error.response.data.message)
            } else {
                console.log('Error: ', error.message)
                alert('Error: ', error.message)
            }
        }
    };
    

    return(
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <a href="/register">Register</a>
        </div>
    )
}

export default Login
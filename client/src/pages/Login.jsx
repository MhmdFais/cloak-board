import { useState } from "react"
import axios  from "axios"

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/', {
                email,
                password
            })
            console.log(res)
        }
        catch(error){
            console.log(error)
        }
    }

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
        </div>
    )
}

export default Login
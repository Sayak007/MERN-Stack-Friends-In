import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    const initialState = {email:'',password:''}
    const [userData, setUserData] = useState(initialState)
    const{email,password} = userData

    const handleChangeInput=e=>{
        const{name,value}=e.target
        setUserData({...userData, [name]:value})
    }
    return (
        <div className="auth_page">
            <form>
                <h3>Friends-In</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password"/>
                </div>
                
                <button type="submit" className="btn btn-primary w-100" disabled={email&&password?false:true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/Register" style={{color:'Red'}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
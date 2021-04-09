import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {login} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import logo from '../images/icon_1.png'

const Login = () => {
    const initialState = {email:'',password:''}
    const [userData, setUserData] = useState(initialState)
    const{email,password} = userData

    const [typepass, setTypePass] = useState(false)
    const dispatch = useDispatch()

    const handleChangeInput=e=>{
        const{name,value}=e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(login(userData))
    }
    
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center text-center">
                    <img src={logo} alt="Ok" style={{maxWidth:'120px'}}/>
                    <h3 className="text-uppercase">Friends-In</h3>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input type={typepass? 'text' : 'password' } className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password" aria-describedby="eye"/>
                        <div onClick={()=>setTypePass(!typepass)}>
                            <span className="input-group-text" id="eye" style={{cursor:'pointer'}}>
                                {typepass? <i className="fa fa-eye-slash fa-2x"></i> : <i className="fa fa-eye fa-2x"></i> }
                            </span>
                        </div>
                    </div>
                    
                </div>
                
                <button type="submit" className="btn btn-primary w-100" disabled={email&&password?false:true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/Register" style={{color:'blue', textDecoration:'none'}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
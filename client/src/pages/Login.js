import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {login} from '../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import logo1 from '../images/icon_0.png'

const Login = () => {
    const initialState = {email:'',password:''}
    const [userData, setUserData] = useState(initialState)
    const{email,password} = userData

    const [typepass, setTypePass] = useState(false)

    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        if(auth.token) history.push("/")
    },[auth.token,history])

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
            <div className="row justify-content-center text-center x">
                <img src={logo1} alt="Ok" width="400px"/>
            </div>
            <form onSubmit={handleSubmit} style={{paddingTop: '5px', paddingBottom: '5px'}}>
                <div className="row justify-content-center text-center"><h4>Login</h4></div>
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
                    You don't have an account? <Link to="/register" style={{color:'blue', textDecoration:'none'}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
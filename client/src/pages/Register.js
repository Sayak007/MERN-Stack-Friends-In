import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useHistory,Link} from 'react-router-dom'
import logo from '../images/icon_0.png'
import {register} from '../redux/actions/authAction'

const Register= () =>{
    const { auth ,alert} = useSelector(state=>state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        fullname:'',username:'',email:'',password:'',cf_password:'',gender: 'male'
    }

    const [userData, setUserData] = useState(initialState)
    const{fullname,username,email,password,cf_password} = userData

    const [typepass, setTypePass] = useState(false)
    const [typeCfpass, setTypeCfPass] = useState(false)

    useEffect(()=>{
        if(auth.token) history.push("/")
    },[auth.token,history])


    const handleChangeInput=e=>{
        const{name,value}=e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(register(userData))
    }
    
    return (
        <div className="auth_page" >
            <form onSubmit={handleSubmit} style={{maxWidth: '600px'}}>
                <div className="row justify-content-center text-center">
                    <img src={logo} alt="Ok" style={{maxWidth:'500px'}}/>
                    <h3 className="text-uppercase">Register</h3>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-7">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input type="fullname" className="form-control" id="fullname" onChange={handleChangeInput} value={fullname} name="fullname"
                            style={{border: `${alert.fullname? '2px solid red': ''}`}}/>
                            <div className="form-text" style={{color: 'red'}}>{alert.fullname? alert.fullname: ''}</div>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="fullname" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g,'')} name="username" style={{border: `${alert.username? '2px solid red': ''}`}}/>
                            <div className="form-text" style={{color: 'red'}}>{alert.username? alert.username: ''}</div>
                        </div>
                    </div>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Email Id</label>
                    <input type="email" className="form-control" id="email" onChange={handleChangeInput} value={email} name="email" style={{border: `${alert.email? '2px solid red': ''}`}}/>
                    <div className="form-text" style={{color: 'red'}}>{alert.email? alert.email: ''}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input type={typepass? 'text' : 'password' } className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password" aria-describedby="eye" style={{border: `${alert.password? '2px solid red': ''}`}}/>
                        <div onClick={()=>setTypePass(!typepass)}>
                            <span className="input-group-text" id="eye" style={{cursor:'pointer'}}>
                                {typepass? <i className="fa fa-eye-slash fa-2x"></i> : <i className="fa fa-eye fa-2x"></i> }
                            </span>
                        </div>
                        
                    </div>
                    <div className="form-text" style={{color: 'red'}}>{alert.password? alert.password: ''}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input type={typeCfpass? 'text' : 'password' } className="form-control" id="cf_password" onChange={handleChangeInput} value={cf_password} name="cf_password" aria-describedby="eye" style={{border: `${alert.cf_password? '2px solid red': ''}`}}/>
                        <div onClick={()=>setTypeCfPass(!typeCfpass)}>
                            <span className="input-group-text" id="eye" style={{cursor:'pointer'}}>
                                {typeCfpass? <i className="fa fa-eye-slash fa-2x"></i> : <i className="fa fa-eye fa-2x"></i> }
                            </span>
                        </div>
                        
                    </div>
                    <div className="form-text" style={{color: 'red'}}>{alert.cf_password? alert.cf_password: ''}</div>
                </div>

                <div className="row justify-content-between mx-0 mb-1" style={{marginTop: '20px'}}>
                    <div className="row">
                        Gender
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="male">
                            Male: <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput}/>
                        </label>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="female">
                            Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput}/>
                        </label>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="transgender">
                            Transgender: <input type="radio" id="transgender" name="gender" value="transgender" onChange={handleChangeInput}/>
                        </label>
                    </div>

                </div>

                
                <div className="form-group" style={{marginTop: '20px'}}>
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </div>
                

                <p className="my-2">
                    You already have an account? <Link to="/login" style={{color:'blue', textDecoration:'none'}}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
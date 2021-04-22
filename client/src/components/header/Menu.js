import React from 'react';
import {Link,useLocation} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../redux/actions/authAction'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'


const Menu=()=> {
    const navLinks = [
        {label: 'Home', icon: 'fa-house-user', path: '/', click: 'false'},
        {label: 'Message', icon: 'fa-paper-plane', path: '/message', click: 'false'},
        {label: 'Post', icon: 'fa-plus-square', path: '/',click: 'true'},
        {label: 'Discover', icon: 'fa-compass', path: '/discover',click: 'false'},
        {label: 'Notify', icon: 'fa-bell', path: '/notify',click: 'false'}
    ]

    const {auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if(pn===pathname) return 'active'
    }
    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">

                {
                    navLinks.map((link,index)=>(
                        <li className="nav-item" key={index}>
                            <Link className={`nav-link px-2 ${isActive(link.path)}`} to={link.path} onClick={()=>{ if(link.click==='true') dispatch({type:GLOBALTYPES.STATUS, payload: true})}}>
                                <span className={`fa ${link.icon}`} title={link.label}></span>
                            </Link>
                        </li>
                    ))
                }

                <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar src={auth.user.avatar} size="medium-avatar"/>
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`}><span className="material-icons" style={{transform: 'translateY(6px)'}}>person</span> Profile</Link></li>
                    <li><label htmlFor="theme" className="dropdown-item" onClick={()=>dispatch({type: GLOBALTYPES.THEME, payload:!theme})}>
                            {
                                theme
                                ? <div>
                                    <span className="material-icons" style={{transform: 'translateY(6px)'}}>
                                        light_mode
                                    </span> Light Mode
                                  </div> 
                                : <div>
                                    <span className="material-icons" style={{transform: 'translateY(6px)'}}>
                                        dark_mode
                                    </span> Dark mode
                                  </div>
                            }
                        </label>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link className="dropdown-item" to="/" onClick={()=>dispatch(logout())}><span className="material-icons" style={{transform: 'translateY(6px)'}}>logout</span> Logout</Link></li>
                </ul>
                </li>
                
            </ul>
        </div>
    );
}

export default Menu;

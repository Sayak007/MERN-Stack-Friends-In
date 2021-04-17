import React from 'react';
import {Link} from 'react-router-dom'
import icon_0 from '../../images/icon_0.png'
import Menu from'./Menu'
import {useSelector} from 'react-redux'
import Search from './Search'


const Header = () => {
    const {theme} = useSelector(state=>state)
    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/' onClick={()=> window.scrollTo({top: 0})}>
                        <img width="130" src={icon_0} alt="icon" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/>
                    </Link>
                    
                    <Search/>

                    <Menu/>
                </div>
            </nav>
        </div>
    );
}

export default Header;
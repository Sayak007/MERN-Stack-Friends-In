import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {Link} from 'react-router-dom'
import UserCard from '../UserCard'

const Search = ()=> {
    const [search,setSearch] = useState('')
    const [users,setUsers] = useState([])

    const {auth} = useSelector(state=>state)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(search){
            getDataAPI(`search?username=${search}`,auth.token)
            .then(res=>setUsers(res.data.users))
            .catch(err=>{
                dispatch({
                    type: GLOBALTYPES.ALERT,payload: {error: err.response.data.msg}
                })
            })
        }else{
            setUsers([])
        }
    },[search,auth.token,dispatch])

    const searchInput = React.useRef();
    const handleClose =() => {
        setSearch('')
        setUsers([])
        searchInput.current.value=""
    }
    
    return (
        <form className="search_form">
            <input type="text" name="search" id="search" ref={searchInput} onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))}/>

            <div className="search_icon" style={{opacity: search?0:0.3}}>
                <span className="material-icons">search</span>
                <span>Search</span>
            </div>

            <div className="close_search" style={{opacity: users.length===0 ? '0':'1'}}
            onClick={handleClose}>
                &times;
            </div>

            <div className="users">
                {
                    search && users.map(user=>(
                        <Link key={user._id} to={`/profile/${user._id}`} style={{textDecoration: 'none'}} onClick={handleClose}>
                            <UserCard user={user} border="border"/>
                        </Link>
                    ))
                }
            </div>
        </form>
    );
}

export default Search;
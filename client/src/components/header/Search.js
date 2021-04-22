import React,{ useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

const Search = ()=> {
    const [search,setSearch] = useState('')
    const [users,setUsers] = useState([])

    const {auth} = useSelector(state=>state)
    const dispatch=useDispatch()
    const[load,setLoad] = useState(false)

    const searchInput = React.useRef();

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return ;
        try{
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`,auth.token)
            setUsers(res.data.users)
            setLoad(false)
        }catch(err){
            dispatch({
                type: GLOBALTYPES.ALERT,payload: {error: err.response.data.msg}
            })
        }
    }

    const handleClose =() => {
        setSearch('')
        setUsers([])
        searchInput.current.value=""
    }
    
    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input type="text" name="search" id="search" ref={searchInput} onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))} title="Enter to search"/>

            <div className="search_icon" style={{opacity: search?0:0.3}}>
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div>

            <div className="close_search" style={{opacity: users.length===0 ? '0':'1'}}
            onClick={handleClose}>
                &times;
            </div>

            <button type="submit" style={{display: 'none'}}>Search</button>

            {load && <img className="loading" src={LoadIcon} alt="loading" />}

            <div className="users" style={{borderRadius: '10px',border: '0.5px solid #ddd', boxShadow: '0 20px 50px #ccc'}}>
                {
                    search && users.map(user=>(
                        <UserCard key={user._id} user={user} border="border" handleClose={handleClose}/>
                    ))
                }
            </div>
        </form>
    );
}

export default Search;
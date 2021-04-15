import React from 'react';
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import {useSelector,useDispatch} from 'react-redux'

const Following = ({users,setShowFollowing}) => {
    const {auth} = useSelector(state=>state)
    return (
        <div className="follow">
            <div className="follow_box">
                    <h5 className="text-center">Following</h5>
                    <hr/>
                    { users.length==0 && 
                        <div style={{textAlign: 'center', opacity: 0.4}}>
                            <h4 className="text-center">No following yet</h4>
                            <br/>
                            <i class="fa fa-user-plus text-info fa-5x"></i>
                        </div>
                    }
                    {users.map(user=>(
                        <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
                            {auth.user._id!==user._id && <FollowBtn user={user}/>}
                        </UserCard>
                    ))}
                    <div className="close" onClick={()=> setShowFollowing(false)}>&times;</div>
            </div>
        </div>
    );
}

export default Following;
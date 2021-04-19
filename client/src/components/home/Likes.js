import React from 'react';
import FollowBtn from '../FollowBtn'
import {useSelector} from 'react-redux'
import LikeCard from './LikeCard'

const Likes = ({users, setLikeBox}) => {
    const {auth} = useSelector(state=>state)
    return (
        <div className="follow">
            <div className="follow_box">
                    <h5 className="text-center">Likes</h5>
                    <hr/>
                    { users.length===0 && 
                        <div style={{textAlign: 'center', opacity: 0.4}}>
                            <h4 className="text-center">No likes yet</h4>
                            <br/>
                            <i class="fa fa-heart text-danger fa-5x"></i>
                        </div>
                    }
                    {
                        users.map(user=>(
                            <LikeCard key={user._id} user={user} setLikeBox={setLikeBox}>
                                {auth.user._id!==user._id && <FollowBtn user={user}/>}
                            </LikeCard>
                    ))}
                    <div className="close" onClick={()=> setLikeBox(false)}>&times;</div>
            </div>
        </div>
    );
}

export default Likes;
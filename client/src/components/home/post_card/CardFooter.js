import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import {useSelector,useDispatch} from 'react-redux'
import {likePost,unLikePost} from '../../../redux/actions/postAction'
import Avatar from '../../Avatar'
import Likes from '../Likes'


const CardFooter = ({post}) => {
    const {auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [likeBox, setLikeBox] = useState(false)

    useEffect(()=>{
        if(post.likes.find(like=>like._id===auth.user._id)){
            setIsLike(true)
        }
    },[post.likes, auth.user._id])

    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true)
        setLoadLike(true)
        await dispatch(likePost({post,auth}))
        setLoadLike(false)
    }

    const handleUnLike =async ()=> {
        if(loadLike) return;
        setIsLike(false)
        setLoadLike(true)
        await dispatch(unLikePost({post,auth}))
        setLoadLike(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    <img src={Send} alt="Send"/>
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 34px', cursor: 'pointer'}} onClick={() => {setLikeBox(true)}}>{post.likes.length} <i className="fas fa-heart text-danger" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/></h6>
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>{post.comments.length} <i className="fas fa-comment text-primary" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/></h6>
            </div>
            <div style={{overflowX: 'scroll',textAlign: 'left', paddingLeft: '32px',paddingRight: '25px'}}>
                {post.likes.slice(0, 7).map((item,index)=>(
                    <Link to={`/profile/${item._id}`} key={index} className="text-dark" style={{textDecoration:'none', marginRight: '2px'}}>
                        <Avatar src={item.avatar} size="medium-avatar" style={{opacity: 0.2}}/>
                        <i className="fas fa-heart" id="likebubble" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}} />
                    </Link>
                ))}
                {
                    post.likes.length !==0 &&
                    <i className="fas fa-angle-double-right text-secondary" style={{filter: `${theme? 'invert(1)':'invert(0)'}`,fontSize: '20px',paddingLeft:'10px', cursor: 'pointer', textDecoration:'none', verticalAlign:'middle'}}
                    onClick={() => {setLikeBox(true)}}/>
                
                }
                
                
            </div>
            {   
                likeBox && <Likes users = {post.likes} setLikeBox={setLikeBox}/>    
            }
        </div>
    );
}

export default CardFooter;
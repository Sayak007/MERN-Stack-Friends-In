import React,{useState,useEffect} from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'

const CommentCard = ({comment, post}) => {
    const {auth,theme} = useSelector(state=>state)
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)

    useEffect(()=>{
        setContent(comment.content)
    },[comment])

    const styleCard = {
        opacity: comment._id ? '1' : '0.5',
        PointerEvent: comment._id ? 'inherit' : 'none'
    }

    const handleLike = (e) =>{

    }
    const handleUnLike = (e) =>{

    }
    return (
        <div className="comment_card mt-2" style={styleCard}>
            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark" style={{textDecoration: 'none'}}>
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill">
                    <div>
                        <span>
                            {
                                content.length < 100 ? content : 
                                readMore ? content + ' ' : content.slice(0,100)+ ' ... '
                            }
                        </span>
                        {
                            content.length > 100 &&
                            <span className="readMore" onClick={()=> setReadMore(!readMore)}>
                                {readMore ? 'Read Less' : 'Read More'}
                            </span>
                        }
                    </div>
                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3" style={{marginRight: '20px'}}> 
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}}> 
                            {comment.likes.length} <i className="fas fa-heart text-danger" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/>
                        </small>

                        <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}}> 
                            <i className="fa fa-reply text-primary" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}} /> reply
                        </small>
                    </div>
                </div>
            
                <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
                    <CommentMenu post={post} comment={comment} auth={auth} />
                </div>
            </div>
        </div>
    )
}

export default CommentCard

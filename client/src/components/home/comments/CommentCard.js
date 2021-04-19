import React,{useState,useEffect} from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'
import { updateComment } from '../../../redux/actions/commentAction'

const CommentCard = ({comment, post}) => {
    const {auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    useEffect(()=>{
        setContent(comment.content)
    },[comment])

    const styleCard = {
        opacity: comment._id ? '1' : '0.5',
        PointerEvent: comment._id ? 'inherit' : 'none'
    }

    const handleUpdate = () => {
        if(comment.content !== content){
            dispatch(updateComment({comment, post, content, auth}))
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }
    }
    const handleLike = (e) =>{
        if(loadLike) return 
        setIsLike(true)

        setLoadLike(true)
        dispatch(likeComment({comment,post,auth}))
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
                    {
                        onEdit 
                        ?   <textarea rows="5" value={content} onChange={e=>setContent(e.target.value)} />
                        :   <div>
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
                    }
                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3" style={{marginRight: '20px'}}> 
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}}> 
                            {comment.likes.length} <i className="fas fa-heart text-danger" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/>
                        </small>

                        {
                            onEdit
                            ?   <>
                                    <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}} onClick={handleUpdate}> 
                                        <i className="fa fa-edit text-success" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}} /> update
                                    </small>
                                    <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}} onClick={e=> setOnEdit(false)}> 
                                        <i className="fa fa-ban text-danger" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}} /> cancel
                                    </small>
                                </>
                            :   <small className="mr-3" style={{fontWeight: 'bold', marginRight: '20px'}}> 
                                    <i className="fa fa-reply text-primary" style={{filter: `${theme? 'invert(1)':'invert(0)'}`}} /> reply
                                </small>
                        }
                        
                    </div>
                </div>
            
                <div className="d-flex align-items-center" style={{cursor: 'pointer', marginRight: '10px'}}>
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
                    
                </div>
            </div>
        </div>
    )
}

export default CommentCard

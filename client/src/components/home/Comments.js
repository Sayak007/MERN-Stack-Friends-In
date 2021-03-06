import React,{useState,useEffect} from 'react';
import CommentDisplay from './comments/CommentDisplay'
import {useSelector} from 'react-redux'

const Comments = ({post})=> {
    const {theme} = useSelector(state=>state)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(()=>{
        const newCm = post.comments.filter(cm=>!cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    },[post.comments, next])

    useEffect(()=>{
        const newRp = post.comments.filter(cm=>cm.reply)
        setReplyComments(newRp)
    },[post.comments])
    return (
        <div className="comments">
            {   showComments.map((comment,index)=>(
                    <CommentDisplay key={index} comment={comment} post={post} replyCm={replyComments.filter(item=>item.reply === comment._id)}/>
                ))
            }
            {
                comments.length - next > 0
                ?   <div className="p-2 border-top text-primary text-center" style={{cursor: 'pointer', filter: `${theme? 'invert(1)':'invert(0)'}`}} onClick={()=> setNext(next+10)}>
                        <i className="fa fa-sync"/> Load more comments ...
                    </div>
                :   comments.length > 2 &&
                    <div className="p-2 border-top text-primary text-center" style={{cursor: 'pointer', filter: `${theme? 'invert(1)':'invert(0)'}`}} onClick={()=> setNext(2)}>
                        <i className="fa fa-comment-slash"/> Hide comments ...
                    </div>
            }
        </div>
    );
}

export default Comments;
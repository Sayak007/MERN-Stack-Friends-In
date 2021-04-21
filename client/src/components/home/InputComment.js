import { set } from 'mongoose';
import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {createComment} from '../../redux/actions/commentAction'

const InputComment = ({children,post, onReply, setOnReply}) => {
    const [content, setContent] = useState('')

    const{auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()) {
            if(setOnReply) return setOnReply(false)
            return;

        }

        const newComment = {
            content, likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentID,
            tag: onReply && onReply.user
        }

        setContent('')
        //console.log(newComment)

        dispatch(createComment({post, newComment, auth}))
        if(setOnReply) return setOnReply(false)
    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input type="text" placeholder="Comment here..."
            value={content} onChange={e=>setContent(e.target.value) }/>

            <button type="submit" className="postBtn">
                <span className="material-icons text-primary" style={{transform: 'translate(2px,3px)'}} style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}>send</span>
            </button>
        </form>
    );
}

export default InputComment;
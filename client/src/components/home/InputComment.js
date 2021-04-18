import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {createComment} from '../../redux/actions/commentAction'

const InputComment = ({children,post}) => {
    const [content, setContent] = useState('')

    const{auth} = useSelector(state=>state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()) return;

        const newComment = {
            content, likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        }

        setContent('')

        dispatch(createComment(post, newComment, auth))
    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input type="text" placeholder="Comment here..."
            value={content} onChange={e=>setContent(e.target.value) }/>

            <button type="submit" className="postBtn">
                <span className="material-icons text-warning" style={{transform: 'translate(2px,3px)'}}>send</span>
            </button>
        </form>
    );
}

export default InputComment;
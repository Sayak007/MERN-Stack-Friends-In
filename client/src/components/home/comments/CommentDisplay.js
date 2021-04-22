import React,{useState,useEffect} from 'react'
import CommentCard from './CommentCard'
import {useSelector} from 'react-redux'

const CommentDisplay = ({comment, post, replyCm}) => {
    const {theme} = useSelector(state=>state)
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
        
    }, [replyCm,next])
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId = {comment._id}>
                <div className="tree" style={{paddingLeft: '30px'}}>
                    {
                        showRep.map((item,index)=>(
                            item.reply && <CommentCard key={index} className="ll" comment={item} post={post} commentId={comment._id}/>
                        ))
                    }
                    {
                        replyCm.length - next > 0
                        ?   <div className="text-center text-info" style={{cursor: 'pointer', filter: `${theme? 'invert(1)':'invert(0)'}`}} onClick={()=> setNext(next+10)}>
                                <i className="fa fa-sync"/> Load more replies ...
                            </div>
                        :   replyCm.length > 1 &&
                            <div className="text-center text-info" style={{cursor: 'pointer', filter: `${theme? 'invert(1)':'invert(0)'}`}} onClick={()=> setNext(1)}>
                                <i className="fa fa-comment-slash"/> Hide replies ...
                            </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay

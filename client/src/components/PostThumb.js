import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PostThumb = ({posts,result}) => {
    const {theme} = useSelector(state=>state)
    if(result===0) return <h2 className="text-center text-danger">No Posts</h2>
    return (
        <div className="post_thumb">
            {
                posts.map(post=>(
                    <Link key={post.id} to={`/post/${post._id}`}>
                        <div className="post_thumb_display">
                            <img src={post.images[0].url} alt={post.images[0].url} style={{filter: `${theme? 'invert(1)':'invert(0)'}`}}/>

                            <div className="post_thumb_menu">
                                <i className="fa fa-heart"> <span>{post.likes.length}</span></i>
                                <i className="fa fa-comment"> <span>{post.comments.length}</span></i>
                            </div>
                            
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb

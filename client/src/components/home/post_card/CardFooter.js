import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import {useSelector} from 'react-redux'

const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const handleLike = () => {
        setIsLike(true)
    }

    const handleUnLike =()=> {
        setIsLike(false)
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
                <h6 style={{padding: '0 34px', cursor: 'pointer'}}>{post.likes.length} <i className="fas fa-heart text-danger" /></h6>
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>{post.comments.length} <i className="fas fa-comment text-primary" /></h6>
            </div>
        </div>
    );
}

export default CardFooter;
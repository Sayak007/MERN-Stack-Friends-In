import React, { useState } from 'react';
import Carousel from '../../Carousel'
import {useSelector} from 'react-redux'

const CardBody = ({post}) => {
    const{theme} = useSelector(state=>state)
    const [ readMore, setReadMore] = useState(false)
    return (
        <div className="card_body">
            <div className="card_body_content">
                <span>
                    {
                        post.content.length<60 
                        ? post.content
                        : readMore? post.content + ' ' 
                        : post.content.slice(0,60) + ' ... '
                    }
                </span>
                {
                    post.content.length > 60 &&
                    <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                        {readMore ? '  Read Less' : 'Read More'}
                    </span>
                }
            </div>
            {
                post.images.length>0 && 
                post.images.length==1 
                ?   <img className="d-block w-100" src={post.images[0].url} alt={ post.images[0].url}
                        style={{filter: `${theme? 'invert(1)':'invert(0)'}`,
                        display: 'block',
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        maxHeight: '600px',
                        background: '#ddd'}}
                    />
                :   <Carousel images={post.images} id={post._id}/>
            }
        </div>
    );
}

export default CardBody;
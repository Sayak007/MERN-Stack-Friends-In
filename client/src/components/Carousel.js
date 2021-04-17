import React from 'react';
import {useSelector} from 'react-redux'

const Carousel = ({images,id}) => {
    const{theme} = useSelector(state=>state)
    const isActive=index=>{
        if(index===0) return "active";
    }
    return (
        <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {
                    images.map((img,index)=>(
                        <button key={index} data-bs-target={`#image${id}`} data-bs-slide-to={index} className={isActive(index)}></button>
                    ))
                }
                
            </div>
            <div className="carousel-inner">
                {
                    images.map((img,index)=>(
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            <img className="d-block w-100" src={img.url} alt={img.url} 
                            style={{filter: `${theme? 'invert(1)':'invert(0)'}`,
                            display: 'block',
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            maxHeight: '600px',
                            background: '#ddd'}}
                            />
                        </div>
                    ))
                }
                  
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#image${id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#image${id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
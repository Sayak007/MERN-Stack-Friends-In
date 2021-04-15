import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'

const StatusModal = () => {
    const{auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    const[content, setContent] = useState('')
    const[images, setImages] = useState([])

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file=>{
            if(!file) return err="File does not exist."

            if(file.type!=='image/jpeg' && file.type !== 'image/png'){
                return err="Image format is incorrect."
            }

            return newImages.push(file)
        })

        if(err) dispatch({type:GLOBALTYPES.ALERT, payload:{error:err}})
        setImages([...images,...newImages])
    }

    const deleteImages=(index) => {
        const newArr = [...images]
        newArr.splice(index,1)
        setImages(newArr)
    }

    return (
        <div className="status_modal">
            <form>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={()=>dispatch({type:GLOBALTYPES.STATUS, payload:false})}>&times;</span>
                </div>

                <div className="status_body">
                    <textarea name="content" id="" 
                        placeholder={`${auth.user.fullname.replace(/ .*/,'')}, what are you thinking?`}
                        onChange={e=>setContent(e.target.value)}
                    />

                    <div className="show_images">
                        {
                            images.map((img,index)=>(
                                <div key={index} id="file_img">
                                    <img src={URL.createObjectURL(img) } alt="images" className="img-thumbnail" style={{filter: theme ? 'invert(1)' : 'invert(0)'}}/>
                                    <span onClick={()=>deleteImages(index)}><i className="fa fa-times"/></span>
                                </div>
                            ))
                        }
                    </div>

                    <div className="input_images">
                        <i className="fas fa-camera" />
                        
                        <div className="file_upload">
                            <i className="far fa-image" />
                            <input type="file" name="file" id="file" multiple accept="image/*" 
                            onChange={handleChangeImages}/>
                        </div>

                        
                    </div>

                </div>

                <div className="status_footer my-2">
                    <button className="btn btn-info w-100">Post</button>
                </div>

                
            </form>
        </div>
    );
}

export default StatusModal;
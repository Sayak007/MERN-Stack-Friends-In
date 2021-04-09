import React from 'react';

const Toast = ({msg, handleShow, bgColor}) => {
    return (
        <div className={`toast show position-fixed text-light ${bgColor}`}
            style={{top:'5px',right:'5px', width:'200px',zIndex:50}}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="text-light" style={{marginRight:'auto'}}>{msg.title}</strong>
                <button className="float-right close " data-dismiss="toast" 
                style={{border:'none', background:'transparent'}} onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    );
}

export default Toast;
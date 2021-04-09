const valid=({fullname,username,email,password,cf_password})=>{
    const err={}
    if(!fullname){
        err.fullname="Please add your full name."
    }else if (fullname.length>25){
        err.fullname="Full name must be max 25 characters long."
    }

    if(!username){
        err.username="Please add your user name."
    }else if (username.replace(/ /g,'').length>25){
        err.username="User name must be max 25 characters long."
    }

    if(!email){
        err.email="Please add your email."
    }else if (!validateEmail(email)){
        err.email="Please enter a valid email."
    }

    if(!password){
        err.password="Please add your password."
    }else if (password.length<6){
        err.password="Password must be atleast 6 characters.."
    }

    if(password!==cf_password){
        err.cf_password="Confirm password did not match."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    return re.test(String(email).toLowerCase());
}

module.exports=valid
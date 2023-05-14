const nameValidate=(name)=>{
    if(!name) return false;
    if(!name.match(/^[a-zA-Z ]{3,30}$/)) return false;
    return true;
}
const emailvalidate=(email)=>{
    if(!email) return false;
    if(!email.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) return false;
    return true;
}
const mobileValidate=(mobile)=>{
    if(!mobile) return false;
    if(!mobile.match(/^\d{10}$/)) return false;
    return true;
}
const passwordValidate=(password)=>{
    if(!password) return false;
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) return false;
    return true;
}


module.exports={
    emailvalidate,
    nameValidate,
    mobileValidate,
    passwordValidate
};
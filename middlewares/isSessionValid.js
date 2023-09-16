const isSessionValid = async(req,res,next)=>{
    const session_id = req.headers.cookie || req.Headers?.cookie;
    console.log(session_id);
    // if(req.path == '/logout'){
    //     req.sessionID = req.body.data.sessionID;
    //     req.session.user=req.body.data.user;
    //     console.log("req.sessionID : "+req.sessionID+" "+req.session.user);
    //     next();
    // }
    // console.log(user);
    next();
}

module.exports = isSessionValid;
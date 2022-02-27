module.exports = function(req,res,next){
    //401 Unauthorized when the user tries to access a protected user.
    //403 Forbidden they are not allowed to access this resource.
    if(!req.user.isAdmin) {
        return res.status(403).send('Access denied.');
    }
    next();
}
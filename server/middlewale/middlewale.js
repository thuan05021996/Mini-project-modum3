const validation = (req,res,next)=>{
    const {title} = req.body;
    if (!title) {
        res.status(400).json({
            messange:"Vui lòng nhập công việc"
        });
    }else{
        next();
    }
};
module.exports = {
    validation
}
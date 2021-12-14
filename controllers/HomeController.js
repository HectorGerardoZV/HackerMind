exports.home = (req,res,next)=>{
    try {
        res.render("Home",{});
    } catch (error) {
        
    }
}
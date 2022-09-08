module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    
    getDashboard: (req,res)=>{
        res.render('dashboard.ejs', {user: req.user})
    }
}
const {Pembeli, Admin} = require('../models')
module.exports = {
    authUser: async (req, res, next) => {
         try{
            console.log(req.session.user)
            if(req.session.user == null | req.session.user == undefined)  return res.redirect('/login')
            const {id: userId, email: userEmail} = req.session.user
            const verifyUser = await Pembeli.findOne({where: {id: userId, Email: userEmail}})
            if(!verifyUser) return res.redirect('/login')
            next()

         } catch(error){
            return res.redirect('/login')
         }
    },
    authAdmin: async (req, res, next) => {
      try{
            if(req.session.user == null | req.session.user == undefined)  return res.redirect('/login')
            const {id: adminId, email: adminEmail} = req.session.user
         console.log(req.session.user)
            const verifyUser = await Admin.findOne({where: {id: adminId, Email:adminEmail}})
            if(!verifyUser)  return res.redirect('/login')
            next()
         } catch(error){
            res.redirect('/login')
         }
    }
}
const bcrypt = require('bcrypt')

const {Pembeli, Admin} = require('../models')


class AuthController {
    static async viewLogin(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                const alertMessage = req.flash('alertMessage')
                const alertStatus = req.flash('alertStatus')
                const alert = { message: alertMessage, status: alertStatus }
                res.render('auth/login', {
                    alert,
                    title: 'Login',
                })
             }
             else if (req.session.user.adminAuth){
                res.redirect('/admin/')
            } else {
                res.redirect('/')
            }
        } catch(error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/login')
        }
    }

    static async postLogin(req, res) {
         try {
            const {email, password} = req.body
            let validateAdmin = null
            let isPasswordAdminrMatch = null
            let isPasswordUserMatch = null
            const validateUser = await Pembeli.findOne({where: {Email: email}})
             if(!validateUser) {
                validateAdmin = await Admin.findOne({where: {Email: email}})
                if(!validateAdmin) {
                    req.flash('alertMessage', 'User yang anda masukan tidak ada!!')
                    req.flash('alertStatus', 'danger')
                    return res.redirect('/login')
                }
                isPasswordAdminrMatch = await bcrypt.compare(password, validateAdmin.Password)
            }else {
                isPasswordUserMatch = await bcrypt.compare(password, validateUser.Password)
            }
            if (isPasswordUserMatch && validateUser ) {
                req.session.user = {
                id: validateUser.id,
                email: validateUser.Email,
                //name: validateUser.nama,
                }
                return res.redirect('/')
            }else if( validateAdmin && isPasswordAdminrMatch) {
                req.session.user = {
                    id: validateAdmin.id,
                    email: validateAdmin.Email,
                    name: validateAdmin.nama,
                    adminAuth: true
                }
                return res.redirect('/admin/')
            }
            req.flash('alertMessage', 'Kata Sandi Yang Anda Masukan Salah')
            req.flash('alertStatus', 'danger')
            return res.redirect('/login')
        } catch(error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/login')
        }
    }

    static async viewRegister(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                const alertMessage = req.flash('alertMessage')
                const alertStatus = req.flash('alertStatus')
                const alert = { message: alertMessage, status: alertStatus }
                res.render('auth/register', {
                    alert,
                    title: 'Register',
                })
            } else {
                res.redirect('/')
            }
        } catch(error) {
            res.redirect('/register')
        }
    }

    static async postRegister(req, res) {
        try {
            //registerValidation(req.body)
            const {email, nama, alamat} = req.body
            const password = await bcrypt.hash(req.body.password, 10)
            const validateEmail = await Pembeli.findOne({where: {Email: email}})
            if(validateEmail) {
                req.flash('alertMessage', 'Email Sudah Terdaftar Silahkan Masuk')
                req.flash('alertStatus', 'danger')
                return res.redirect('/register')
            }
            await Pembeli.create({
                Email: email,
                Nama: nama,
                Alamat: alamat,
                Password: password,
            })
            req.flash('alertMessage', 'Pendaftaran Berhasil Silahkan Login')
            req.flash('alertStatus', 'success')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/register')
        }
    }

    static async beranda (req, res) {
        let login = true
        if(req.session.user == null | req.session.user == undefined) login = false
         res.render('user/beranda', {
            aktifMenu: 'Beranda',
            title: 'Beranda',
            isLogin: login
         })
    }

    static async actionLogOut(req, res) {
        try {
            req.session.destroy()
            return res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AuthController
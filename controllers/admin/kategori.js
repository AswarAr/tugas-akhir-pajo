const {Kategori, Produk} = require('../../models')
const {saveImage, deleteImage} = require('../../helper/firebase')
class KategoriController {
    static async viewKategori (req, res) {
        try {
            const kategori = await Kategori.findAll({
                where : {
                    isDelete: false,
                },
                include: [
                    {model: Produk}
                ]
            })

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }

            res.render('admin/kelola-toko/kategori', {
                kategori,
                alert,
                title: 'Daftar Kategori',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-kategori')
        }
    }

    static async viewAddKategori (req, res) {
        res.render('admin/kelola-toko/tambah-kategori',{
            title: 'Tambah Produk',
        })
    }

    static async actiondAddKategori (req, res) {
        try {
            const {nama} = req.body
            const urlGambar = await saveImage(req.files[0])
            
            await Kategori.create({
                Nama_Kategori: nama,
                UrlGambar: urlGambar
            })

            req.flash('alertMessage', 'Kategori Berhasil Ditambahkan')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-kategori')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-kategori')
        }
    }

    static async viewUpdateKategori (req, res) {
        try {
            const {kategoriId} = req.params

            const kategori = await Kategori.findOne(
                {
                    where: {
                        id: kategoriId, 
                        isDelete: false
                    }
                })

            if(!kategori) {
                req.flash('alertMessage', 'Kategori Tidak Ditemukan!')
                req.flash('alertStatus', 'fail')
                return res.redirect('/admin/daftar-kategori')
            }

            res.render('admin/kelola-toko/perbarui-kategori', {
                kategori,
                title: 'Perbarui Produk',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-kategori')
        }
    }

    static async actiondUpdateKategori (req, res) {
        try {
            const {nama} = req.body
            const {kategoriId} = req.params

            const {UrlGambar} = await Kategori.findByPk(kategoriId)
            const image = req.files[0]
            let payload

            if(!image) {
                payload = {
                    Nama_Kategori: nama,
                }
            } else {
                if(UrlGambar) await deleteImage(UrlGambar)
                const urlGambar = await saveImage(image)
                payload = {
                   Nama_Kategori: nama,
                   UrlGambar: urlGambar
                }
            }
            await Kategori.update(payload, 
                {where: {
                    id: kategoriId, 
                    isDelete: false,
                }})

            req.flash('alertMessage', 'Kategori Berhasil Perbarui')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-kategori')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-kategori')
        }
    }

    static async deleteKategori (req, res) {
        try {
            const {kategoriId} = req.params

            const validateKategori = await Kategori.findOne({where: {id: kategoriId}})

            if(!validateKategori) {
                req.flash('alertMessage', 'Kategori Tidak Ditemukan!')
                req.flash('alertStatus', 'fail')
                return res.redirect('/admin/daftar-kategori')
            }

            await Kategori.update({isDelete : true}, {where: {id: kategoriId}})
            
            req.flash('alertMessage', 'Berhasil Menghapus Kategori')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-kategori')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-kategori')
        }
    }
}

 module.exports = KategoriController
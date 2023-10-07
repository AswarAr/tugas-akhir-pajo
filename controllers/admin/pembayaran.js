const {Pembayaran} = require('../../models')
const {saveImage, deleteImage} = require('../../helper/firebase')
class PembayaranController {
    static async viewPembayaran (req, res) {
        try {
            const pembayaran = await Pembayaran.findAll()
            
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }

            res.render('admin/kelola-toko/pembayaran', {
                pembayaran,
                alert,
                title: 'Daftar Pembayaran',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }

    static async viewAddPembayaran(req, res) {
        try{
            res.render('admin/kelola-toko/tambah-pembayaran',{
                title: 'Tambah Pembayaran',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }

    static async actionAddPembayaran(req, res) {
        try {
            const {nama, namaPemilik, nomorTujuan} = req.body
            const urlGambar =await saveImage(req.files[0])

            await Pembayaran.create({
                Nama: nama,
                UrlGambar: urlGambar,
                Nama_Pemilik: namaPemilik,
                Nomor_Tujuan: nomorTujuan
            })

            req.flash('alertMessage', 'Berhasil Menambahkan Pembayaran Pembayaran')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-pembayaran')

        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }

    static async viewAUpdatePembayaran(req, res) {
        try{
            const {pembayaranId} = req.params

            const pembayaran = await Pembayaran.findByPk(pembayaranId)

            res.render('admin/kelola-toko/perbarui-pembayaran', {
                pembayaran,
                title: 'Perbarui Pembayaran',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }

    static async actionUpdatePembayaran(req, res) {
        try {
            const {pembayaranId} = req.params
            const {nama, namaPemilik, nomorTujuan} = req.body
            const image = req.files[0]
            let payload

            const {UrlGambar} = await Pembayaran.findByPk(pembayaranId)

            if(!image) {
                payload = {
                    Nama: nama,
                    Nama_Pemilik: namaPemilik,
                    Nomor_Tujuan: nomorTujuan,
                }
            } else {
                if(UrlGambar) await deleteImage(UrlGambar)

                const urlGambar = await saveImage(image)

                payload = {
                    Nama: nama,
                    UrlGambar: urlGambar,
                    Nama_Pemilik: namaPemilik,
                    Nomor_Tujuan: nomorTujuan,
                }
            }

            req.flash('alertMessage', 'Berhasil Memperbarui Pembayaran')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-pembayaran')

        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }

    static async actionDeletePembayaran(req, res) {
        try {
            const {pembayaranId} = req.params

            const pembayaran = await Pembayaran.findByPk(pembayaranId)
            await Pembayaran.destroy({where: {id: pembayaranId}})
            await deleteImage(pembayaran.UrlGambar)

            req.flash('alertMessage', 'Berhasil Menghapus Pembayaran')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-pembayaran')

        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pembayaran')
        }
    }
}

module.exports = PembayaranController
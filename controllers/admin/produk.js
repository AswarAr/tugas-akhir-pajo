const {Produk, Kategori, Pesanan,  Pembeli_Produk_Pesanan} = require('../../models')
const {saveImage, deleteImage} = require('../../helper/firebase')
class ProdukController {
    static async viewProduct(req, res) {
        try {
            const produk = await Produk.findAll({
                where : {isDelete: false}}
            )

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }

            res.render('admin/kelola-toko/produk', {
                alert,
                produk,
                title: 'Daftar Produk',
            })
        }catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-produk')
        }
    }

    static async viewAddProduct(req, res) {
        try {
            const kategori = await Kategori.findAll({
                where : {isDelete: false}
            })

            return res.render('admin/kelola-toko/tambah-produk', {
                kategori,
                title: 'Tambah Produk',
            })
        } catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/admin/daftar-produk')
        }
    }
    static async actionAddProduk(req, res) {
        try {
            const {nama, deskripsi, stok, harga, kategoriId} = req.body

            const validateKategori = await Kategori.findAll({
                where : {isDelete: false}
            })

            if(!validateKategori) {
                req.flash('alertMessage', 'Kategori yang di masukan tidak tersedia')
                req.flash('alertStatus', 'danger')
                return res.redirect('/keranjang')
            }

            const urlGambar = await saveImage(req.files[0])
            
            await Produk.create({
                Nama_Produk: nama,
                Stok_Produk: stok,
                Kategori_Id: kategoriId,
                Deksripsi_Produk: deskripsi,
                Harga_Produk: harga,
                UrlProduk: urlGambar,
            })

            req.flash('alertMessage', 'Berhasil Menambahkan Produk Baru')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-produk')
        } catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/admin/daftar-produk')
        }
    }

    static async viewUpdateProduct(req, res) {
        try {

            const produk = await Produk.findOne({
                where : {isDelete: false}
            })
            const kategori = await Kategori.findAll({
                where : {isDelete: false}
            })

            return res.render('admin/kelola-toko/perbarui-produk', {
                produk, 
                kategori,
                title: 'Perbarui Produk',
            })
        } catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/admin/daftar-produk')
        }
    }

     static async actionUpdateProduk(req, res) {
        try {
            const {nama, deskripsi, stok, harga, kategoriId} = req.body
            const {produkId} = req.params
            const validateKategori = await Kategori.findAll({
                where: {
                    id: kategoriId,
                    isDelete: false
                }})
            if(!validateKategori) {
                req.flash('alertMessage', 'Kategori yang di masukan tidak tersedia')
                req.flash('alertStatus', 'danger')
                return res.redirect('/admin/daftar-produk')
            }
            const {UrlProduk} = await Produk.findByPk(produkId)
            const image = req.files[0]
            let payload
            if(!image) {
                payload = {
                    Nama_Produk: nama,
                    Stok_Produk: stok,
                    Kategori_Id: kategoriId,
                    Deksripsi_Produk: deskripsi,
                    Harga_Produk: harga,
                }
            } else {
                if(UrlProduk) await deleteImage(UrlProduk)
                const urlGambar = await saveImage(image)
                payload = {
                    Nama_Produk: nama,
                    Stok_Produk: stok,
                    Kategori_Id: kategoriId,
                    Deksripsi_Produk: deskripsi,
                    
                    Harga_Produk: harga,
                    UrlProduk: urlGambar,
                }
            }
            await Produk.update(payload, 
                {
                    where: {id: produkId}
                })
            req.flash('alertMessage', 'Berhasil Perbarui Produk')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-produk')
        } catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/admin/daftar-produk')
        }
    }

    static async deleteProduk (req, res) {
        try {
            const {produkId} = req.params
            const validateProduk = await Produk.findByPk(produkId)

            if(!validateProduk) {
                req.flash('alertMessage', 'Produk Tidak Ditemukan')
                req.flash('alertStatus', 'success')
                return res.redirect('/admin/daftar-produk')
            }

            await Produk.update({isDelete: true},{where: {id: produkId}})
            
            req.flash('alertMessage', 'Kategori Berhasil Dihapus')
            req.flash('alertStatus', 'succes')
            return res.redirect('/admin/daftar-produk')
        }catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/admin/daftar-produk')
        }
    }


}
module.exports = ProdukController

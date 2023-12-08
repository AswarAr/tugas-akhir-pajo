const express = require('express')

const router = express.Router()

const Produk = require('../controllers/users/produk')
const Keranjang = require('../controllers/users/keranjang')
const Kategori = require('../controllers/users/kategori')
const Pesanan = require('../controllers/users/pesanan')
const {authUser} = require('../middlewere/auth')
const {uploadFile} = require('../middlewere/multer')

router.get('/kategori')
router.get('/produk')

router.get('/komfirmasi-pembayaran', authUser, Pesanan.viewPesanan)
router.get('/buat-pesanan', authUser, Pesanan.postPesanan)
router.get('/riwayat-pesanan', authUser, Pesanan.riwayatPesanan)
router.get('/upload-bukti-pembayaran', authUser, Pesanan.viewUploadBuktiPembayran)
router.post('/upload-bukti-pembayaran/:pesananId', authUser, uploadFile, Pesanan.uploadBuktiPembayaran)

router.get('/daftar-pesanan', authUser, Pesanan.daftarPesanan)

router.get('/:kategoriId/produk', Produk.viewProduk)
router.get('/kategori', Kategori.viewKategori)

router.get('/keranjang', authUser, Keranjang.viewProduk)
router.get('/tambah/:produkId/keranjang', authUser, Keranjang.tambahProduk)
router.get('/tambah/:produkId/pada-keranjang', authUser, Keranjang.tambahProdukDiKeranjang)
router.get('/hapus/:produkId/keranjang', authUser, Keranjang.hapusProduk)


module.exports = router
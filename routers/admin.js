const express = require('express')

const router = express.Router()

const {uploadFile} = require('../middlewere/multer')

const {authAdmin} = require('../middlewere/auth')

const Pesanan = require('../controllers/admin/pesanan')
const Pembayaran = require('../controllers/admin/pembayaran')
const Produk = require('../controllers/admin/produk')
const Kategori = require('../controllers/admin/kategori')

router.get('/', authAdmin, Pesanan.viewBeranda)

router.get('/daftar-pembayaran', authAdmin, Pembayaran.viewPembayaran)
router.get('/tambah-pembayaran', authAdmin, Pembayaran.viewAddPembayaran)
router.post('/tambah-pembayaran', authAdmin, uploadFile, Pembayaran.actionAddPembayaran)
router.get('/perbarui-pembayaran/:pembayaranId', authAdmin, Pembayaran.viewAUpdatePembayaran)
router.post('/perbarui-pembayaran/:pembayaranId', authAdmin, uploadFile, Pembayaran.actionUpdatePembayaran)
router.get('/hapus-pembayaran/:pembayaranId', authAdmin, Pembayaran.actionDeletePembayaran)

router.get('/daftar-kategori', authAdmin, Kategori.viewKategori)
router.get('/tambah-kategori', authAdmin, Kategori.viewAddKategori)
router.get('/perbarui-kategori/:kategoriId', authAdmin, uploadFile, Kategori.viewUpdateKategori)
router.post('/perbarui-kategori/:kategoriId', authAdmin, uploadFile, Kategori.actiondUpdateKategori)
router.post('/tambah-kategori',authAdmin, uploadFile, Kategori.actiondAddKategori)
router.get('/hapus-kategori/:kategoriId', authAdmin, Kategori.deleteKategori)


router.get('/daftar-pesanan', authAdmin, Pesanan.viewPesanan)
router.get('/daftar-pesanan/:pesananId', authAdmin, Pesanan.viewPesananProduk)
router.get('/konfirmasi-pesanan/:pesananId', authAdmin, Pesanan.komfirmasiPesanan)
router.get('/input-jarak/:pesananId', authAdmin, Pesanan.viewInputOngkir)
router.post('/input-jarak/:pesananId', authAdmin, Pesanan.inputOngkir)

router.get('/daftar-produk', authAdmin, Produk.viewProduct)
router.get('/tambah-produk', authAdmin, Produk.viewAddProduct)
router.post('/tambah-produk', authAdmin, uploadFile, Produk.actionAddProduk)
router.get('/perbarui-produk/:produkId', authAdmin, Produk.viewUpdateProduct)
router.post('/perbarui-produk/:produkId', authAdmin, uploadFile, Produk.actionUpdateProduk)
router.get('/hapus-produk/:produkId', authAdmin, Produk.deleteProduk)

module.exports = router
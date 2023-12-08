const multer = require('multer')

const storage = multer.memoryStorage()
const nameFile = 'gambarProduk' || 'buktiPembayaran' || 'logoBank'
const uploadFile = multer({storage: storage}).any(nameFile)
module.exports = {
    uploadFile
}
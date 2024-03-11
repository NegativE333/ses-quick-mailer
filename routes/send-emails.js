const express = require("express");
const multer = require("multer");
const { handleSendEmail } = require("../controllers/send-emails");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function (req, file, cb){
        return cb(null, file.originalname);
    }
})

const upload = multer({storage : storage});

router.post('/', upload.single('csvFile'), handleSendEmail);

module.exports = router;

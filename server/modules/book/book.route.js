const router = require('express').Router();
const {upload} = require('../../common/FileSystem');
const {singleFileUpload, getallSingleFiles} = require('./book.controller');


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);


module.exports = router
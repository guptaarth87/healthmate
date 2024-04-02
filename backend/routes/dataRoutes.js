const express = require('express');
const { addData, deleteData, getAllData, getDataByAadhaar } = require('../controllers/dataController');

const router = express.Router();

router.post('/adddata', addData);
router.delete('/deletedata/:id', deleteData);
router.get('/getalldata', getAllData);
router.get('/getdatabyaadhaar/:aadhaarNumber', getDataByAadhaar);

module.exports = router;

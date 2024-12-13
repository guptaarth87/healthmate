const express = require('express');
const { addData, deleteData, getAllData, getDataByAadhaar, getCityData, getTopCitiesByDisease , getTopCitiesByMedicine } = require('../controllers/dataController');

const router = express.Router();

router.post('/adddata', addData);
router.delete('/deletedata/:id', deleteData);
router.get('/getalldata', getAllData);
router.get('/getcitydata', getCityData);
router.get('/getdatabyaadhaar/:aadhaarNumber', getDataByAadhaar);

// New routes for top 10 cities analytics
router.get('/gettopcitiesbydisease', getTopCitiesByDisease); // Fetch top 10 cities by disease name
router.get('/gettopcitiesbymedicine', getTopCitiesByMedicine);

module.exports = router;

const Data = require('../models/Data');

const addData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await Data.findByIdAndDelete(id);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCityData = async (req, res) => {
  try {
    const { city } = req.query; // Get city from query parameters
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    // Filter data based on city
    const cityData = await Data.find({ city: city });

    if (cityData.length === 0) {
      return res.status(404).json({ message: "No data found for this city" });
    }

    res.status(200).json({
      data: cityData,
      total: cityData.length, // Include total count in response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllData = async (req, res) => {
  console.log("in get block");
  try {
    const { page = 1, limit = 5 } = req.query; // Default values for pagination
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Fetch paginated data
    const allData = await Data.find().skip(skip).limit(parseInt(limit));
    const total = await Data.countDocuments(); // Get total count of documents

    res.status(200).json({
      data: allData,
      total, // Include total count in response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDataByAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber } = req.params;
    const data = await Data.find({ aadhaarNumber });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch top cities for a given medicine
const getTopCitiesByMedicine = async (req, res) => {
  try {
    const { medicineName } = req.query;
    if (!medicineName) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    // Aggregate data to get the count of cities where this medicine is used
    const medicineData = await Data.aggregate([
      { $match: { medicineName: medicineName } },
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ data: medicineData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch top cities for a given disease
const getTopCitiesByDisease = async (req, res) => {
  try {
    const { diseaseName } = req.query;
    if (!diseaseName) {
      return res.status(400).json({ error: "Disease name is required" });
    }

    // Aggregate data to get the count of cities where this disease is prevalent
    const diseaseData = await Data.aggregate([
      { $match: { diseaseName: diseaseName } },
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ data: diseaseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addData, deleteData, getAllData, getDataByAadhaar , getCityData, getTopCitiesByDisease , getTopCitiesByMedicine};

const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require('path');

const Index = async (req, res)=>{
    try{
        res.sendFile(path.join(__dirname,'templates','index.html'));
      // res.status(201).json({ message: 'App running successfully' });
  }catch(err){
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
const signup = async (req, res) => {
    console.log("sign up block")
  try {
    const { name, age, gender, pincode, aadhaarNumber, phoneNumber, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      age,
      gender,
      pincode,
      aadhaarNumber,
      phoneNumber,
      password: hashedPassword,
      email
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { aadhaarNumber, password } = req.body;
    const user = await User.findOne({ aadhaarNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' , status:200, data:user});
  } catch (error) {
    res.status(500).json({ error: error.message , status : 500});
  }
};

module.exports = { signup, login , Index };

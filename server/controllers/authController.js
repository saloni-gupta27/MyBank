import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });
    
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
    
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '999years',
        });
        res.status(201).json({ user: newUser, token });
    }
    catch(err){
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
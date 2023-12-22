const { token } = require('morgan');
const User = require('../models/userModels');
const mailer = require('../utils/Mailer');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');

// REGISTER API
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist ) {
      return res.status(400).json({
        success: false,
        msg: 'Entered email id is already registered with us. Login'
      });
    } 

    const user = new User({
      name,
      email,
      password,
    });


    await user.save(); // Use async/await to save the user

    res.status(201).json({
      success: true,
      msg: 'Account Created Successfully , Please Login',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Server issue',
    });
  }
};


//ACTIVE TOKEN



const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id)
    })
  } else {
    res.status(401).json({
      sucess: false,
      msg: 'unauthorized user'
    })
  }

};



const getUserProfile = async (req, res) => {
  const user = req.header && req.header._id ? await User.findById(req.header._id) : null;

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    })
  } else {
    res.status(404).json({
      sucess: false,
      msg: 'user not find'
    })
  }
}


const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.header._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
  

  const updateUser = await user.save();

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(updateUser._id)
  })

}else {
  res.status(404).json({
    sucess: false,
    msg: 'User not found'
  })
}
}




module.exports = {
  registerUser,
  
  authUser,
  getUserProfile,
  updateUserProfile
}




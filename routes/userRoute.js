const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')

const { registerUser ,
   
      authUser,
      getUserProfile,
      updateUserProfile
    } = require('../controller/userController');



// Use '/' to specify the root path for registration
router.route('/').post(registerUser);

router.route('/login' ).post(authUser);
router.route('/profile').get(protect , getUserProfile).put(protect , updateUserProfile); 


module.exports = router;




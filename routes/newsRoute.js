const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { addNews,getAllNews ,getNewsById  ,getSliderNews , getNewsByCategory , deleteNewsById, editNews} = require('../controller/newsController');


router.route('/addNews').post(protect, addNews);
router.route('/getAllNews').get(protect, getAllNews);
router.route('/getNewsById/:newsId').get(getNewsById);  
router.route('/getAllNews/slider').get( getSliderNews);
router.route('/getNewsByCategory/:catId').get( getNewsByCategory);
router.route('/deleteNews/:newsId').delete(protect , deleteNewsById);
router.route('/editNews/:newsId').put(protect , editNews);












module.exports = router;

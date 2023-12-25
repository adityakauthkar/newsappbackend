const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')

const {
    addCategory , 
    getAllCategories,
    deleteCategory , 
    editCategory 
} = require('../controller/categoryController');





router.route('/addCategory').post(protect , addCategory);
router.route('/deleteCategory/:catId').delete(protect , deleteCategory);
router.route('/getAllCategories').get(getAllCategories);
router.route('/editCategory/:catId').put(protect ,  editCategory );


module.exports = router;


const Category = require('../models/categoryModel');

//1.Add Category 

const addCategory = async (req, res, next) => {
    try {
        const { category_name } = req.body;

        const category = await Category.findOne({ category_name: category_name })

        if (category) {
            res.status(401).json({
                success: false,
                msg: 'Category already exists '
            })
        }

        const new_category = await Category.create({ category_name });
        res.status(201).json({
            success: true,
            msg: 'Category Created ',
            data: new_category
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured  ',
            
        });
    }
};


//2.Get all categories 
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}); 
        res.json({
            success: true,
            data: categories
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            msg: 'Category not fetched ',
            
        });
    }
};


//3.Delete a category 

const deleteCategory = async (req, res, next) => {

    try {

        const category = await Category.findByIdAndDelete(req.params.catId);
        res.status(201).json({
            success: true,
            msg: 'Category successfully deleted ',
            data: category
        })

        if (!category) {
            res.status(401).json({
                success: false,
                msg: 'Category not found '
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured',
           
        });
    }

}


//4. Update category

const editCategory = (async (req, res) => {
    let category = await Category.findById(req.params.catId);

    if (!category) {
        return res.status(401).json({
            success: false,
            msg: 'Category not found.'
        })
    }

    category = await Category.findByIdAndUpdate(req.params.catId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: category, msg: 'Successfully updated' });
})




module.exports = {
    addCategory , 
    getAllCategories,
    deleteCategory , 
    editCategory 
}



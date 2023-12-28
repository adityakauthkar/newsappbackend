const News = require('../models/newsModel');
// const User = require('../models/userModels');
// const Category = require('../models/categoryModel');

const ImageToBase64 = require('image-to-base64');


//1. Add news 
const addNews = async (req, res, next) => {
    try {

        console.log(req.body);

        const { author, title, content, category, addToSlider } = req.body;
        const base64Data = await ImageToBase64(req.files.newsImage.path);
        // console.log("base64Data" , base64Data);
        const news = await News.create({
            title, author, content, category, addToSlider, newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`, addedAt: Date.now()
        })

        if (news) {
            res.status(201).json({
                success: true,
                msg: 'News Added Sucessfully ',
                data: news
            })
        } else {
            res.status(400).json({
                success: false,
                msg: 'Invalid news data'
            })
        }

    } catch (error) {
        console.error('Error adding news:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal error occured  ',
        });
    }
};


//2.Fetch All news 
const getAllNews = async (req, res, next) => {
    try {
        const allNews = await News.find(); 
        res.status(200).json(allNews);
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'news not fetched ',    
        });
    }
};


//3.Get News by Id 

const getNewsById = async (req, res, next) => {
    try {
        const newsList = await News.findById(req.params.newsId)
            .populate({ path: 'category', select: ['_id', 'category_name'] })

        res.json({
            success: true,
            data: newsList 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error occurred',
            error: error.message
        });
    }
};



//4.News for Slider 
const getSliderNews = async (req, res, next) => {
    try {
        const newsList = await News.find({addToSlider: true})
            .populate({ path: 'category', select: ['_id', 'category_name'] })




        res.json({
            success: true,
            data: newsList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error occurred',
            error: error.message
        });
    }
};




//5.Get News By Category
const getNewsByCategory= async (req, res, next) => {
    try {
        const newsList = await News.find({category: req.params.catId})
            .populate({ path: 'category', select: ['_id', 'category_name'] })




        res.json({
            success: true,
            data: newsList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error occurred',
            error: error.message
        });
    }
};




//6.Delete News 
const deleteNewsById = async (req, res, next) => {

    try {

        const news = await News.findByIdAndDelete(req.params.newsId);
        res.status(201).json({
            success: true,
            msg: 'News successfully deleted ',
            data: news 
        });

        if (!news) {
            res.status(401).json({
                success: false,
                msg: 'News not found '
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured',
           
        });
    }

};


//7.Edit News By Id 
const editNews = (async (req, res) => { 
    let news = await News.findById(req.params.newsId);

    if (!news) {
        return res.status(401).json({
            success: false,
            msg: 'news not found.'
        })
    } 

    news = await News.findByIdAndUpdate(req.params.newsId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: news, msg: 'Successfully news updated' });
});







module.exports = {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNewsById,
    editNews
}

const News = require('../models/newsModel');
// const User = require('../models/userModels');
// const Category = require('../models/categoryModel');

const ImageToBase64 = require('image-to-base64');


//Add news 
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
        res.status(500).json({
            success: false,
            msg: 'Internal error occured  ',
        });
    }
};


//Fetch All news 
const getAllNews = async (req, res, next) => {
    try {


        const pageSize = req.params.pageSize;
        const pageNum = req.params.pageNum;

        var query = {};
        if (pageNum == 0 || pageNum < 0) {
            return res.status(401).json({
                success: false,
                msg: 'invalid page number should start from 1 '
            });
        }
        query.skip = pageSize * (pageNum - 1);

        query.limit = pageSize;



        const newsList = await News.find({})
            .sort('-addedAt')
            .populate({ path: 'category', select: ['_id', 'category_name'] })
            .limit(Number(query.limit))
            .skip(Number(query.skip));


        res.json({
            success: true,
            count: News.length,
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


//Get News by Id 

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



//News for Slider 
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




//Get News By Category
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




//Delete News 
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


//Edit News By Id 
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

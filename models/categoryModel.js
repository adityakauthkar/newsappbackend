const mongoose = require('mongoose');
const categorySchema =  new mongoose.Schema({
    category_name : String , 
    createdAt : {
        type: Date, 
        default: Date.now,
        required: true,
    }
});





module.exports = mongoose.model('Category' , categorySchema);

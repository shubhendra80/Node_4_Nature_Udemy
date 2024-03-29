const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour must have a name'],
        unique: true,
    },
    duration:{
        type: Number,
        required: [true, 'Tour must have a duration']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'Tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'Tour must have a difficulty']
    },
    price: {
        type: Number,
        required: [true, 'Tour must have a price'],
    },
    ratingAvarage: {
        type: Number,
        default: 4.5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    priceDiscount: Number,
    summary:{
        type: String,
        trim: true,
        required: [true, 'Tour must have a summary']
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, 'Tour must have a imageCover']
    },
    // array of string
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startDates: [Date],
    

})

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;
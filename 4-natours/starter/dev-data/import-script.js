const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
// const app = require('./app');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = 'mongodb+srv://shubh:X82gudRa8zQ2wV8n@cluster0.4wxh9.mongodb.net/natours?retryWrites=true&w=majority';
// console.log('Database',DB);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(connect => {
    // console.log('Connected to Database: ', connect);
    console.log('Connected to Database');
}).catch(err =>{
    console.log('Error connecting to Database: ', err);
});

const tour = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));
// ${__dirname}/../dev-data/data/tours-simple.json`

importData = async() =>{
    try{
      await Tour.create(tour);
      console.log('created Tour');
      process.exit()
    }catch(err){
        console.log('Error creating tour: ', err);
    }

} 

deleteData = async() =>{
    try{
        await Tour.deleteMany();
        console.log('deleted Tour');
        process.exit();
    }catch(err){
        console.log('Error creating tour: ', err);
    }

} 

if(process.argv[2]==='import'){
    importData()
}else if(process.argv[2]==='delete'){
    deleteData();
}

console.log(process.argv);

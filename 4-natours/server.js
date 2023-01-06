const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
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



// const tourData = new Tour({
//     name: 'peeli pahadi',
//     price: 1,
//     rating: 5
// })

// tourData.save().then(doc =>{
//     console.log('mongo doc', doc);
// }).catch(err =>{
//     console.log('error', err);
// })
// console.log(app.get('env'));
// console.log(process.env.PORT);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('server started listening on port: ', port);
});
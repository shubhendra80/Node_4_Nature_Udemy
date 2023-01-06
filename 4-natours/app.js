const express = require('express');
const morgan = require('morgan');
const userRoute = require('./starter/routes/userRoutes');
const tourRoute = require('./starter/routes/tourRoutes');



const app = express();

app.use(express.json());
if ( process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// app.get('/',(req,res)=>{
//     res.send('hi what you want, tell me comon');
// });

app.use(express.static(`${__dirname}/starter/public`))

app.use((req,res,next)=>{
    // console.log('Hi i am running this middleware');
    req.timeOfRequest = new Date().toISOString();
    next();
})










// app.get('/api/v1/tours',getTours);

// app.post('/api/v1/tour/:id',getTourByID);

// app.post('/api/v1/tours',addTour)

// // update the tour data using patch

// app.patch('/api/v1/tour/:id', updateTour);

// app.delete('/api/v1/tour/:id',deleteTour);





app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/users',userRoute);

module.exports= app;
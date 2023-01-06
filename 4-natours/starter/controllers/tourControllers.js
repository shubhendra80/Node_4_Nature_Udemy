const { match } = require('assert');
const fs = require('fs');
const Tour = require('../models/tourModel.js');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
// console.log(tours);

// exports.varifyId = (req,res,next,val) =>{
//     if(val * 1 > tours.length){
//         return res.status(404).json({
//             status: 'error',
//             message: 'invalid id'
//         });
//     }
//     next();
// }

// exports.checkBody = (req,res,next) =>{
//     if(!(req.body.name) || !(req.body.price)){
//         return res.status(400).json({
//             status: 'failed',
//             message: 'missing price or name'
//         });
//     }
//     next();
// };
exports.addParamsForAlias = (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='price,ratingAvarage';
    next();
}


// class APIFeatures {
//     constructor(query, reqQuery){
//         this.query = query;
//         this.reqQuery = reqQuery;
//     }

//     filter(){
//         const queryObject = { ...this.reqQuery };
//         const fieldsToRemove = ['sort', 'limit', 'page', 'fields'];
        
//         fieldsToRemove.forEach(field => delete queryObject[field]);
//         // console.log('queryObject',queryObject, 'rq.quer', req.query);

//         // Advanced filetring -

//         // console.log('::::query', req.query);

//         let queryString = JSON.stringify(queryObject);
//         queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`);
//         this.query = this.query.find(JSON.parse(queryString));
//         return this;
//     }


// }

exports.getTours = async(req,res)=>{

    console.log(req.query);


    try{
        const queryObject = { ...req.query };
        const fieldsToRemove = ['sort', 'limit', 'page', 'fields'];
        
        fieldsToRemove.forEach(field => delete queryObject[field]);
        // // console.log('queryObject',queryObject, 'rq.quer', req.query);

        // // Advanced filetring -

        // // console.log('::::query', req.query);

        let queryString = JSON.stringify(queryObject);

        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`)
        
        // console.log('::::queryObejct mod', JSON.parse(queryString));

        let query = Tour.find(JSON.parse(queryString));

        // const features = new APIFeatures(Tour.find(),queryString).filter();

        // Sorting-
        
        if(req.query.sort){
            let sortBy = req.query.sort.split(',').join(' ');
            console.log('sortBy', sortBy);

            query = query.sort(req.query.sort)
        }else{
            query = query.sort('-createdAt')
        }

        // fields

        if(req.query.fields){
            let fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v')
        }

        // Pagination

        let page = req.query.page * 1 || 1;
        let limit = req.query.limit * 1 || 100;
        let skip = (page -1 ) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page){
            let totalDocs = await Tour.countDocuments();
            if(totalDocs<= skip){
                throw new Error ('Page does not exist')
            }
        }

        const tours = await query;

        res.status(200).json(
            {
                status: 'success',
                resquestTime: req.timeOfRequest,
                results: tours.length,
                data: { 
                    tours
                }
            }
    );

    }catch(err){
        res.status(404).json({
            status: 'error',
            message: err.message,
        })
    }

    
}

exports.getTourByID = async(req,res)=>{
   // console.log(req.params);
    // multiplying by 1 to make it integer
    // const id = req.params.id * 1;
    // const tour = tours.find(el => el.id === id);
    // if (!tour){
    //     return res.status(404).json({
    //         status: "error",
    //         message: "No tour found."
    //     });
    // }
    // console.log(tour)


    try{
        const tour = await Tour.findById(req.params.id);

        // findByid is basically -> Tour.findOne({_id: req.params.id})
        res.status(200).json(
            {
                status: 'success',
                data: { 
                    tour
                }
            }
        );
    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err,
        })
    }
    
}

exports.addTour = async(req, res) => {

    // console.log(req.body);
    // res.send('Awesome work man');
    // const newId = tours[tours.length-1].id + 1;
    // const newObj = Object.assign ({id : newId}, req.body);
    // console.log(newObj);
    // tours.push(newObj);
    // console.log(tours)
    // fs.writeFile('./starter/dev-data/data/tours-simple.json', JSON.stringify(tours), (err)=>{
    //     if (err) console.log('Hire a better programmer');
    //     res.status(201).json({
    //         status: "success",
    //         data: newObj,
    //     })
    // })

    try{
    const newTour = await Tour.create(req.body);

    res.status(200).json({
        status: "success",
        data: newTour,
    });
    }catch(err){
        res.status(400).json({
            status: "error",
            message: err,
        })
    }

}

exports.updateTour = async(req, res) => {

    try{

        // const tour = await Tour.updateOne({_id: req.params.id}, {$set: req.body})

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        
        res.status(200).json({ 
            status: "success",
            data: {
                tour
            }
        });


    }catch(err){
        res.status(400).json({
            status: "error",
            message: err,
        })
    }

}

exports.deleteTour = async(req,res) =>{
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'error',
    //         message: 'invalid id'
    //     });
    // }

    try{
        // const deleted = await Tour.deleteOne({_id: req.params.id});
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({ 
            status: "success",
            data: null
        });

    }catch(err){
        res.status(400).json({
            status: "error",
            message: err,
        })
    }

}

exports.getTourStats = async(req,res)=>{
    try{
        const result = await Tour.aggregate([
            {
                $match:{
                    ratingAvarage: {$gte: 4.5 }
                },
            },
            {
                $group:{
                    _id: '$difficulty',
                    maxPrice: {$max: '$price'},
                    minPrice: {$min: '$price'},
                    avgDuration: {$avg: '$duration'},
                    totalTours: {$sum: 1}         
                }
            },{
                $sort: { avgDuration : -1 }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                result
            }
        })
    }catch (err){
        res.status(400).json({
            status: "error",
            message: err.message,
        })
    }
}
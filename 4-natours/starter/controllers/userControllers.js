
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
// console.log(tours);

exports.getUsers = (req,res)=>{
    res.status(200).json(
        {
            status: 'success',
            resquestTime: req.timeOfRequest,
            data: { 
                tours
            }
        }
    );
}

exports.getUserByID = (req,res)=>{
   // console.log(req.params);
    // multiplying by 1 to make it integer
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour){
        return res.status(404).json({
            status: "error",
            message: "No tour found."
        });
    }
    // console.log(tour)
    res.status(200).json(
        {
            status: 'success',
            data: { 
                tour
            }
        }
    );
}

exports.addUser = (req, res) => {

    // console.log(req.body);
    // res.send('Awesome work man');
    const newId = tours[tours.length-1].id + 1;
    const newObj = Object.assign ({id : newId}, req.body);
    // console.log(newObj);
    tours.push(newObj);
    // console.log(tours)
    fs.writeFile('./starter/dev-data/data/tours-simple.json', JSON.stringify(tours), (err)=>{
        if (err) console.log('Hire a better programmer');
        res.status(201).json({
            status: "success",
            data: newObj,
        })
    })
}

exports.updateUser = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'error',
            message: 'invalid id'
        });
    }

    res.status(200).json({ 
        status: "success",
        data: {
            tour: 'updated tour will be here'
        }
    });

}

exports.deleteUser = (req,res) =>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'error',
            message: 'invalid id'
        });
    }

    res.status(204).json({ 
        status: "success",
        data: null
    });
}
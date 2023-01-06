const fs = require('fs');
const superagent = require('superagent');

// fs.readFile('./dog.txt', (err, data) => {
//     // console.log('dog breed is '+ data);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random
//     `).end((err, res) => {
//         // console.log(res.body.message)
//         if (err) return console.log(err.message);

//         fs.writeFile('./dogData.txt', res.body.message, (err) => {
//             if (err) return console.log(err.message);
//             console.log('data written about dogs');
//         });

//     })

// });


// Using promises-- 

const readfilePromise = (fileName) =>{
    return new Promise ((resolve,reject)=>{ 
        fs.readFile(fileName,(err,data)=>{ 
            if (err) reject(err);
            resolve(data);
        })
    });
}

const writeFilePromise = (fileName,content) =>{ 
    return new Promise ((resolve,reject)=>{ 
        fs.writeFile(fileName, content, (err)=>{ 
            if (err) reject (err);
            resolve('file is written');
        } )
    });
}

// readfilePromise('./dog.txt').then(data=>{
// // console.log(data);
//  return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// }).then(data =>{ 
//      return writeFilePromise('./dogData.txt',data.body.message);
// }).then(data=>{ 
//     console.log(data);
// }).catch(err=>{console.log(err)})

// using aysnc and await instead of then to resolve promises

const modAsyncFunc = async () => { 
    try { 
        const dogName = await readfilePromise('./dog.txt')
        const dogData = await superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
        const message = await writeFilePromise('./dogData.txt',dogData.body.message);
        console.log(message);
    }
    catch(err){
        console.log(err);
    }
  
}

modAsyncFunc();


//  if you return something from a fucntion that is declared as a aysnc function it will return a promise so 
// we should use .then or aysnc await on that too to get the data



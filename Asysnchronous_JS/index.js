const fs = require('fs');
const superagent = require('superagent');

fs.readFile('./dog.txt', (err, data) => {
    // console.log('dog breed is '+ data);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random
    `).end((err, res) => {
        // console.log(res.body.message)
        if (err) return console.log(err.message);

        fs.writeFile('./dogData.txt', res.body.message, (err) => {
            if (err) return console.log(err.message);
            console.log('data written about dogs');
        });

    })

});
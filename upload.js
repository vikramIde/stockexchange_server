var csv = require('fast-csv');
var mongoose = require('mongoose');
require('dotenv').config()
let fs = require('fs');
let readableStreamInput = fs.createReadStream('./stockExchange.csv');
let csvData = [];
var Stock = require('./models/stockMaster');
mongoose.connect(process.env.mongoDBURL, () => {

    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log('Web Api is now listening for request on port '+ PORT)
    })
}).catch(err => console.log('Error while connecting DB', err))

function chunkArray(array, chunkSize) {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)   
  );
}
async function uploadData(dataArray) {
  try {
    const chunks = chunkArray(dataArray, 100);
    for(const chunk of chunks) {
      await uploadDataChunk(chunk);
    }
  } catch(error) {
    // Catch en error here
  }
}

function uploadDataChunk(chunk) {
   
  Stock.create(chunk, function(err, documents) {
                    if (err) throw err;
                    else
                        console.log(documents)
                });
}
// exports.post = function (req, res) {
     console.log('In Upload js')
    try{
        var stocks = [];
        var batch = 100;
        var count = 0;
        csv
         .fromPath('./stockExchange.csv',{
             headers: true,
             ignoreEmpty: true
         })
         .on("data", function(data){
             data['_id'] = new mongoose.Types.ObjectId();
             stocks.push(data);
             count +=1
             console.log(count)
             // if(stocks.length==batch && count<850667)
             // {

             //    Stock.create(stocks, function(err, documents) {
             //        if (err) throw err;
             //    });
             //    stocks = [];
             // }
             // else{
             //    Stock.create(stocks, function(err, documents) {
             //        if (err) throw err;
             //    });
             // }
         })
         .on("end", function(){
            uploadData(stocks)
            console.log('Stocks uploading')
            //res.send(count + ' stocks have been successfully uploaded.');
         });
    }
    catch(er)
    {
        console.log(er)
        return res.status(400).send('No files were uploaded.');
    }
   

// };
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
	accessKeyId: "AKIAIENUXQBJA6TDCWOA",  
	secretAccessKey: "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",  
    region: "us-west-2",
//    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing wine into DynamoDB. Please wait.");

var allwine = JSON.parse(fs.readFileSync('wine.json', 'utf8'));
allwine.forEach(function(wine) {
    var params = {
        TableName: "Wine",
        Item: {
            "vineyard":  wine.vineyard,
            "type":  wine.type,
            "regn": wine.regn,
	    "yr": wine.yr,
            "price": wine.price			
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", wine.type, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", wine.vineyard);
       }
    });
});

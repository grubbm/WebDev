var AWS = require("aws-sdk");

AWS.config.update({
	accessKeyId: "AKIAIENUXQBJA6TDCWOA",  
	secretAccessKey: "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",  
    region: "us-west-2",
//    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Wine",
    KeySchema: [       
        { AttributeName: "vineyard", KeyType: "HASH"},  //Partition key
        { AttributeName: "regn", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "vineyard", AttributeType: "S" },
        { AttributeName: "regn", AttributeType: "S" }
   	 ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


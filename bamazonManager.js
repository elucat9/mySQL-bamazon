//  Node application: bamazonCustomer.js. 
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    
    console.log("connected as id " + connection.threadId);
    start();
});


var start = function(){
  connection.query("SELECT * FROM storeproducts", function(err, res){
    if(err) throw err;
    console.log(res);
  }) 
  inquirer.prompt ({
      name: "buy",
      type: "rawlist",
      message: "Which item would you like to purchase today?",
      choices: [
      "001", 
      "002", 
      "003",
      "004",
      "005",
      "006",
      "007",
      "008",
      "009",
      "010",
    ]
  }).then(function(answer){

    if(answer.buy=="001"){
      fiftyshades();
    } else{
      console.log("hmm")
    }
  })
}

var fiftyshades = function(){
  inquirer.prompt({
    name: "QTY",
    type: "input",
    message:"QTY:"
  })
  .then(function(answer){
    if(answer.QTY>=res[0].stock_quantity){
    reduceStockQTY();
  } else {
  console.log("Sorry, out of stock!")
  }
})
}


        
      



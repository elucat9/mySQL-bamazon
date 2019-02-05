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

//Run app to display all of the items available for sale. 
    //Include product id, name, and price 


// The app should then prompt users with two messages.
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


        
      


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units they would like to buy.

// Once the customer has placed the order, 
    //your application should check if your store has enough 

// If not, the app should log a phrase like Insufficient quantity!, 
//and then prevent the order from going through.

// However, if there is enough, you should fulfill the customer's order.

// Update the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost 

  

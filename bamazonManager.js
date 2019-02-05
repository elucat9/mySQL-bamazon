// connect sql database

var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err
        // run function after the connection is made to prompt the customer purchase item and qty
    buyStuff()
});
var buyStuff = function() {
    connection.query("SELECT * FROM bamazon_products", function(err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            console.log("Item No.: " + res[i].item_id)
            console.log("Product: " + res[i].product_name)
            console.log("Price: " + res[i].price)
            console.log("- - - - - - - - - - - - - - - - ")
        }
        buyWhat()
    })
};
// user should only be able to input QTYs that is NOT zero or negative
var posInt = function(value){
    var int = Number.isInteger(parseFloat(value))
    var posNegSign = Math.sign(value)
    if (int && (posNegSign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.'
    }
}
// function to prompt the customer
var buyWhat = function(){
    inquirer.prompt([{
      //ask customer 2 questions - what they want to buy and how many
                type: "input",
                name: "item_id",
                message: "Select the item you wish to purchase by entering the Item ID.",
                validate: posInt,
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: posInt,
                filter: Number
            }
        ])
        .then(function(buyWhat) {
            var item = buyWhat.item_id
            var purchQTY = buyWhat.quantity
            var queryStr = 'SELECT * FROM bamazon_products WHERE ?';
            connection.query(queryStr, { item_id: item }, function(err, res) {
                if (err) throw err
                if (res.length === 0) {
                    console.log("ERROR: Invalid Item ID. Please select a valid Item ID.")
                    buyStuff()
                } else {    
                    var inventoryInfo = res[0]
                    if (purchQTY <= inventoryInfo.stock_quantity) {
                        
                        var updateQueryStr = "UPDATE bamazon_products SET stock_quantity = " + (inventoryInfo.stock_quantity - purchQTY) + " WHERE item_id = " + item
                            
                        connection.query(updateQueryStr, function(err, data) {
                            if (err) throw err;
                            console.log("Your order has been placed!");
                            console.log("Item ordered: " + inventoryInfo.product_name);
                            console.log("QTY: " + purchQTY);
                            console.log("Total balance due: $" + inventoryInfo.price * purchQTY);
                            console.log("Thank you for shopping with bamazon!");
                            console.log(" - - - - - - - - - - - - - - - ");
                            console.log("If you would like to order another item, please input 'node bamazonCustomer.js' into your command line again.");
                            // End the database connection
                            connection.end();
                        })
                    } else {
                        console.log("We apologize for the inconvenience, but we do not have enough " + inventoryInfo.product_name + " in stock.")
                        console.log("Please modify your order or select another item.")
                        // display our list of items again after 3 seconds so the customer can redo their order
                        setTimeout(function() { buyStuff() }, 3000)
                    }
                }
            })
        })
}
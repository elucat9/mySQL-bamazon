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


connection.connect(function (err) {
    if (err) throw err;
    showAll()

});

var showAll = function () {
    connection.query("SELECT * FROM bamazon_products", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            console.log("Item No.: " + res[i].item_id)
            console.log("Product: " + res[i].product_name)
            console.log("Price: " + res[i].price)
            console.log(" ")
        }
        prompts()
    })

}

var prompts = function () {
    inquirer.prompt([
        {
            // ask the customer what they want to buy, select by Item ID
            type: "input",
            name: "item_id",
            message: "Select the item you wish to purchase by entering the Item ID.",
            filter: Number
        },
        //ask the customer how many they want to buy
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            filter: Number
        }
    ])
    .then(function (prompts) {
        var item = prompts.item_id
        var purchQTY = prompts.quantity
        var table = 'SELECT * FROM bamazon_products WHERE ?';
        connection.query(table, { item_id: item }, function (err, res) {
            var inventoryInfo = res[0]
            if (purchQTY <= inventoryInfo.stock_quantity) {
            var updateTable = "UPDATE bamazon_products SET stock_quantity = " + (inventoryInfo.stock_quantity - purchQTY) + " WHERE item_id = " + item
            connection.query(updateTable, function (err, data) {
            if (err) throw err;
            console.log("Your order has been placed!");
            console.log("Item ordered: " + inventoryInfo.product_name);
            console.log("QTY: " + purchQTY);
            console.log("Total balance due: $" + inventoryInfo.price * purchQTY);
            console.log("Thank you for shopping with bamazon!");            
            console.log("If you would like to order another item, please input 'node bamazonManager.js' into your command line again.");

            
            })
            } else {

                console.log("We do not have that many items in stock. Please input 'node bamazonManager.js' into your command line to modify your order.")
            }
            connection.end();
        })

    })
}










# mySQL-bamazon
###Languages and Technology Used: JSON, inquirer, node.js, mySQL, javascript

mySQL is used to create a Amazon-like storefront in which the user can deplete inventory by purchasing items. First an inventory database is made in mySQL workbench.

![mySQL Workbench - creating a table](createtable.JPG)

Next, the table is populated with 10 inventory items, each item has an ID, name, department, price and stock quantity.
![mySQL Workbench - populating a table](populatetable.JPG)

Then, in node.js, the user would be shown the store catalogue when they input 'node bamazonManager.js' into the commad line. They can order an item by answering two prompts, which item they would like to buy and how many. The order is completed by answering the prompts. The total price is calculated and displayed. The user would then have the option of making another purchase.
![1 companion cube ordered](itemorder.JPG)

The inventory stock has reduced by the user's purchased quantity.
![mySQL Workbench - inventory is depleted](depleteinventory.JPG)

If user's order quantity is larger than what is in stock, they will get be prompted to modify their order.
![Ordering 51 copies of 50 Shades of Chicken when there is only 50 copies in stock](ordertoolarge.JPG)



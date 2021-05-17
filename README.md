# shoppingCart
This is server side project
You need to install mysql database on your device or use any other mysql server. Just need to change the DBconfig on src/app/config folder

Run npm install to install all packages.

Run npm run start:dev to run the project.

The project will start on PORT: 3000

#APIs:

Product:
Post: http://localhost:3000/api/product/ : Insert product. Should send title, description, price and picture address in the body
Path: http://localhost:3000/api/product/:id : Update product. Should send title, description, price and picture address in the body and insert the id in the url
Delete: http://localhost:3000/api/product/:id : Delete the product with Id
Get: http://localhost:3000/api/product/products : Fetch filtered products. You can send title or description or both of them in the body and receive filtered products

Cart:
Post: http://localhost:3000/api/cart/ : Insert cart item. Should send productId, and productCount in the body. The response will be updated cart
Patch: http://localhost:3000/api/cart/:productId : Insert product. Should send productId, and productCount in the body. The product will be updated in the cart.The response will be updated cart
Get: http://localhost:3000/api/cart/items : Receive active cart items;
Get: http://localhost:3000/api/cart/items : Receive active cart items and checkout invoice;

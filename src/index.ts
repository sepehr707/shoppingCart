import {db} from './app/model';
import express from 'express'
import {router as product} from "./app/router/product.router";
import {router as cart} from "./app/router/cart.router";

const app = express();
const PORT = 3000;

app.use(express.json());
db.sequelize.sync();

app.use('/api/product', product);
app.use('/api/cart', cart);
app.get('/', (req: any, res: any) => {
    res.send('Hello')
});

app.listen(PORT,() => {
    console.log(`APP is listening on PORT ${PORT}`)
});

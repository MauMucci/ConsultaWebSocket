
import { ProductManager } from '../Managers/ProductManager.js'
import { Router } from "express";


const viewsRouter = Router()
const pm = new ProductManager("./files/products.json")


viewsRouter.get('/',async (req,res) => {
    const products = await pm.getProductsAsync()    
    res.render('index',{products})
})


viewsRouter.get('/realTimeProducts', async (req, res) => {
    const products = await pm.getProductsAsync();
    res.render('realTimeProducts');
});

export default viewsRouter
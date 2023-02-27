import { Router } from "express";
import dirName from '../utils.js';

const router = Router();
const Manager = new ProductManager()

router.get('/', (req, res) => {
    const list = Manager.GetProducts()
    res.render('home', {products: list})
});

router.get('/realtimeproducts', (req, res) => {res.render('realtimeproducts', {})});

export default router;
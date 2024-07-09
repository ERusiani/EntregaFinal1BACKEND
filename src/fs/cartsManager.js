import fs from "fs"

const PATH = "src/files/carts.json";

class cartsManager {
    constructor() {
    this.init();
    }
    
    
    async init(){
        if(!fs.existsSync(PATH)){
            await fs.promises.writeFile(PATH, JSON.stringify([]));
        }
    }

    addCart(){
        const newCart = {}

        const cartsData = fs.readFileSync(PATH, 'utf-8');
        const carts = JSON.parse(cartsData);
        
        if(carts.length === 0){
            newCart.id = 1;
        }else {
            newCart.id = carts[carts.length - 1].id + 1;
        }
        newCart.products=[];
        carts.push(newCart);

        fs.writeFileSync(PATH, JSON.stringify(carts, null, 4));
    }
    
    addProduct(cart,produc){
        const newProduct = {}

        const cartsData = fs.readFileSync(PATH, 'utf-8');
        const carts = JSON.parse(cartsData);

        const productsData = fs.readFileSync(this.productsPath, 'utf-8');
        const products = JSON.parse(productsData);
        
        newProduct.id=produc;
        newProduct.quantity=1;

        products.forEach(product => {
            if(product.id===produc){
                carts.forEach(Cart => {
                    if(Cart.id===cart){
                        Cart.products.push(newProduct);
                    }
                });
            }
        });

        fs.writeFileSync(PATH, JSON.stringify(carts, null, 4));
    }

    getCart(cid){
        const cartsData = fs.readFileSync(PATH, 'utf-8');
        const carts = JSON.parse(cartsData);

        const cart = carts.map(Cart => {
            if(Cart.id===cid){
                return Cart;
            }
        });
        return cart;
    }
}

export default cartsManager;
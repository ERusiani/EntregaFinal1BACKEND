import fs from "fs"

const PATH = "src/files/products.json";

class ProductManager {
    constructor() {
    this.init();
    }

    async init(){
        if(!fs.existsSync(PATH)){
            await fs.promises.writeFile(PATH, JSON.stringify([]));
        }
    }

    addProducts({title, description, code, price, stock, category}){
        try{
            const Product = {
                title,
                description,
                code,
                price,
                stock,
                category
            };
            if(!Product.stock){
                Product.stock=1;
            }

            Product.status = true;

            const productsData = fs.readFileSync(PATH, 'utf-8');
            const products = JSON.parse(productsData);
            
            let oldproduct;
            products.forEach(product => {
                if(Product.code===product.code){
                    product.stock += Product.stock;
                    oldproduct=true;
                }
            });
            
            if(products.length === 0){
                Product.id = 1;
            }else {
                Product.id = products[products.length - 1].id + 1;
            }

            if(!oldproduct){
                products.push(Product);
            }

            fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
            console.log("Product added");

        } catch(error){
            console.log("Error adding product:", error);
        }
    }

    getProducts(){
        const productsData = fs.readFileSync(PATH, 'utf-8');
        const data = JSON.parse(productsData);
        if(data.length==0){
            return null;
        }else{
            return data;
        }
    }

    getProductsByID(id){
        try{
            const productsData = fs.readFileSync(PATH, 'utf-8');
            const products = JSON.parse(productsData);

            let retProduct;
            products.forEach(product => {
                if(id===product.id){
                    retProduct=product;
                }
            });

            if(retProduct.length==0){
                return null;
            }else{
                return retProduct;
            }
        } catch(error){
            console.log("Error finding product:", error);
        }
    }
    

    updateProducts(id,newValues){
    try{
        const productsData =  fs.readFileSync(PATH, 'utf-8');
        const products = JSON.parse(productsData);

    products.forEach(product => {
            if(id===product.id){
                product.title=newValues.title||product.title;
                product.description=newValues.description||product.description;
                product.code=newValues.code||product.code;
                product.price=newValues.price||product.price;
                product.stock=newValues.stock||product.stock||1;
                product.category=newValues.category||product.category;
            }
        });
        fs.writeFileSync(PATH, JSON.stringify(products, null, 4));
    } catch(error){
        console.log("Error modifing product:", error);
    }
    }
    
    deleteProducts(id){
        try{
            const productsData = fs.readFileSync(PATH, 'utf-8');
            const products = JSON.parse(productsData);

            products.forEach(product => {
                if(id===product.id){
                    products.splice(products.indexOf(product),1);
                }
            });
            fs.writeFileSync(PATH, JSON.stringify(products, null, 4));
        } catch(error){
            console.log("Error eliminating product:", error);
        }
    }
}



export default ProductManager;
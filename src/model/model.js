export class ProductModel{
    constructor(name,description,price,brand,stock,images,categoryId,packageId){
        this.name= name;
        this.description= description;
        this.price= price;
        this.brand= brand;
        this.stock= stock;
        this.images= images;
        this.categoryId= categoryId;
        this.packageId= packageId;
    }
 }
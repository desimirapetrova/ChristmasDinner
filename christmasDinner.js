class ChristmasDinner {
   constructor(budget){
       this.budget=budget;
       this.dishes=[];
       this.products=[];
       this.guests={};
   }
   get budget(){
       return this._budget;
   }
   set budget(value){
       if(value<0){
           throw new Error("The budget cannot be a negative number");
       }
       this._budget=value;
   }
   shopping([product]){
       let items=product.split(',')
       let productType=items[0];
       let productPrice=items[1];
       if(this.budget<productPrice){
           throw new Error("Not enough money to buy this product");
       }
       this.budget-=productPrice;
       this.products.push(productType);
       return `You have successfully bought ${productType}!`
   }
   recipes(recipe){
    //    recipe={recipeName:"",
    // productsList:[]}
    let isPresent=true;
    let {recipeName,productsList}=recipe;
   productsList.some((product)=>{
       if(!this.products.includes(product)){
           isPresent=false;
       }
   });
   // console.log(p);
    if(!isPresent){
        throw new Error("We do not have this product");
    }
    this.dishes.push({recipeName,productsList});
    return `${recipeName} has been successfully cooked!`
   }
   inviteGuests(name, dish){
       let isPresent=false;
    //    this.guests.forEach((name)=>{

    //    })
       this.dishes.forEach((obj)=>{
           if(obj.recipeName===dish){
               isPresent=true;
           }
       })
    // let Dish=this.dishes.find((d)=>{
    //     return d.dish===dish;
    // });
    // console.log(Dish);
       if(!isPresent){
        throw new Error("We do not have this dish");
       }
       if (name in this.guests) {
        throw new Error('This guest has already been invited');
    }
    this.guests[name] = dish;
    return `You have successfully invited ${name}!`;
   }
   showAttendance() {
    let output = '';
    Object.keys(this.guests).forEach(name => {
        let dish = this.guests[name];
        let products = [];
        this.dishes.forEach((curDish) => {
            if (curDish.recipeName === dish) {
                products = curDish.productsList;
            }
        });
        output += `${name} will eat ${dish}, which consists of ${products.join(', ')}\n`;
    });
    return output.trim();
}
}

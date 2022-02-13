module.exports = function Cart(oldCart){

    //This is a javascript object

    // Define Properties
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    

    // Method 1: Function to add new item to old cart
    this.add = function( item, id){

        let storedItem = this.items[id];

        // If item does not exist, then create a new entry
        if ( !storedItem){
            storedItem = this.items[id] = {item: item, 
                                        qty : 0,
                                        price : 0}
        }
        
        // Then increment quantity
        // Update item quantity and price
        // This also applies to the 'else' case for exiting items
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;

        // Update total quantity and price
        this.totalQty++;
        this.totalPrice += storedItem.price ;


    };

    // Method 2: Generate Cart as array
    this.generateArray = function() {
        let arr = [];

        for( let id in this.items){
            arr.push(this.items[id]);
        }
        return arr;

    };



};
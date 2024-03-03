const mongoose = require('mongoose')
const {Schema} = mongoose



main()
.then(()=> console.log('connection successful'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
   item :String,
   price : Number, 
})

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type: Schema.Types.ObjectId,
            ref : "Order"
        }
     ]
})

const Order = mongoose.model("Order",orderSchema)
const Customer = mongoose.model("customer",customerSchema)

const addCustomer = async()=>{
    let cust1 = new Customer({
        name : "rup medhi",
    })

    let order1 = await Order.findOne({item :"book"});
    let order2 = await Order.findOne({item :"pen"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save()
    console.log(result);
}

addCustomer()


// const AddOrder = async()=>{
//  let res = await Order.insertMany([
//         {item:'apple',price:5},
//         {item:'book',price:25},
//         {item:'pen',price:15},
//  ])
//     console.log(res);
// }

// AddOrder()
const mongoose = require('mongoose')
const {Schema} = mongoose



main()
.then(()=> console.log('connection successful'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username : String,
    addresses : [
        {
            location: String,
            city : String,
        }
    ]
})

const User = mongoose.model('User',userSchema)

const addUser = async()=>{
    let user1 = new User({
        username:"rup medhi",
        addresses : [{
            location : "dharamtul",
            city : "morigaon",
        }]
    })

    user1.addresses.push({location : "raha",city :"nagaon"})

   let result = await user1.save()
   console.log(result);
}

addUser()
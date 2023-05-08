const express = require('express')
const mongoose = require("mongoose")
const mongoURL = `mongodb+srv://abrar:3NUfKV42ivL3fxNm@cluster0.ekd31bu.mongodb.net/admin1?retryWrites=true&w=majority`

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const port = 8000;

//  create schema for mongodb atlas 

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    cretedAt: {
        type: Date,
        default: Date.now
    }
})

//   create modal
 const Product =  mongoose.model("Products", productSchema) 


//  connect database 

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL)
        console.log("Databse is Connected")
    } catch (error) {
        console.log("db not connected ", error)
        process.exit(1)
    }
}




app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`)
    await connectDB()
})

//  send request from server 

app.get("/", (req, res) => {
    res.send("welcome to home page")
})

app.post("/products", async (req, res)=>{
     try {
        //  get  data from databasae body
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description

        // const newProduct = new Product({
        //     title : title,
        //     price : price,
        //     description: description, 
        // })
 // post single object , then modal name and uses save() function   
        
      const productData = await Product.insertMany([
             {
                "title" : "i phone 7 ",
                 "price" : 211,
                 "description" :"this is i phone 7"
             },
             {
                "title" : "i phone 8 ",
                 "price" : 311,
                 "description" :"this is i phone 8"
             },
             {
                "title" : "i phone 9 ",
                 "price" : 411,
                 "description" :"this is i phone 9"
             }
        ]) 
        res.status(201).send(productData )


     } catch (error) {
         res.status(5000).send({massage : error.massage})
     }
})

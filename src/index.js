
const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const mongodata = process.env.MONGODB_URI;
<<<<<<< HEAD
=======
// const mongodata = "mongodb+srv://babunroy987:Gpn262347@cluster0.bdzq8wo.mongodb.net/FoodPlace?authMechanism=DEFAULT"
>>>>>>> dab94059068b096ae638f45f7e3d99d9dc2ef927
// console.log(mongodata);
app.use(
    cors({
        // origin: "https://foodplaceindia.netlify.app/"
        origin: "*"
    })
);

mongoose.connect(mongodata)
    .then(() => {
        console.log(`Database Connected!`);
        const fetch_data = mongoose.connection.db.collection("Manage");
        fetch_data.find({}).toArray()
            .then((data) => {
                const foodCategory = mongoose.connection.db.collection("Food_Category");
                foodCategory.find({}).toArray()
                    .then((catData) => {
                        global.food_items = data;
                        global.foodCategory = catData;
                    })
            })
            .catch(() => {
                console.log("Server Error!");
            })
    })
    .catch((err) => {
        console.log(`Connection Failed!${err}`);
    });


app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderedData"));



app.listen(5000, () => {
    console.log(`Server is running on port : 5000`);
});


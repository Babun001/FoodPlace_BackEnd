
const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const mongodata = process.env.MONGODB_URI;
console.log(mongodata);
app.use(
    cors({
        origin: "https://foodplaceindia.netlify.app/"
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
            .catch((err) => {
                console.log("Server Error!");
            })
    })
    .catch(() => {
        console.log(`Connection Failed`);
    });


app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));



app.listen(5000, () => {
    console.log("Server is running on port : 5000");
});


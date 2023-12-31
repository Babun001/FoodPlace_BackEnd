const { default: mongoose } = require('mongoose')
const mongodata = require('mongoose')

const {Schema} = mongoose

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    ordered_data:{
        type: Array,
        required: true,

    }
});

module.exports = mongoose.model('order', OrderSchema)
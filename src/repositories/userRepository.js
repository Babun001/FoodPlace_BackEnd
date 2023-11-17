const User = require('../models/User')

const createUser = async (name, SecPassword, email, location) =>{
    try {
        await User.create({
            name: name,
            password: SecPassword,
            email: email,
            location: location

        })
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

module.exports={createUser};
const mongoose =  require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:'Este campo é obrigatório'
    },
    image:{
        type:String,
        required:'Este campo é obrigatório'
    }

})

module.exports = mongoose.model('Category',categorySchema)
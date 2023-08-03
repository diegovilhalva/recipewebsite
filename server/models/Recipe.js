const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
      name: {
        type: String,
        required: 'Este campo é obrigatório'
      },
      description: {
        type: String,
        required: 'Este campo é obrigatório'
      },
      email: {
        type: String,
        required: 'Este campo é obrigatório'
      },
      ingredients: {
        type: Array,
        required: 'Este campo é obrigatório'
      },
      category: {
        type: String,
        enum: ['Tailandesa', 'Americana', 'Chinesa', 'Mexicana', 'Indiana','Espanhola'],
        required: 'Este campo é obrigatório'
      },
      image: {
        type: String,
        required: 'Este campo é obrigatório'
      },
})
recipeSchema.index({name:'text',description:'text'})

recipeSchema.index({"$**":'text'})

module.exports = mongoose.model('Recipe',recipeSchema)
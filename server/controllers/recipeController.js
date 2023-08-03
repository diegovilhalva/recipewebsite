 require("../models/database")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")



exports.homepage  =  async(req,res) => {
    try {

      const number = 5
      const categories = await Category.find({}).limit(number)
      const latest = await Recipe.find({}).sort({__id:-1}).limit(number)
      const thai = await Recipe.find({'category':'Tailandesa'}).limit(number)
      const american = await Recipe.find({'category':'Americana'}).limit(number)
      const chinese = await Recipe.find({'category':'Chinesa'}).limit(number)
      const indian = await Recipe.find({'category':'Indiana'}).limit(number)
      const mexican =   await Recipe.find({'category':'Mexicana'}).limit(number)
      const food = {latest,american,chinese,thai,mexican,indian}
      res.render("index",{title:'Cooking Blog - Home',categories:categories,food:food})
    } catch (error) {
      res.status(500).send({message:error.message || 'Ocorreu um erro'})
    }
    
}
exports.exploreCategories = async (req,res) => {
  try {
    const categories = await Category.find({})
    res.render('categories',{title:'Cooking Blog - Categorias',categories:categories})
  } catch (error) {
    res.status(500).send({message:error.message || 'Ocorreu um erro'})
  }
}

exports.exploreRecipe =  async (req,res) => {
  try {
    let id = req.params.id
    const recipe = await Recipe.findById(id)
    res.render('recipe',{title:`${recipe.name}`,recipe})
  } catch (error) {
    res.status(500).send({message:error.message || 'Ocorreu um erro'})
  }
}
exports.exploreCategoriesById = async (req,res) => {
  try {
    let categoryId = req.params.id 
    const categoryById = await Recipe.find({'category':categoryId})

    res.render('categoryRecipe',{title:'Cooking Blog - Categorias',categoryById,categoryName:categoryId})
  } catch (error) {
    res.status(500).send({message:error.message || 'Ocorreu um erro'})
  }
}

exports.searchRecipe = async (req,res) => {
  
   try {
    const searchTerm = req.body.searchTerm
    let recipe = await Recipe.find({$text:{$search:searchTerm,$diacriticSensitive:true}})

    res.render('search',{title:'Cooking Blog - Pesquisa',recipe})  
   } catch (error) {
    console.log(error)
   }
}

exports.exploreLatest = async (req,res) => {
  try {
    const number  = 20
   
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(number)
    res.render('explore-latest',{title:'Cooking Blog - últimas receitas',recipe})
  } catch (error) {
    res.status(500).send({message:error.message || 'Ocorreu um erro'})
  }

}



exports.showRandom =  async (req,res) =>{
  try {
    let count = await Recipe.find({}).countDocuments()
    let random = Math.floor(Math.random() *  count)
    let recipe = await Recipe.findOne().skip(random).exec()
    res.render('show-random',{title:`Cooking Blog - ${recipe.name}`,recipe})
  } catch (error) {
    
    res.status(500).send({message:error.message || 'Ocorreu um erro'})
  }
}

exports.submitRecipe = async (req,res) => {
  const categories = await Category.find()
  const infoErrorOBJ = req.flash("infoErrors");
  const infoSubmitOBJ = req.flash("infoSubmit")
  console.log(categories)
  res.render('submit-recipe',{title:'Cooking Blog - Enviar receita',categories,infoErrorOBJ,infoSubmitOBJ})
}
exports.saveRecipe = async (req,res) => {
 
  let uploadImage;
  let uploadPath;
  let newImageName;
  if(!req.files || Object.keys(req.files).length === 0){
    console.log("Nenhum arquivo para upload")
  }else {
    uploadImage = req.files.image
    newImageName = Date.now() + uploadImage.name;
    uploadPath = require("path").resolve("./") + '/public/uploads/' + newImageName
    uploadImage.mv(uploadPath,function(err){
      if(err) return res.status(500).send(err);
    })
  }
  try {
    const newRecipe = new Recipe({
      name:req.body.name,
      description:req.body.description,
      email:req.body.email,
      ingredients:req.body.ingredients,
      category:req.body.category, 
      image:newImageName
    })
    await newRecipe.save()
    req.flash("infoSubmit","Receita adicionada com sucesso!")
    res.redirect("/submit-recipe")
  } catch (error) {
    req.flash("infoErrors",error)
    res.redirect("/submit-recipe")
  }
}


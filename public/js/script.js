let addIngredient = document.querySelector('#addIngredientsBtn')

let ingredientList = document.querySelector('.ingredientsList')

let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0]

addIngredient.addEventListener("click",() => {
    let newIngredint = ingredientDiv.cloneNode(true)
    let input = newIngredint.getElementsByTagName('input')[0]
    input.value = ''
    
    ingredientList.appendChild(newIngredint)

})
let alert = document.querySelector('.alert')

if(alert){
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 10000);
}




const fod_container = document.querySelector('.fod-container');
const favfood_container = document.querySelector('.favfood-container')

const URL_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const URL_MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_MEAL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getMeal = async (id = undefined) => {
    let url = id ? URL_MEAL_BY_ID+id:URL_RANDOM_MEAL;
    const resp = await fetch(url);
    const randomMeal = await resp.json();
    return randomMeal.meals[0];
}

const addMealToFodContainer = async (random = false) => {
    let meal =await getMeal();
    var fod_item = `<div class="fod-item">
                            <p class="fod-title">${random ? "Recipe for day":""}</p>
                            <img src="${meal.strMealThumb}" alt="" class="fod-thumbl">
                            <div class="fod-description">
                                <div class="fod-description-name">${meal.strMeal}</div>
                                <i class="fod-description-like fas fa-heart"></i>
                            </div>
                        </div>`;
    fod_container.innerHTML = fod_item;
    var like = fod_container.querySelector('.fod-description-like');
    like.addEventListener('click', e => {
        if(Array.from(like.classList).includes('active')){

            like.classList.remove('active');
            removeMealFromLocalStorage(meal);
        }else{

            like.classList.add('active');
            addMealToLocalStorage(meal);
        }
        updateFavFoods(getMealIdsFromLocalStorage(), false);

    })
}

const updateFavFoods = async (ids, reload = true) => {
    favfood_container.innerHTML = '';
    if(ids){
        ids.forEach(async id => {
            let meal = await getMeal(id);
            updateFavFoodUi(meal);
        })
    }
}

const updateFavFoodUi = (food) => {
        var html = document.createElement('div');
        html.classList.add('favfood-item');
        html.innerHTML = `
                        <img src="${food.strMealThumb}" alt="" class="fav-thumbl">
                        <span class="fav-name">${food.strMeal}</span>
                        `;
        favfood_container.appendChild(html);
}

const addMealToLocalStorage = (meal) =>{
    let mealIds = getMealIdsFromLocalStorage();
    mealIds = mealIds ? mealIds: [];
    
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, meal.idMeal]));
    // console.log(getMealIdsFromLocalStorage());
}

const removeMealFromLocalStorage = (meal) =>{
    let mealIds = getMealIdsFromLocalStorage();

    mealIds = mealIds ? mealIds: [];
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== meal.idMeal)));
    // console.log(getMealIdsFromLocalStorage());
}

const getMealIdsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('mealIds'));
}


document.addEventListener('DOMContentLoaded', () => {
    addMealToFodContainer(true);
    updateFavFoods(getMealIdsFromLocalStorage(), true);
});
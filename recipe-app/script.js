
const fod_container = document.querySelector('.fod-container');
const favfood_container = document.querySelector('.favfood-container');
const foodsearch_box = document.querySelector('#foodsearch-box');
const search_icon = document.querySelector('.fas.fa-search');

const URL_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const URL_MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_MEAL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getMeal = async (id = undefined, name = undefined) => {
    let url;
    if(name){
        url = URL_MEAL_BY_NAME+name;
    }
    else{
        url = id ? URL_MEAL_BY_ID+id:URL_RANDOM_MEAL;
    }
    const resp = await fetch(url);
    let randomMeal = await resp.json();
    if(randomMeal.meals == null) return null;
    else if(randomMeal.meals.length == 1) return randomMeal.meals[0];
    else return randomMeal.meals;
}

const addMealToFodContainer = async (meal, random = false) => {
        var fod_item = document.createElement('div');
        fod_item.classList.add('fod-item');
        fod_item.innerHTML = `
                                <p class="fod-title">${random ? "Recipe for day":""}</p>
                                <img src="${meal.strMealThumb}" alt="" class="fod-thumbl">
                                <div class="fod-description">
                                    <div class="fod-description-name">${meal.strMeal}</div>
                                    <i class="fod-description-like fas fa-heart"></i>
                                </div>
                            `;
        fod_container.appendChild(fod_item);
        var like = fod_item.querySelector('.fod-description-like');
        like.addEventListener('click', e => {
            if(Array.from(like.classList).includes('active')){
                console.log('1');
                like.classList.remove('active');
                removeMealFromLocalStorage(meal);
            }else{
                console.log('2');
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
    var res = localStorage.getItem('mealIds');
    res = res ? res : "[]";
    return JSON.parse(res);
}


document.addEventListener('DOMContentLoaded', async () => {
    let meal =await getMeal();
    addMealToFodContainer(meal,true);
    updateFavFoods(getMealIdsFromLocalStorage(), true);

    search_icon.addEventListener('click', async e => {
        let foodname = foodsearch_box.value.trim();
        if(foodname !== ""){
            var meals = await getMeal(undefined,foodname);
            if(meals) {
                fod_container.innerHTML = '';
                if(typeof meals == "object") addMealToFodContainer(meals, false);
                if(meals.length > 1){
                    console.log(meals);
                    fod_container.innerHTML = '';
                    meals.forEach(meal => {
                        addMealToFodContainer(meal, false);
                    })
                }
            }
        }
    })
});
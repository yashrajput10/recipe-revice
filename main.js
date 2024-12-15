window.addEventListener("load", async()=>{

    let recipes = JSON.parse(localStorage.getItem('recipes'));

    if (recipes) {
        constructRecipes(recipes);
        
        
    } else {
        const url = 'https://the-vegan-recipes-db.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'd3569176edmsh960014f0fdf96f3p13a061jsnd6c82df00a6d',
                'x-rapidapi-host': 'the-vegan-recipes-db.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            //save thid data local store 
            localStorage.setItem('recipes', JSON.stringify(result));
            constructRecipes(recipes);
        } catch (error) {
            console.error(error);
        }
    }
});

function constructRecipes(recipes){
   const container = document.getElementById('main-container');

   recipes.forEach((recipe)=> {

    const card = document.createElement('div');
    card.classList.add('bg-white','shadow-ld','rounded-lg','overflow-hidden','recipe-card','px-4','py-2','border');

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title;
    image.classList.add('w-full','h-64','object-cover','recipe-image');

    const title = document.createElement('h3');
    title.textContent = recipe.title;
    title.classList.add('font-bold','text-xl','mb-2','recipe-title');

    const difficulty = document.createElement('p');
    difficulty.textContent = `Difficulty:${recipe.difficulty}`;
    difficulty.classList.add('font-semibold','text-lg','recipe-difficulty');

    const button = document.createElement('button');
    button.textContent = 'View Recipe';
    button.classList.add('bg-yellow-500','hover:bg-green-700','text-white','font-bold','py-2','px-4','rounded','recipe-button','mt-4');

    button.addEventListener('click',()=>{
        window.location.href =`recipe.html?id=${recipe.id}`
    })

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(difficulty);
    card.appendChild(button);

    container.appendChild(card);

   });

}
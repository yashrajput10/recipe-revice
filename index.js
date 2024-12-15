// Function to populate the recipe details on the page
function populateRecipeDetails(data) {
    const recipeContainer = document.getElementById("recipe-details");
  
    if (!recipeContainer) {
      console.error("No element with ID 'recipe-details' found.");
      return;
    }
  
    // Clear existing content
    recipeContainer.innerHTML = "";
  
    // Create elements to display recipe information with Tailwind CSS classes
    const title = document.createElement("h1");
    title.textContent = data.title || "Recipe Title";
    title.className = "text-3xl font-bold text-gray-800 mb-4";

    const image = document.createElement('img');
    image.src = data.image;
    image.alt = data.title;
    image.classList.add('w-full','h-full','object-cover','recipe-image');
  
    const description = document.createElement("p");
    description.textContent = data.description || "No description available.";
    description.className = "text-gray-600 mb-6";
  
    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "mb-6";
  
    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.textContent = "Ingredients:";
    ingredientsTitle.className = "text-xl font-semibold text-gray-700 mb-2";
  
    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "list-disc pl-5 text-gray-600";
    if (Array.isArray(data.ingredients)) {
      data.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
    } else {
      const noIngredients = document.createElement("p");
      noIngredients.textContent = "Ingredients not available.";
      noIngredients.className = "text-gray-500";
      ingredientsList.appendChild(noIngredients);
    }
  
    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsList);
  
    const instructions = document.createElement("p");
    instructions.textContent = data.instructions || "Instructions not available.";
    instructions.className = "text-gray-600";
  
    // Append elements to the container
    recipeContainer.appendChild(title);
    recipeContainer.appendChild(description);
    recipeContainer.appendChild(ingredientsSection);
    recipeContainer.appendChild(image);
  }
  
  // Event listener to fetch and display recipe details
  window.addEventListener("load", async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
  
    if (!id) {
      console.error("No recipe ID provided in the URL.");
      return;
    }
  
    const url = `https://the-vegan-recipes-db.p.rapidapi.com/${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d3569176edmsh960014f0fdf96f3p13a061jsnd6c82df00a6d",
        "x-rapidapi-host": "the-vegan-recipes-db.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      populateRecipeDetails(result);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  });
  
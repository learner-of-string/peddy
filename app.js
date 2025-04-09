const displayCategories = (categoryList) => {
  const categoryContainer = document.getElementById("category-list");

  categoryList.forEach((eachCategoryObj) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList =
      "btn p-10 btn-outline-primary font-inter text-2xl font-bold";
    categoryBtn.innerHTML = `<img src="${eachCategoryObj.category_icon}" class="mr-4" alt="${eachCategoryObj.category} icon"><p>${eachCategoryObj.category}</p>`;
    categoryContainer.appendChild(categoryBtn);
  });
};

const getCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

getCategories();

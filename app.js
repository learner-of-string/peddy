const loadCategoryPets = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      displayPets(data.data);
    })
    .catch((error) => console.log(error));
};

const displayCategories = (categoryList) => {
  const categoryContainer = document.getElementById("category-list");

  categoryList.forEach((eachCategoryObj) => {
    const categoryBtnContainer = document.createElement("div");
    categoryBtnContainer.innerHTML = `<button class="btn p-10 btn-outline-primary font-inter text-2xl font-bold" onclick="loadCategoryPets(
      '${eachCategoryObj.category}'
    )"> 
  <img
    src="${eachCategoryObj.category_icon}"
    class="mr-4"
    alt="${eachCategoryObj.category} icon"
    draggable="false"
  />
  <p>${eachCategoryObj.category}</p>
</button>
`;
    categoryContainer.appendChild(categoryBtnContainer);
  });
};

const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  pets.forEach((eachPetObj) => {
    let { image, pet_name, breed, date_of_birth, price } = eachPetObj;

    pet_name = pet_name ?? "IDK";
    breed = breed ?? "no sé";
    date_of_birth = date_of_birth ?? "Not Available";
    price = price ?? "0";

    const petCard = document.createElement("div");
    petCard.innerHTML = `
    <div class="card bg-base-100 w-xs shadow-sm pt-5">
                <figure>
                  <img src=${image} alt="pet" draggable="false" class="object-cover w-2xs h-[160px] rounded" />
                </figure>
                <div class="card-body">
                  <h2 class="font-inter text-xl font-bold">${pet_name}</h2>
                  <div class="flex gap-2">
                    <img
                      src="./assets/images/Frame.png"
                      class="object-cover w-5 h-5"
                      alt="" draggable="false"
                    />
                    <p class="text-secondary">Breed: ${breed}</p>
                  </div>
                  <div class="flex gap-2">
                    <img
                      src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000"
                      class="object-cover w-5 h-5"
                      alt="" draggable="false"
                    />
                    <p class="text-secondary">Birth: ${date_of_birth}</p>
                  </div>
                  <div class="flex gap-2">
                    <img
                      src="https://img.icons8.com/?size=100&id=89392&format=png&color=000000"
                      class="object-cover w-5 h-5"
                      alt="" draggable="false"
                    />
                    <p class="text-secondary">Price : ${price} $</p>
                  </div>
                  <div class="card-actions justify-end">
                    <button class="btn">
                      <img
                        src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"
                        alt="" draggable="false"
                        class="object-cover w-5 h-5"
                      />
                    </button>
                    <button class="btn btn-secondary">Adopt</button>
                    <button class="btn btn-secondary">Details</button>
                  </div>
                </div>
              </div>
    `;
    petsContainer.appendChild(petCard);
  });
};

(function getCategories() {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
})();

(function getAllPets() {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
})();

const loadCategoryPets = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      disableActiveBtn();
      document
        .getElementById(`btn-${category}`)
        .classList.add(
          "bg-[#0E7A811A]",
          "border-[#0E7A81",
          "border-1",
          "rounded-full"
        );

      displayPets(data.data);
      console.log(data);
    })
    .catch((error) => console.log(error));
};

const disableActiveBtn = () => {
  for (let btn of document.getElementsByClassName("category-btn")) {
    btn.classList.remove(
      "bg-[#0E7A811A]",
      "border-[#0E7A81",
      "border-1",
      "rounded-full"
    );
  }
};

const displayCategories = (categoryList) => {
  const categoryContainer = document.getElementById("category-list");

  categoryList.forEach((eachCategoryObj) => {
    const categoryBtnContainer = document.createElement("div");
    categoryBtnContainer.innerHTML = `<button class="btn lg:p-10 p-3 btn-outline-primary font-inter lg:text-2xl text-xs font-bold category-btn" id="btn-${eachCategoryObj.category}" onclick="loadCategoryPets(
      '${eachCategoryObj.category}'
    )"> 
  <img
    src="${eachCategoryObj.category_icon}"
    class="lg:mr-4 mr-2 size-4 lg:size-12"
    alt="${eachCategoryObj.category} icon"
    draggable="false"
  />
  <p>${eachCategoryObj.category}</p>
</button>
`;
    categoryContainer.appendChild(categoryBtnContainer);
  });
};

const getLikedPetImg = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayLikedPetImg(data.petData.image))
    .catch((error) => console.log(error));
};

const getPetDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayLikedPetImg = (petImgSrc) => {
  const likedPetImgContainer = document.getElementById("pet-you-like");

  const likedPetImgDiv = document.createElement("div");
  likedPetImgDiv.className = "size-24";
  likedPetImgDiv.innerHTML = `
  <img src="${petImgSrc}" alt="" class="rounded object-cover" draggable="false" />`;

  likedPetImgContainer.appendChild(likedPetImgDiv);
};

const displayPetDetails = (petDetailsObj) => {
  let {
    image,
    breed,
    date_of_birth,
    vaccinated_status,
    gender,
    price,
    pet_details,
  } = petDetailsObj;

  image =
    image ??
    `https://img.icons8.com/?size=100&id=1G2BW7-tQJJJ&format=png&color=000000`;
  breed = breed ?? "JE NE SAIS PAS";
  date_of_birth = date_of_birth ?? "IDK";
  vaccinated_status = vaccinated_status ?? "Not Available";
  gender = gender ?? "may be custom";
  price = price ?? "0";
  pet_details = pet_details ?? "No details available";

  const petDetailsContainer = document.getElementById("modal-content");
  petDetailsContainer.innerHTML = `
  
          <div class="flex justify-center mb-5">
            <img src="${image}" alt="" class="object-cover rounded" />
          </div>
          <h3 class="font-inter font-bold text-2xl">Pet Name</h3>
          <div class="flex gap-5">
            <div>
              <div class="flex gap-2">
                <img
                  src="./assets/images/Frame.png"
                  class="object-cover w-5 h-5"
                  alt=""
                  draggable="false"
                />
                <p class="text-secondary">Breed: ${breed}</p>
              </div>
              <div class="flex gap-2">
                <img
                  src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000"
                  class="object-cover w-5 h-5"
                  alt=""
                  draggable="false"
                />
                <p class="text-secondary">Gender: ${gender}</p>
              </div>
              <div class="flex gap-2">
                <img
                  src="https://img.icons8.com/?size=100&id=89392&format=png&color=000000"
                  class="object-cover w-5 h-5"
                  alt=""
                  draggable="false"
                />
                <p class="text-secondary">
                  Vaccinated status: ${vaccinated_status} 
                </p>
              </div>
            </div>
            <div>
              <div class="flex gap-2">
                <img
                  src="https://img.icons8.com/?size=100&id=84997&format=png&color=000000"
                  class="object-cover w-5 h-5"
                  alt=""
                  draggable="false"
                />
                <p class="text-secondary">Birth: ${date_of_birth}</p>
              </div>
              <div class="flex gap-2">
                <img
                  src="https://img.icons8.com/?size=100&id=89392&format=png&color=000000"
                  class="object-cover w-5 h-5"
                  alt=""
                  draggable="false"
                />
                <p class="text-secondary">Price : ${price} $</p>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div>
            <h2 class="font-semibold">Details Information</h2>
            <p>${pet_details}</p>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        `;

  document.getElementById("petDetailsModal").showModal();
};

const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  if (pets.length === 0) {
    petsContainer.innerHTML = `<div class="bg-[#13131308] py-[100px] px-[180px] flex flex-col items-center gap-7 w-3xl rounded-2xl">
  <img
    src="https://img.icons8.com/?size=100&id=rW2jdHbrzMDM&format=png&color=000000"
    alt="no data icon"
    class="size-16"
  />
  <p class="text-3xl font-bold font-inter">No Information Available</p>
  <p class="text-center">
    It is a long established fact that a reader will be distracted by the
    readable content of a page when looking at its layout. The point of using
    Lorem Ipsum is that it has a.
  </p>
</div>
`;
  } else {
    pets.forEach((eachPetObj) => {
      let { image, pet_name, breed, date_of_birth, price, petId } = eachPetObj;

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
                    <button class="btn" onclick="getLikedPetImg('${petId}')">
                      <img
                        src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"
                        alt="" draggable="false"
                        class="object-cover w-5 h-5"
                      />
                    </button>
                    <button class="btn btn-secondary">Adopt</button>
                    <button class="btn btn-secondary" onclick="getPetDetails('${petId}')">Details</button>
                  </div>
                </div>
              </div>
    `;
      petsContainer.appendChild(petCard);
    });
  }
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

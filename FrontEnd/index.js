/***  PARTIE FILTRES ***/
function recupByCategory(btnSelect, categoryId) {
   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         selectedBtnFilters(btnSelect);
         for (let i = 0; i < data.length; i++) {
            let element = data[i];
            const figure = document.querySelectorAll(".gallery figure");
            if (element.categoryId !== categoryId && categoryId !== -1) {
               figure[i].style.display = "none";
            } else {
               figure[i].style.display = "block";
            }
         }
      });
}

function selectedBtnFilters(btnSelected) {
   let current = document.getElementsByClassName("active-btn");
   current[0].classList.remove("active-btn");
   btnSelected.classList.add("active-btn");
}
/***  PARTIE FILTRES ***/

/*** PARTIE EDITION ***/
const token = window.localStorage.getItem("token");
if (token) {
   activeUser();
}

const secondModal = document.getElementById("second-modal");

function activeUser() {
   loginToLogout();
   blackBanner();
   firstModal();
   hiddenFilter();
   modifImageProfil();
   modifArticle();

   function blackBanner() {
      const bandeNoireContainer = document.createElement("div");
      const bandeNoireHeader = document.querySelector(".black-band");
      bandeNoireHeader.classList.add("black-band-design");
      bandeNoireHeader.innerHTML =
         "<span class='fa'>&#xf044</span>" +
         "&nbsp;" +
         "&nbsp;" +
         "<p>Mode édition</p>" +
         "&nbsp;" +
         "&nbsp;" +
         "<button>publier les changements</button>";
   }

   function loginToLogout() {
      const headerLi = document.querySelectorAll("header ul li a");
      for (element of headerLi) {
         if (element.innerHTML === "login") {
            element.innerHTML = "logout";
         }

         if (element.innerHTML === "logout") {
            element.addEventListener("click", function () {
               window.localStorage.removeItem("token");
            });
         }
      }
   }

   function hiddenFilter() {
      const blocBtn = document.getElementById("bloc-btn");
      blocBtn.style.display = "none";
      const h2Projects = document.querySelector("#portfolio h2");
      h2Projects.style.marginBottom = "50px";
   }

   function modifImageProfil() {
      const modifImageProfil = document.querySelector(".modif-image-profil");
      modifImageProfil.innerHTML = "<span class='fa'>&#xf044</span>" + "&nbsp;" + "&nbsp;" + "<p>modifier</p>";
   }

   function modifArticle() {
      const modifArticleSection = document.querySelector(".modif-para");
      modifArticleSection.innerHTML = "<span class='fa'>&#xf044</span>" + "&nbsp;" + "&nbsp;" + "<p>modifier</p>";
   }
}

/*** PARTIE EDITION ***/

/*** PARTIE MODALE FORMULAIRE ***/
const btnValider = document.getElementById("send-new-projet");
const arrowBack = document.getElementById("arrow-back");
const titleNewForm = document.getElementById("title");
const categorieForm = document.getElementById("category");
const imageSelected = document.getElementById("photo-projet");
const galleryProjects = document.getElementById("gallery");

validationForm();

function backToFirstModal() {
   const modaleContainer = document.querySelector(".modale-content");
   modaleContainer.style.display = "flex";
   secondModal.classList.add("modal-display-none");
}

function firstModal() {
   const modale = document.querySelector(".modale-modif");
   modale.innerHTML = "<span class='fa'>&#xf044</span>" + "&nbsp;" + "&nbsp;" + "<p>modifier</p>";
   const modaleContainer = document.querySelector(".modale-content");
   const galleryModal = document.querySelector(".gallery-modal");
   const btnAddImage = document.querySelector(".add-image-modal");
   btnAddImage.addEventListener("click", function () {
      modaleContainer.style.display = "none";
      secondModal.classList.remove("modal-display-none");
   });

   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         galleryModal.innerHTML = "";

         for (let i = 0; i < data.length; i++) {
            let element = data[i];
            let idProject = element.id;
            galleryModal.innerHTML +=
               "<figure><span class='fa icon-modal' onclick='deleteProject(" +
               idProject +
               ")' >&#xf2ed</span>" +
               '<img class="image-modal" src=' +
               element.imageUrl +
               " alt=" +
               element.title +
               '/> <p class="para-modal">éditer</p></figure>';
         }
      });
}
function validationForm() {
   const imageUploaded = document.getElementById("img-uploaded");

   imageSelected.addEventListener("change", getImage, false);

   function getImage() {
      const imageToProcess = this.files[0];

      let newImage = new Image(imageToProcess.width, imageToProcess.height);
      newImage.src = URL.createObjectURL(imageToProcess);
      newImage.setAttribute("id", "imgNewProject");
      imageUploaded.appendChild(newImage);
   }

   fetch("http://localhost:5678/api/categories")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         const selectCategory = document.getElementById("category");
         selectCategory.innerHTML = " <option value=" + -1 + "></option>";
         for (let i = 0; i < data.length; i++) {
            const element = data[i];
            selectCategory.options.add(new Option(element.name, element.id));
         }
      });
}

function styleChangeBtnValider() {
   if (isFormValid()) {
      btnValider.style.background = "#1d6154";
      btnValider.style.cursor = "pointer";
   } else {
      btnValider.style.background = "#a7a7a7";
      btnValider.style.removeProperty("cursor");
   }
}

function isFormValid() {
   let isValid = true;

   if (titleNewForm.value == "" || categorieForm.value == -1) {
      isValid = false;
   }

   return isValid;
}

function sendNewProject() {
   let formData = new FormData();
   formData.append("image", imageSelected.files[0]);
   formData.append("title", titleNewForm.value);
   formData.append("category", parseInt(categorieForm.value));
   backToFirstModal();

   fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,

      headers: {
         Authorization: "Bearer " + token,
      },
   })
      .then((response) => response.json())
      .then((data) => {
         document.getElementById("my-form").reset();
         document.getElementById("imgNewProject").remove();
         galleryProjects.innerHTML = "";
         galleryActualisee();
         galleryModalActualisee();
         console.log(data);
      });
}

function deleteProject(idProject) {
   fetch("http://localhost:5678/api/works/" + idProject, {
      method: "DELETE",
      headers: {
         Accept: "*/*",
         Authorization: "Bearer " + token,
      },
   }).then((response) => {
      if (response.status === 204) {
         console.log("supprimé");
      }
      galleryProjects.innerHTML = "";
      galleryActualisee();
      firstModal();
   });
}

function galleryModalActualisee() {
   const modale = document.querySelector(".modale-modif");
   modale.innerHTML = "<span class='fa'>&#xf044</span>" + "&nbsp;" + "&nbsp;" + "<p>modifier</p>";
   //const modaleContainer = document.querySelector(".modale-content");
   const galleryModal = document.querySelector(".gallery-modal");

   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         galleryModal.innerHTML = "";

         for (let i = 0; i < data.length; i++) {
            let element = data[i];
            let idProject = element.id;
            galleryModal.innerHTML +=
               "<figure><span class='fa icon-modal' onclick='deleteProject(" +
               idProject +
               ")' >&#xf2ed</span>" +
               '<img class="image-modal" src=' +
               element.imageUrl +
               " alt=" +
               element.title +
               '/> <p class="para-modal">éditer</p></figure>';
         }
      });
}

function galleryActualisee() {
   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         for (let i = 0; i < data.length; i++) {
            let element = data[i];
            galleryProjects.innerHTML +=
               "<figure><img src=" +
               element.imageUrl +
               " alt=" +
               element.title +
               "/>" +
               "<figcaption>" +
               element.title +
               "</figcaption></figure>";
         }
      });
}

/*** PARTIE MODALE FORMULAIRE ***/

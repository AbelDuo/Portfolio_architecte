export function getWorks() {    
    return fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .catch(erreur => console.error(erreur));
}

export function displayImage(images) {
    const imageContainer = document.querySelector('.gallery');
    imageContainer.innerHTML = "";
    
    images.forEach(element => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.setAttribute('src',element.imageUrl);
        img.setAttribute('alt',element.title);
        img.setAttribute('category', element.categoryId);
        figcaption.textContent = element.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        imageContainer.appendChild(figure);
        
    });
}
// Fonction ouverture Modal1
let modal = null;
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector('#modal1');
    const overlay = target.querySelector('.overlay'); 
    modal = target; 
    target.style.display = 'block';
    overlay.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    getWorks()
    .then(images => afficherImagesModal(images))
    .catch(error => console.error(error));
}
const closeModal = function (e){
    e.preventDefault();
    modal.style.display = 'none';
}
const editButton = document.querySelector('#button1');
editButton.addEventListener('click', openModal);

const closeButton1 = document.querySelector('.close-button');
closeButton1.addEventListener('click', function() {
    const modal1 = document.querySelector('#modal1');
    modal1.style.display = 'none';
    
});
const closeButton2 = document.querySelector('.close-modal2');
closeButton2.addEventListener('click', function() {
    const modal2 = document.querySelector('#modal2');
    modal2.style.display = 'none';
    
});
// Ouverture du formulaire d'ajout de projet et fermeture de la modale d'édition
const openModal2 = function(e) {
   if(e != null){
     e.preventDefault();
   };
   
    const target = document.querySelector('#modal2');
    const overlay = document.querySelector('.overlay');
    target.style.display = 'flex';
    const target2=document.querySelector('#modal1');
    target2.style.display = 'none';
    overlay.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        e.stopPropagation();
    });
const ajouterPhoto = document.querySelector('.AddProject')
ajouterPhoto.addEventListener('click',function(){
    // ...
    
    // Afficher le champ de type "file"
    const fileInput = document.getElementById('image');
    fileInput.style.display = 'flex';
    
    // ...
});

// Ajouter un bouton pour déclencher le champ de type "file"
const changerImageBtn = document.querySelector('.changer-image-btn');
changerImageBtn.addEventListener('click', function() {
    const imageInput = document.getElementById('image');
    imageInput.click(); // Déclenche le champ de type "file"
});
}
const ajouterPhoto = document.querySelector('.AddProject')
ajouterPhoto.addEventListener('click',function(){
    const titleInput = document.getElementById('title');
    const ajouterProject = document.querySelector('.Ajouter')
    const categorySelect = document.getElementById('category-select');
    const fileInput = document.querySelector('.input-file');
    ajouterProject.style.display = 'block';
    fileInput.style.display = 'flex';
    titleInput.value = ""; // Réinitialiser le titre
    categorySelect.value = 0; // Réinitialiser la catégorie
    const ajouterButton = document.querySelector('.Ajouter');
    ajouterButton.style.display = 'block';
    const validerButton = document.querySelector('.Valider');
    validerButton.style.display = 'none';

    const previewContainer = document.getElementById('image-preview-container');
    previewContainer.style.display = 'none'; // Masquer la prévisualisation d'image
    openModal2();
});

//bouton précédent
const backButton = document.querySelector('.back-button');

backButton.addEventListener('click', function() {
    const modal1 = document.querySelector('#modal1');
    const modal2 = document.querySelector('#modal2');
    
    modal2.style.display = 'none';
    modal1.style.display = 'block';
});


export function afficherImagesModal(images) {
    const imagesContainer = document.querySelector("#modal-content");
    imagesContainer.innerHTML = "";

    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("images-wrapper");

    images.forEach((item) => {
        const img = document.createElement("img");
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        img.src = item.imageUrl;
        img.alt = item.title;
        img.setAttribute("data-id", item.id);
        img.crossOrigin = "anonymous";
        figure.classList.add("figure-modal");
        figure.append(img);
        const editIcon = document.createElement("i");
        editIcon.classList.add(
            "fa-solid",
            "fa-arrows-up-down-left-right",
            "icon-drag"
        );
        figure.append(editIcon);
        figure.addEventListener("mouseover", function () {
        editIcon.style.display = "block";
    });

    figure.addEventListener("mouseout", function () {
        editIcon.style.display = "none";
    });
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("bx", "fa-solid", "fa-trash-can", "icon-trash");
        deleteIcon.addEventListener("click", () => {
            supprimerImage(item.id); // Appel de la fonction pour supprimer l'image
            figure.remove(); // Suppression de la figure du DOM
        });
        figcaption.addEventListener('click',() => {
            editerEvent(images,item.id);
        });

        
        figure.append(deleteIcon);
        figcaption.textContent = "éditer";
        figcaption.id = "figcaptionModal";
        figure.append(figcaption);
        imagesWrapper.append(figure);

    });


    imagesContainer.append(imagesWrapper);
}

//Suppression d'UN projet
function supprimerImage(imageId) {
    const token = sessionStorage.getItem("token");

    fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            console.log(`L'image avec l'ID ${imageId} a été supprimée.`);
        } else {
            console.error(`Erreur lors de la suppression de l'image avec l'ID ${imageId}.`);
        }
    })
    .catch(error => {
        console.error(`Erreur lors de la suppression de l'image avec l'ID ${imageId}: ${error}`);
    });
}


function editerEvent(images, imageId) {
    const imageDetails = images.find(image => image.id === imageId);
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category-select');

    const oldTitle = imageDetails.title;
    const oldCategoryId = imageDetails.categoryId;

    titleInput.value = imageDetails.title;
    categorySelect.value = imageDetails.categoryId;

    const ajouterButton = document.querySelector('.Ajouter');
    ajouterButton.style.display = 'none';
    const validerButton = document.querySelector('.Valider');
    validerButton.style.display = 'block';


    const previewImage = document.getElementById('preview-image');
    previewImage.src = imageDetails.imageUrl;

    const modal2 = document.querySelector('#modal2');

    validerButton.addEventListener('click', function() {
        const newTitle = titleInput.value;
        const newCategoryId = categorySelect.value;

        // Si les valeurs ont changé, mettez à jour les détails de l'image
        if (oldTitle !== newTitle || oldCategoryId !== newCategoryId) {
            imageDetails.title = newTitle;
            imageDetails.categoryId = newCategoryId;

            // Mettre à jour le contenu de la galerie d'images
            displayImage(images);

            // Fermez la modal de l'édition
            modal2.style.display = 'none';
        }
    });

    const previewContainer = document.getElementById('image-preview-container');
    const inputFile = document.querySelector('.input-file');

    previewContainer.style.display = 'block';
    inputFile.style.display = 'none';

    openModal2();
}

                                                            //SUPPRIMER TOUS LES TRAVAUX//
function supprimerToutlesTravaux() {
    // Récupère la liste de tous les éléments
    fetch('http://localhost:5678/api/works', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token") // Ajoute le token d'authentification
            }
        })
        .then(response => {
            // Vérifie si la réponse renvoie une erreur
            if (!response.ok) {
                throw new Error('Erreur ' + response.status + ': ' + response.statusText);
            }
            // Si la réponse est OK, récupère les données JSON
            return response.json();
        })
        .then(data => {
            // Pour chaque élément, effectue une requête DELETE
            data.forEach(item => {
                fetch('http://localhost:5678/api/works/' + item.id, {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token") // Ajoute le token d'authentification
                        }
                    })
                    .then(response => {
                        // Vérifie si la réponse renvoie une erreur
                        if (!response.ok) {
                            throw new Error('Erreur ' + response.status + ': ' + response.statusText);
                        }
                        console.log('La ressource ' + item.id + ' a été supprimée avec succès', +response.status);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            // Met à jour l'affichage des images après la suppression
            recupererTravail().then(données => {
                afficherImagesModal(données);
            });
        })
        .catch(error => {
            console.error(error);
        });
}


const deleteButton = document.querySelector('.deleteAllWorks')
deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    supprimerToutlesTravaux();
});




// envoi du projet via l'API fetch

function ajouterTravail() {
    const inputFile = document.querySelector('.input-file');
    const imageInput = document.getElementById('image');
    const imageUrl = imageInput.files[0];
    const title = document.getElementById('title').value;
    const categoryId = document.getElementById('category-select').value;
    const token = sessionStorage.getItem("token");
    

    const data = new FormData();
    data.append('title', title);
    data.append('image', imageUrl);
    data.append('category', categoryId);


    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data,
    }).then((res) => {
        if (res.ok) {
           
            console.log('success');
        } else {
         
            throw new Error('Error status code: ' + res.status);
        }
    }).catch((error) => {
        console.log(error.message);
    });    
}

// PREVISUALISATION DE L'IMAGE//
const imageInput = document.getElementById('image');
const previewContainer = document.getElementById('image-preview-container');
const previewImage = document.getElementById('preview-image');
const inputdiv = document.querySelector('.input-file');


imageInput.addEventListener('change', function() {
    const selectedFile = imageInput.files[0];

    if (selectedFile) {
      const reader = new FileReader();  //recuperation des données de l'image

      reader.onload = function(event) {
        previewImage.src = event.target.result;
        previewContainer.style.display = 'block';
        inputdiv.style.display = 'none';
        
      };

      reader.readAsDataURL(selectedFile);
    }
  });


//Differentes actions lorsque l'on clique sur le bouton ajouter
const boutonAjouter = document.querySelector('.Ajouter');
boutonAjouter.addEventListener('click', async (event) => {
    const fileInput = document.getElementById("image"); 
    const titreInput = document.getElementById("title");
    const categorieSelect = document.getElementById("category-select");
    console.log(fileInput.value);

    if (!fileInput.value) {
        event.preventDefault();
        alert("Veuillez sélectionner un fichier.");
      } else if (!titreInput.value) {
        event.preventDefault();
        alert("Veuillez entrer un titre pour votre fichier.");
      } else if (categorieSelect.value < 1) {
        event.preventDefault();
        alert("Veuillez sélectionner une catégorie pour votre fichier.");
      }else{
        ajouterTravail();
      }
});


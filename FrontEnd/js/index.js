"use strict" ;
import {
    getWorks,
    displayImage,
} from './app.js';
getWorks()
.then(images => displayImage(images))

document.addEventListener("DOMContentLoaded",function(){
    let token;
    if(sessionStorage.getItem(token) !== "undefined"){
        console.log('success');
        document.getElementById("login").innerHTML="logout";

        let LogoutButton = document.getElementById("login");
        LogoutButton.addEventListener("click",function(){
         clearSessionStorage();
        })
    }

});

CategoriesButton();
function clearSessionStorage(){
    sessionStorage.clear();
}

function getCategories(){
    return fetch('http://localhost:5678/api/categories')
        .then(response => response.json());
}

function sortCategories(categories){
    const sectionPortfolio = document.getElementById('portfolio');
    const divButton = document.createElement('div');
    divButton.className = 'categories';

    const AllButton = document.createElement('button');
    AllButton.textContent = 'Tous';
    divButton.appendChild(AllButton);

    categories.forEach(categorie => {
        const button = document.createElement('button');
        button.textContent = categorie.name;
        button.id = categorie.id;
        divButton.appendChild(button);
        sectionPortfolio.querySelector('h2').insertAdjacentElement('afterend',divButton);
        
        button.addEventListener('click', function() {
            const id = this.id;
            document.querySelectorAll('.gallery img').forEach(image => {
                if (image.getAttribute('category') === id) {
                    image.parentElement.style.display = 'block';
                } else {
                    image.parentElement.style.display = 'none';
                }
            });
        });
    });

    AllButton.addEventListener('click',function(){
        document.querySelectorAll('.gallery img').forEach(image => {
            image.parentElement.style.display = 'block';
        })
    })

}

function CategoriesButton(){
    getCategories().then(categories => {
        sortCategories(categories);
    });
}
export function getWorks(){
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

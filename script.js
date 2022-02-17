//Get the button
const mybutton = document.getElementById("upButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { 
    scrollFunction() 
};

function scrollFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// https://www.dnd5eapi.co/api/equipment-categories/

fetch("https://www.dnd5eapi.co/api/equipment-categories/")
.then(manageResonse)
.then(onDataReady)
.catch(onError);


function manageResonse(response) {
    console.log(response);
    return response.json();
}

function onDataReady(data) {
    const listOfEquipment = document.getElementById("list-container"); // Recupero il div che conterrà tutti gli i div degli elementi della lista

    for (const equipment of data.results) {
        let detailLink = "https://www.dnd5eapi.co" + equipment.url;

        const divListElementContainer = document.createElement('div'); // Creo il div che conterrà l'elemento della lista
        divListElementContainer.className += "list-item" + " ";
        divListElementContainer.onclick = () => fetchDetail(detailLink, equipment.name);

        const divLogoContainer = document.createElement('div'); // Creo il div che conterrà il logo degli equipaggiamenti
        divLogoContainer.className += "logo-div" + " ";

        const divInfoContainer = document.createElement('div'); // Creo il div che conterrà le informazioni di ogni elemento della lista
        divInfoContainer.className += "info-div" + " ";

        const logoImg = document.createElement('img'); // Creo l'immagine del logo dell'equipaggiamento
        logoImg.className += "logo-img" + " ";

        const elementName = document.createElement('h2'); // Creo il tag che conterrà il nome dell'elemento

        addTextToHtmlElement(elementName, equipment.name, false, "list-name-title list-name-title:hover");

        divInfoContainer.appendChild(elementName);

        logoImg.src = "./images/2360102-200.png";
        divLogoContainer.appendChild(logoImg);

        divListElementContainer.appendChild(divLogoContainer);
        divListElementContainer.appendChild(divInfoContainer);

        listOfEquipment.appendChild(divListElementContainer);
    }
}

function onDataReady2(data) {
    const listOfEquipment = document.getElementById("list-container"); // Recupero il div che conterrà tutti gli i div degli elementi della lista
    for (const equipment of data.equipment) {
        let detailLink = "https://www.dnd5eapi.co" + equipment.url;

        const divListElementContainer = document.createElement('div'); // Creo il div che conterrà l'elemento della lista
        divListElementContainer.className += "list-item" + " ";

        const divLogoContainer = document.createElement('div'); // Creo il div che conterrà il logo degli equipaggiamenti
        divLogoContainer.className += "logo-div" + " ";

        const divInfoContainer = document.createElement('div'); // Creo il div che conterrà le informazioni di ogni elemento della lista
        divInfoContainer.className += "info-div" + " ";

        const logoImg = document.createElement('img'); // Creo l'immagine del logo dell'equipaggiamento
        logoImg.className += "logo-img" + " ";

        const elementName = document.createElement('h2'); // Creo il tag che conterrà il nome dell'elemento

        addTextToHtmlElement(elementName, equipment.name, false, "list-name-title list-name-title:hover");

        fetch(detailLink)
        .then(manageResonse)
        .then((data) => checkDesc(data, divInfoContainer))
        .catch(onError);

        divInfoContainer.appendChild(elementName);

        logoImg.src = "./images/2360102-200.png";
        divLogoContainer.appendChild(logoImg);

        divListElementContainer.appendChild(divLogoContainer);
        divListElementContainer.appendChild(divInfoContainer);

        listOfEquipment.appendChild(divListElementContainer);
    }
}

function checkDesc(data, div) {
    if(Object.hasOwnProperty.call(data, "desc")) { 
        const textNodeDesc = document.createTextNode(data.desc);
        div.appendChild(textNodeDesc);
        div.style="overflow-y:scroll";
    }
}

function addTextToHtmlElement(htmlElement, text, isNewLine = false, className) {
    const span = document.createElement('span');
    span.className += className + " ";
    const textNode = document.createTextNode(text);
    span.appendChild(textNode);
    htmlElement.appendChild(span);
    if (isNewLine) {
        htmlElement.appendChild(document.createElement('br'));
    }
}

function onError(error) {
    console.log(error);
}

function fetchDetail(url, name){
    const pageTitle = document.getElementById("section-title");
    pageTitle.innerHTML = name;

    const listOfEquipment = document.getElementById("list-container");
    listOfEquipment.innerHTML = "";
    fetch(url)
        .then(manageResonse)
        .then(onDataReady2)
        .catch(onError);

    const backButton = document.getElementById("back-button");
    backButton.style.visibility = "visible";
    backButton.onclick = () => fetchBack();

    
    
}

function fetchBack() {
    const pageTitle = document.getElementById("section-title");
    pageTitle.innerHTML = "ALL EQUIPMENTS";

    const listOfEquipment = document.getElementById("list-container");
    listOfEquipment.innerHTML = "";
    const backButton = document.getElementById("back-button");
    backButton.style.visibility = "hidden";
    fetch("https://www.dnd5eapi.co/api/equipment-categories/")
        .then(manageResonse)
        .then(onDataReady)
        .catch(onError);
}
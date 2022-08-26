const container = document.getElementById('background-blur');
const boxImagem = document.getElementById('image');
const dogName = document.getElementById('dog-name');

const button = document.getElementById('gerate-image');
const previousImg = document.getElementById('previous-image');
const nextImg = document.getElementById('next-image');

let arrayPreviousImg = [];
let arrayNextImg = [];
let arrImg = [];
let curImg;

button.addEventListener('click', getImagem);
nextImg.addEventListener('click', getImagem);

async function getImagem() {
    
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let jsonDog = await response.json();
    let url = jsonDog.message
    
    backgroundBlur(url)
    showImagem(url)
    race(url)
    
    curImg = url;

    arrayPreviousImg.push(url);
    arrImg.push(url);

}

function backgroundBlur(bck) {
    container.style.backgroundImage = `url(${bck})`;
}

function showImagem(img) {
    boxImagem.style.backgroundImage = `url(${img})`;
    boxImagem.style.display = 'block';
}

function race(text) {
    let textoFormatado = text.substring(30, text.lastIndexOf('/'));
    dogName.innerText = `${textoFormatado}  `;
    dogName.href = `https://www.google.com/search?q=dog+${textoFormatado}`
    document.getElementsByClassName('name')[0].style.display = 'inline-block';
}
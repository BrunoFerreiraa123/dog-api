const container = document.getElementById('background-blur');
const boxImagem = document.getElementById('image');
const dogName = document.getElementById('dog-name');

const button = document.getElementById('gerate-image')
.addEventListener('click', getImagem);

async function getImagem() {
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let jsonDog = await response.json();
    let url = jsonDog.message
       
    backgroundBlur(url)
    showImagem(url)
    raca(url)
}

function backgroundBlur(bck) {
    container.style.backgroundImage = `url(${bck})`; 
}

function showImagem(img) {
    boxImagem.style.backgroundImage = `url(${img})`;
    boxImagem.style.display = 'block';
}

function raca(text) {
    let textoFormatado = text.substring(30, text.lastIndexOf('/'));
    dogName.innerText = `${textoFormatado}  `;
    dogName.href = `https://www.google.com/search?q=dog+${textoFormatado}`
    document.getElementsByClassName('name')[0].style.display = 'inline-block';

}
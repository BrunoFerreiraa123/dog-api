const container = document.getElementById('background-blur');
const boxImagem = document.getElementById('image');
const dogName = document.getElementById('dog-name');

const button = document.getElementById('gerate-image');
const previousImg = document.getElementById('previous-image');
const nextImg = document.getElementById('next-image');

let arrayPreviousImg = [];
let arrayNextImg = [];
let contador = 0;
let controller = true;

button.addEventListener('click', getImagem);
nextImg.addEventListener('click', nextFunction);

async function getImagem() {
    resetButtons();
    
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let jsonDog = await response.json();
    let url = jsonDog.message
    
    backgroundBlur(url)
    showImagem(url)
    race(url)
    
    arrayPreviousImg.push(url);
    arrayNextImg.push(url);
    contador = arrayPreviousImg.length;
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

function resetButtons() {
    button.style.display = "none";
    previousImg.style.display = "inline";
    nextImg.style.display = "inline";
}


previousImg.addEventListener('click', () => {
    if(contador > 0) {
        contador -= 1;
    
        if(checkFirstClick()) {
            contador -= 1;
            controller = false;
        }
     
        backgroundBlur(arrayPreviousImg[contador])
        showImagem(arrayPreviousImg[contador])
        race(arrayPreviousImg[contador])
    
    }
    else {
        console.log("acabou")
    }

})

function nextFunction() {
        getImagem()
}

function checkFirstClick() {
    return controller === true ? true : false;
}
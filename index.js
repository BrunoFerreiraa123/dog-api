const container = document.getElementById('background-blur');
const boxImagem = document.getElementById('image');
const dogName = document.getElementById('dog-name');

const button = document.getElementById('gerate-image');
const previousImg = document.getElementById('previous-image');
const nextImg = document.getElementById('next-image');

let arrayPreviousImg = [];
let arrayNextImg = [];
let counterPrevious = 0;
let counterNext = 1;
let firstPrevious;
let amountPrevious = 0;

button.addEventListener('click', getImagem);

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
    counterPrevious = arrayPreviousImg.length;
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
    if (counterPrevious > 0) {
        
        counterPrevious -= 1;
        amountPrevious += 1;

        console.log(firstPrevious)

        if (checkFirstClick()) {
            counterPrevious -= 1; // caso for o primeiro clique essa segunda remocao do contador serve para retirar a imagem atual e contar a próxima
            firstPrevious = false;
        }

        backgroundBlur(arrayPreviousImg[counterPrevious])
        showImagem(arrayPreviousImg[counterPrevious])
        race(arrayPreviousImg[counterPrevious])

    }
    else {
        console.log("acabou")
    }

})

nextImg.addEventListener('click', () => {

    if(amountPrevious === 0) {
        getImagem()
    }
    else {
        backgroundBlur(arrayNextImg[arrayNextImg.length - amountPrevious])
        showImagem(arrayNextImg[arrayNextImg.length - amountPrevious])
        race(arrayNextImg[arrayNextImg.length - amountPrevious])

        counterPrevious += 1;
        amountPrevious -= 1;
    }

});

function checkFirstClick() {
    return firstPrevious === true ? true : false;
}
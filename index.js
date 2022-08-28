const container = document.getElementById('background-blur');
const boxImagem = document.getElementById('image');
const dogName = document.getElementById('dog-name');

const button = document.getElementById('gerate-image');
const previousImg = document.getElementById('previous-image');
const nextImg = document.getElementById('next-image');

let arrayPreviousImg = [];
let arrayNextImg = [];
let arrImg = [];

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

function resetButtons() {
    button.style.display = "none";
    previousImg.style.display = "inline";
    nextImg.style.display = "inline";
}

let amountReturn = [];
previousImg.addEventListener('click', () => {
    /*
    A lógica dessa funcão é checar se os dois arrays onde são armazenados
    as imagens são iguais, se sim, significa que é o primeiro clique do usuario
    (primeira vez que ele quer rever uma imagem), nesse caso, a imagem que já está em 
    exibição deve receber um pop e em só em seguida guardar a proxima imagem em um novo pop,
    do contrário o usuário precisaria clicar 2x na seta para a imagem voltar.
    */
    let lastIndex;
    let firstPop;
    amountReturn.push(1);
    
    if (arrImg.length !== arrayPreviousImg.length && arrayPreviousImg.length > 0) {

        lastIndex = arrayPreviousImg.pop();
        backgroundBlur(lastIndex);
        showImagem(lastIndex);
        race(lastIndex)
        arrayNextImg.push(lastIndex)

    }
    
    if(arrImg.length === arrayPreviousImg.length &&arrayPreviousImg.length > 0) {

        firstPop = arrayPreviousImg.pop();
        lastIndex = arrayPreviousImg.pop();
        backgroundBlur(lastIndex);
        showImagem(lastIndex);
        race(lastIndex)
        arrayNextImg.push(firstPop)
        arrayNextImg.push(lastIndex)

    }    
})

function nextFunction() {
        let nextIndex;

        if(amountReturn.length > 0) {
            amountReturn.pop;
            nextIndex = arrayNextImg.shift();
            backgroundBlur(nextIndex);
            showImagem(nextIndex);
            race(nextIndex)
        }
        else {
            getImagem();
        }
}
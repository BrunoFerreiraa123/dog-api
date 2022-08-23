const container = document.getElementById('backgroundBlur');
const img = document.getElementById('imagem');
const boxImagem = document.getElementById('box-image')

const button = document.getElementById('gerateImage')
.addEventListener('click', getImagem);

async function getImagem() {
    
    let dados = await fetch('https://dog.ceo/api/breeds/image/random');
    
    let dadosImagem = await dados.json();

    raca(dadosImagem.message)
    backgroundBlur(dadosImagem.message)
    showImagem(dadosImagem.message)
    
}

function backgroundBlur(bck) {
    container.style.backgroundImage = `url(${bck})`; 
}

function showImagem(img) {
    boxImagem.style.backgroundImage = `url(${img})`;
}

function raca(text) {
    let textoFormatado = text.substring(30, text.lastIndexOf('/'))
}
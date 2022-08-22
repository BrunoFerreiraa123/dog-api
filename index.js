const img = document.getElementById('imagem');
const container = document.getElementById('backgroundBlur');
const boxImagem = document.getElementById('box-imagem')
const button = document.getElementById('botao')
.addEventListener('click', getImagem);

async function getImagem() {
    console.log('ok')
    
    let dados = await fetch('https://dog.ceo/api/breeds/image/random');
    
    let dadosImagem = await dados.json();
    
    backgroundBlur(dadosImagem)
    showImagem(dadosImagem)
    
}

function backgroundBlur(bck) {
    container.style.backgroundImage = `url(${bck.message})`; 
}

function showImagem(img) {
    boxImagem.style.backgroundImage = `url(${img.message})`;
}
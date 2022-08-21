const img = document.getElementById('imagem');
const button = document.getElementById('botao')
.addEventListener('click', getImagem);

async function getImagem() {
    console.log('ok')

    let dados = await fetch('https://dog.ceo/api/breeds/image/random');

    let dadosImagem = await dados.json();

    img.src = dadosImagem.message;
}


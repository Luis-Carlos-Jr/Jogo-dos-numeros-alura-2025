let lista = [];
let limite = 3;
let cont = 0;
let numeroSecreto = numeroAleatorio(limite);

exibirTitulos();

function exibirTitulos() {
    alterarTitulo('h1','Jogo do Número Secreto!');
    alterarTitulo('p',`Escolha um número entre 1 e ${limite}`);
}

function numeroAleatorio(limite) {
    let aleatorio = parseInt(Math.random()* limite + 1);
    
    if(lista.length == limite){
        lista = [];
    }

    if(lista.includes(aleatorio)){
        return numeroAleatorio(limite);
    }else{
        lista.push(aleatorio);
        console.log(lista);
        return aleatorio;
    }
} 

function alterarTitulo(tag, texto){
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;

     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute(){
    cont++;
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        alterarTitulo('h1','Acertou!!');
        alterarTitulo('p',`Você Descobriu o Número Secreto em ${cont} tentativas!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(numeroSecreto < chute){
            alterarTitulo('p','O número secreto é menor!');
            limparCampo();
        }else{
            alterarTitulo('p','O número secreto é maior!');
            limparCampo();
        }
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
    chute.focus();
}

function reiniciarJogo() {
    cont = 0;
    numeroSecreto = numeroAleatorio(limite);
    limparCampo();
    exibirTitulos();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
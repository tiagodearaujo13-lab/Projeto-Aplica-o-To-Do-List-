console.log("O Javacript!");

const InputTarefa = document.querySelector('#input-nova-tarefa');
const botaoAdicionar = document.querySelector('#botao-adicionar');
const listaDeTarefas = document.querySelector('#Lista-de-tarefa');


botaoAdicionar.addEventListener('click', adicionarTarefa);


function adicionarTarefa() {
    console.log("O botão 'Adicionar' foi clicado!");
    
    const textoDaTarefa = InputTarefa.value;

    console.log("O utilizador escreveu: " + textoDaTarefa);

    if (textoDaTarefa === '') {
        alert("Você não pode adicionar uma tarefa vazia!");
        return;
    }

    const novoItemLi = document.createElement('li');

    novoItemLi.textContent = textoDaTarefa;

    listaDeTarefas.appendChild(novoItemLi);

    InputTarefa.value = '';
}
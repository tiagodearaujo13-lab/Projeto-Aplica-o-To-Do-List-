// --- script.js (Versão Corrigida) ---
console.log("Frontend está pronto!");

// CORREÇÃO 1: 'http://' (sem o 's')
const apiUrl = 'http://localhost:3000/tarefas'; 

const inputTarefa = document.querySelector('#input-nova-tarefa');
const botaoAdicionar = document.querySelector('#botao-adicionar');
const listaDeTarefas = document.querySelector('#lista-de-tarefas');

document.addEventListener('DOMContentLoaded', () => {
    buscarTarefasDoBackend();
});

botaoAdicionar.addEventListener('click', adicionarNovaTarefa);

async function buscarTarefasDoBackend() {
    console.log("A ligar para o Backend para buscar a lista...");
    try {
        const response = await fetch(apiUrl);
        // CORREÇÃO 2: A variável deve ser 'tarefas' (plural) para receber a lista
        const tarefas = await response.json(); 

        console.log("Recebemos a lista:", tarefas);

        // CORREÇÃO 3: Temos de "chamar" a função para desenhar a lista!
        renderizarLista(tarefas); 

    } catch (error) {
        console.error("Erro ao buscar tarefas:", error); // Use console.error para erros
        alert("Falha ao ligar para o Backend. O servidor está ligado?");
    }
}

// CORREÇÃO 4: Corrigido o typo 'renderizaeLista' e o parâmetro
function renderizarLista(tarefas) { 
    listaDeTarefas.innerHTML = ''; // Limpa a lista

    // CORREÇÃO 5: O loop deve ser sobre 'tarefas' (a lista que recebemos)
    for (let i = 0; i < tarefas.length; i++) {
        // CORREÇÃO 6: Acessar o item 'i' da lista 'tarefas'
        const tarefa = tarefas[i]; 

        const novoItemLi = document.createElement('li');
        novoItemLi.textContent = tarefa.texto_da_tarefa;

        listaDeTarefas.appendChild(novoItemLi);
    }
}

async function adicionarNovaTarefa() {
    console.log("Botão 'Adicionar' clicado.");

    const textoDaTarefa = inputTarefa.value;
    if (textoDaTarefa === '') {
        alert("Você não pode adicionar uma tarefa vazia");
        return;
    }

    console.log("A ligar para o Backend para ADICIONAR: " + textoDaTarefa);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ texto_da_tarefa: textoDaTarefa }),
        });

        if (response.status === 201) {
            console.log("Backend diz: Tarefa adicionada!");
            inputTarefa.value = '';
            
            // Perfeito! Buscar a lista atualizada
            buscarTarefasDoBackend();
        } else { 
            alert("O Backend teve um problema ao guardar.");
        }
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
        alert("falha grave ao ligar para o Backend. O servidor está ligado?");
    }
}
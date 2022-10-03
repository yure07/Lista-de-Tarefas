const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const lista = document.querySelector('.tarefas');

// cria a lista de tarefas
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// cria botão de apagar
function criaBotao(li) {
    li.innerText += ' '
    const botao = document.createElement('button')
    botao.innerText = 'Apagar'
    li.appendChild(botao)
    botao.setAttribute('class', 'apagar')        // cria uma classe para o button
}

//cria botao de tarefa concluida
function criaConcluido (button) {
    const botao = document.createElement('button')
    botao.innerText = 'Concluída'
    button.appendChild(botao)
    botao.setAttribute('class', 'concluida')
}

// criar uma linha de divisão entre as tarefas
function criaDivisao (hr) {
    const divisao = document.createElement('hr')
    hr.appendChild(divisao)
}

// coloca os elementos lista (</li>) dentro da </ul>
function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto;
    lista.appendChild(li)
    criaBotao(li)
    criaConcluido(li)
    criaDivisao(li)
    salvarTarefas();
}

// adiciona texto na lista quando aperta ENTER e deixa o input vazio em seguida
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        criaTarefa(inputTarefa.value)
    }
    if (e.keyCode === 13) {
        inputTarefa.value = ''
    }
})

// adiciona texto na lista quando clica no botão de adicionar e deixa o input vazio em seguida
btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
    inputTarefa.value = ''
})

// faz a ação de apagar um elemento da lista quando clica no botão de apagar
document.addEventListener('click', function (e) {
    const el = e.target     // para saber qual elemento foi clicado, aparece no console

    if (el.classList.contains('apagar')) {      // se o botão clicado CONTÉM CLASSE apagar 
        el.parentElement.remove();  // remover o pai do li (</ul>) quando clicar no apagar
        salvarTarefas()             // para fazer com que apague da base de dados quando apagar na lista normalmente
    }
})

// muda o estilo da tarefa quando clica no concluído
document.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('concluida')) {
        el.parentElement.style = 'text-decoration: line-through; color: rgba(133, 121, 121, 0.473);'
    }
})

// colocar todos os elementos da li dentro de um array
function salvarTarefas() {
    const liTarefas = lista.querySelectorAll('li')    // obter a quantidade de li´s  
    const listaTarefa = [];

    for (let tarefa of liTarefas) {
        let listaDeTarefa = tarefa.innerText          // obter o texto das li´s
        listaDeTarefa = listaDeTarefa.replace('Apagar', '').trim()   // substituir o texto do botao por nada
        listaDeTarefa = listaDeTarefa.replace('Concluída', '').trim() 
        listaTarefa.push(listaDeTarefa)  // jogar a variavel dentro do array
    }
    const json = JSON.stringify(listaTarefa)    // salva o array como string, para salvar em algum lugar e depois usá-lo
    localStorage.setItem('tarefas', json);      // salva numa mini base de dados do proprio navegador
}                        // tarefas = nome utilizado para recuperar os dados da lista


function recuperaTarefas () {
    const obterTarefas = localStorage.getItem('tarefas')   // obter da base, a lista
    const transform = JSON.parse(obterTarefas)           // transformando string em array de novo

    for (let tarefa of transform) {
criaTarefa(tarefa)
    }
}

function recuperaFeitas () {
    const obterTarefas = localStorage.getItem('tarefasFeitasa')
    const transform = JSON.parse(obterTarefas)

    for (let tarefa of transform) {
        criaTarefa(tarefa)
    }
}

recuperaTarefas()
recuperaFeitas()
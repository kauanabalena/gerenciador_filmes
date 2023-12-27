let filmes = [];


window.addEventListener('load', function () {
    const filmesArmazenados = localStorage.getItem('filmes');
    if (filmesArmazenados) {
        filmes = JSON.parse(filmesArmazenados);
        atualizarTabela();
    }
});

document.getElementById('filmeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;
    const avaliacao = document.getElementById('avaliacao').value;

    const novoFilme = {
        titulo,
        genero,
        ano,
        avaliacao
    };

    const filmeExistenteIndex = filmes.findIndex(filme => filme.titulo === titulo);

    if (filmeExistenteIndex !== -1) {
        filmes[filmeExistenteIndex] = novoFilme;
        exibirMensagem('Filme atualizado com sucesso!', 'success');
    } else {
        filmes.push(novoFilme);
        exibirMensagem('Filme adicionado com sucesso!', 'success');
    }

    localStorage.setItem('filmes', JSON.stringify(filmes));

    limparFormulario();
    atualizarTabela();
});

function limparFormulario() {
    document.getElementById('filmeForm').reset();
}

function atualizarTabela(filmesExibir = filmes) {
    const tabelaBody = document.getElementById('tabelaFilmes').getElementsByTagName('tbody')[0];
    tabelaBody.innerHTML = '';

    for (const filme of filmesExibir) {
        const newRow = tabelaBody.insertRow();
        newRow.innerHTML = `
            <td>${filme.titulo}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.avaliacao}</td>
            <td>
                <button onclick="editarFilme('${filme.titulo}')">Editar</button>
                <button onclick="deletarFilme('${filme.titulo}')">Deletar</button>
            </td>
        `;
    }
}

function editarFilme(titulo) {
    const filmeParaEditar = filmes.find(filme => filme.titulo === titulo);

    if (filmeParaEditar) {
        document.getElementById('titulo').value = filmeParaEditar.titulo;
        document.getElementById('genero').value = filmeParaEditar.genero;
        document.getElementById('ano').value = filmeParaEditar.ano;
        document.getElementById('avaliacao').value = filmeParaEditar.avaliacao;
    }
}

function deletarFilme(titulo) {
    filmes = filmes.filter(filme => filme.titulo !== titulo);
    exibirMensagem(`Filme deletado: ${titulo}`, 'error');

    localStorage.setItem('filmes', JSON.stringify(filmes));
    atualizarTabela();
}

function pesquisarFilme() {
    const termoPesquisa = document.getElementById('campoPesquisa').value.toLowerCase();

    const filmesFiltrados = filmes.filter(filme =>
        filme.titulo.toLowerCase().includes(termoPesquisa) ||
        filme.genero.toLowerCase().includes(termoPesquisa)
    );

    atualizarTabela(filmesFiltrados);
}

function mostrarTodosOsFilmes() {
    atualizarTabela(filmes);
}

function exibirMensagem(mensagem, tipo) {
    const mensagensDiv = document.getElementById('mensagens');
    const mensagemElement = document.createElement('div');
    mensagemElement.classList.add(tipo);
    mensagemElement.textContent = mensagem;
    mensagensDiv.appendChild(mensagemElement);

    setTimeout(() => {
        mensagemElement.remove();
    }, 3000);
}
atualizarTabela();

import { removerFornecedor } from './remover.js';

//tabela de fornecedores
const tabelaFornecedores = document.getElementById('tabela-fornecedores');
const tr = document.createElement('tr');
let fornecedores = []
let paginaAtual = 1;
const porPagina = 10;

document.addEventListener('DOMContentLoaded', async () => {
    fetch('http://localhost:8080/fornecedores')
        .then(response => response.json())
        .then(data => {
            fornecedores = data;
            renderTabela();
            atualizarBotoes()
        })
});

 function renderTabela() {
    tabelaFornecedores.innerHTML = ''; // Limpa a tabela antes de renderizar
    const inicio = (paginaAtual - 1) * porPagina;
    const fim = inicio + porPagina;
    const pagina = fornecedores.slice(inicio, fim);

    pagina.forEach(fornecedor => {
        tr.innerHTML = `
            <td class="px-3 py-3 text-center">${fornecedor.id}</td>
            <td class="px-3 py-3 text-center">${fornecedor.nome}</td>
            <td class="px-3 py-3 text-center">${fornecedor.cnpj}</td>
            <td class="px-3 py-3 text-center">
                <button class="btn-primary" onclick="editarFornecedor(${fornecedor.id})">Editar</button>
                <button class="btn-secondary" onclick="removerFornecedor(${fornecedor.id})">Remover</button>
            </td>
        `;
        tabelaFornecedores.appendChild(tr.cloneNode(true));
    });
    document.getElementById('pagina-info').innerText = `Página ${paginaAtual}`;
}

export async function atualizarTabela() {
    const response = await fetch('http://localhost:8080/fornecedores');
    fornecedores = await response.json();
    renderTabela();
    atualizarBotoes();
}

function atualizarBotoes() {
    const totalPaginas = Math.ceil(fornecedores.length / porPagina);
    document.getElementById('btn-anterior').disabled = paginaAtual === 1;
    document.getElementById('btn-proximo').disabled = paginaAtual === totalPaginas;
}

document.getElementById('btn-proximo').addEventListener('click', () => {
    paginaAtual++;
    renderTabela();
    atualizarBotoes();
});

document.getElementById('btn-anterior').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderTabela();
        atualizarBotoes();
    }
});
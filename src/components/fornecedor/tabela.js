import { removerFornecedor } from './remover.js';

//tabela de fornecedores
const tabelaFornecedores = document.getElementById('tabela-fornecedores');
let fornecedores = []
let paginaAtual = 1;
const porPagina = 10;

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('pagina-info').innerText = `Página ${paginaAtual}`;
    atualizarBotoes();
    fetch('http://localhost:8080/fornecedores')
        .then(response => response.json())
        .then(data => {
            fornecedores = data;
            renderTabela();
        })
});

 function renderTabela() {
    tabelaFornecedores.innerHTML = ''; // Limpa a tabela antes de renderizar
    
    const inicio = (paginaAtual - 1) * porPagina;
    const fim = inicio + porPagina;
    const pagina = fornecedores.slice(inicio, fim);

    pagina.forEach(fornecedor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-3 py-3 text-center">${fornecedor.id}</td>
            <td class="px-3 py-3 text-center" id="nome">${fornecedor.nome}</td>
            <td class="px-3 py-3 text-center" id="cnpj">${fornecedor.cnpj}</td>
            <td class="px-3 py-3 text-center">
                <button class="btn-primary" id="btn-editar">Editar</button>
                <button class="btn-secondary" id="btn-remover">Remover</button>
            </td>
        `;

    const btnRemover = tr.querySelector('#btn-remover');
    const btnEditar = tr.querySelector('#btn-editar');
    btnEditar.addEventListener('click', function editarHandler() {
    const tdNome = tr.querySelector('#nome');
    const tdCnpj = tr.querySelector('#cnpj');
    const nomeAtual = tdNome.textContent;
    const cnpjAtual = tdCnpj.textContent;

    tdNome.innerHTML = `<input type="text" class="input-text" value="${nomeAtual}">`;
    tdCnpj.innerHTML = `<input type="text" class="input-text" value="${cnpjAtual}">`;

    btnEditar.textContent = 'Salvar';
    btnEditar.replaceWith(btnEditar.cloneNode(true));
    const btnSalvar = tr.querySelector('#btn-editar');

    btnSalvar.addEventListener('click', async function salvarHandler() {
        const novoNome = tdNome.querySelector('input').value;
        const novoCnpj = tdCnpj.querySelector('input').value;

        await fetch(`http://localhost:8080/fornecedores/${fornecedor.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, cnpj: novoCnpj })
        });

        await atualizarTabela();
    });

    btnRemover.textContent = 'Cancelar';
    btnRemover.replaceWith(btnRemover.cloneNode(true));
    const btnCancelar = tr.querySelector('#btn-remover');
    btnCancelar.addEventListener('click', () => {
        tdNome.textContent = nomeAtual;
        tdCnpj.textContent = cnpjAtual;
        atualizarTabela();
    });

});

        btnRemover.addEventListener('click', () => {
            removerFornecedor(fornecedor.id);
        });
        tabelaFornecedores.appendChild(tr);
        
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
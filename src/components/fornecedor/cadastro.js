const btnCadastrar = document.getElementById('btn-cadastrar');
const nomeFornecedor = document.getElementById('nome-fornecedor');
const cnpjFornecedor = document.getElementById('cnpj-fornecedor');

//cadastrar
btnCadastrar.addEventListener('click', async () => {
    fetch('http://localhost:8080/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeFornecedor.value,
            cnpj: cnpjFornecedor.value
        })
}).then(response => {
    if (!response.ok) throw new Error('Erro ao fazer a requisição!');
    return response.json();
}).then(data => {
    alert('Fornecedor cadastrado com sucesso!');
}).catch(error => {
    alert('Erro ao cadastrar fornecedor: ' + error.message);
    console.error('Erro:', error);
});
});
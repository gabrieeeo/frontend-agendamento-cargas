function removerFornecedor(id) {
    if (!confirm('Tem certeza que deseja remover este fornecedor?')) {
        fetch(`http://localhost:8080/fornecedores/${id}`, {
            method: 'DELETE'
        });
    }
}
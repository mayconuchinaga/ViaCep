document.getElementById('pesquisar').addEventListener('click', () => {
    const cep = document.getElementById('cep').value.trim();

    // Validação simples do CEP
    if (cep.length !== 8 || isNaN(cep)) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json`;

    fetch(url)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return resposta.json();
        })
        .then((dados) => {
            if (dados.erro) {
                alert('CEP não encontrado.');
                return;
            }

            // Preenchendo os campos
            document.getElementById('logradouro').value = dados.logradouro || '';
            document.getElementById('bairro').value = dados.bairro || '';
            document.getElementById('complemento').value = dados.complemento || '';
        
        })
        .catch((erro) => {
            console.error('Erro:', erro);
            alert('Erro ao buscar o CEP.');
        });
});

document.getElementById('enderecoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados do formulário
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Cria um objeto com os dados do endereço
    const enderecoData = {
        rua: rua,
        numero: numero,
        cidade: cidade,
        estado: estado
    };

    try {
        // Envia os dados para a API
        const response = await fetch('https://sua-api.com/cadastrar-endereco', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enderecoData)
        });

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o endereço');
        }

        const result = await response.json();
        alert('Endereço cadastrado com sucesso: ' + JSON.stringify(result));
        // Aqui você pode redirecionar ou limpar o formulário, se desejar

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar o endereço: ' + error.message);
    }
});

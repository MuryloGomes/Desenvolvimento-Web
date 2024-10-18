const url = "https://go-wash-api.onrender.com/api/auth/address"; // Defina a URL correta

async function cadastroEndereco() {
    // Exibir o loader
    document.getElementById('loader').style.display = 'block';

    let title = document.getElementById('title').value.trim();
    let cep = document.getElementById('cep').value.trim().replace(/\D/g, ''); // Remove caracteres não numéricos
    let address = document.getElementById('address').value.trim();
    let number = document.getElementById('number').value.trim();
    let complement = document.getElementById('complement').value.trim();

    // Validação dos campos
    if (!title) {
        alert("O campo Título não pode estar vazio.");
        document.getElementById('loader').style.display = 'none'; // Esconder o loader
        return;
    }

    if (cep.length !== 8) {
        alert("O CEP deve ter 8 dígitos.");
        document.getElementById('loader').style.display = 'none'; // Esconder o loader
        return;
    }

    if (!address) {
        alert("O campo Rua não pode estar vazio.");
        document.getElementById('loader').style.display = 'none'; // Esconder o loader
        return;
    }

    if (!number || isNaN(number)) {
        alert("O Número deve ser um valor numérico válido.");
        document.getElementById('loader').style.display = 'none'; // Esconder o loader
        return;
    }

    try {
        const API = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                cep: cep,
                address: address,
                number: number,
                complement: complement
            })
        });

        const resposta = await API.json();

        // Esconder o loader após a resposta
        document.getElementById('loader').style.display = 'none'; 

        if (API.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            if (resposta.message && resposta.message.includes("endereço já cadastrado")) {
                alert("Você já cadastrou esse endereço anteriormente.");
            } else {
                console.error(resposta);
                alert("Erro ao cadastrar o endereço. Verifique os dados e tente novamente.");
            }
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none'; // Esconder o loader em caso de erro
        console.error('Erro:', error); // Log do erro no console
        alert("Erro de conexão. Tente novamente mais tarde. Detalhes: " + error.message);
    }
}

// Preencher automaticamente o endereço ao digitar o CEP
document.getElementById('cep').addEventListener('input', async function () {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                document.getElementById('address').value = data.logradouro || '';
                // Você pode adicionar campos para cidade e estado se desejar
                // document.getElementById('cidade').value = data.localidade || '';
                // document.getElementById('estado').value = data.uf || '';
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    } else if (cep.length === 0) {
        // Limpa o campo de endereço se o CEP estiver vazio
        document.getElementById('address').value = '';
    }
});

document.getElementById('enderecoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    cadastroEndereco(); // Chama a função de cadastro
});

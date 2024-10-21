const url = "https://go-wash-api.onrender.com/api/auth/address"; 

async function cadastroEndereco() {
    // Exibir o loader
    document.getElementById('loader').style.display = 'block';

    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("Token não encontrado. Faça login.");
        document.getElementById('loader').style.display = 'none'; // Esconder o loader
        return;
    }

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
                "Authorization": `Bearer ${token}`
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
            console.error(resposta);
            if (resposta.message && resposta.message.includes("endereço já cadastrado")) {
                alert("Você já cadastrou esse endereço anteriormente.");
            } else {
                alert("Erro ao cadastrar o endereço. Verifique os dados e tente novamente.");
            }
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none'; // Esconder o loader em caso de erro
        console.error('Erro:', error);
        alert("Erro de conexão. Tente novamente mais tarde. Detalhes: " + error.message);
    }
}

// Preencher automaticamente o endereço ao digitar o CEP
document.getElementById('cep').addEventListener('input', async function () {
    let cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Adiciona o traço automaticamente
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }

    this.value = cep; // Atualiza o campo de entrada com o novo valor formatado

    // Busca o endereço se o CEP tiver 8 dígitos
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                document.getElementById('address').value = data.logradouro || '';
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
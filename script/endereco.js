const url = "https://go-wash-api.onrender.com/api/auth/address";

async function cadastroEndereco() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("Token não encontrado. Faça login.");
        return;
    }

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove não-números
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;

    // Verificações de campos
    if (!title) {
        alert("O campo Título não pode estar vazio.");
        return;
    }

    if (cep.length !== 8) {
        alert("O CEP deve ter 8 dígitos, sem hífen.");
        return;
    }

    if (!address) {
        alert("O campo Logradouro não pode estar vazio.");
        return;
    }

    if (!number || isNaN(number)) {
        alert("O Número deve ser um valor numérico válido.");
        return;
    }

    try {
        console.log("Dados a serem enviados:", {
            title: title,
            cep: cep,
            address: address,
            number: number,
            complement: complement
        });

        const response = await fetch(url, {
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

        const resposta = await response.json(); // Espera um JSON como resposta

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "home.html"; // Redireciona
        } else {
            alert("Erro ao cadastrar endereço: " + (resposta.message || "Erro desconhecido."));
        }
    } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
        alert("Ocorreu um erro ao tentar cadastrar o endereço.");
    }
}

// Adiciona o evento de submit ao formulário
document.getElementById('enderecoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    cadastroEndereco(); // Chama a função de cadastro
});
const url = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpfOriginal = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

    // Remover pontos e traços do CPF
    const cpf = cpfOriginal.replace(/\D/g, '');

    if (!termos) {
        alert('Você precisa aceitar os termos e condições para se cadastrar.');
        return;
    }

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": nome,
                "email": email,
                "user_type_id": 1,
                "password": senha,
                "cpf_cnpj": cpf,
                "terms": termos ? 1 : 0,
                "birthday": dataNascimento
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Cadastro bem-sucedido:', data);
            localStorage.setItem('usuario', JSON.stringify({
                nome: nome,
                email: email,
                cpf: cpf,
                dataNascimento: dataNascimento,
                senha: senha
            }));
            alert('Cadastro concluído com sucesso! Um e-mail de confirmação foi enviado.');
        } else {
            const textResponse = await response.text();
            console.error('Erro ao cadastrar:', textResponse);

            let erros = [];

            // Tenta analisar como JSON para mensagens específicas
            try {
                let errorData = JSON.parse(textResponse);
                if (errorData.data && errorData.data.errors) {
                    const errorMessages = errorData.data.errors;

                    if (errorMessages.email && errorMessages.cpf_cnpj) {
                        erros.push('CPF e e-mail já estão em uso.');
                    } else if (errorMessages.email) {
                        erros.push('O e-mail informado já está em uso.');
                    } else if (errorMessages.cpf_cnpj) {
                        erros.push('O CPF informado já está em uso.');
                    }
                }
            } catch (jsonError) {
                console.error('Erro ao analisar JSON:', jsonError);
                alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
            }

            // Exibir todos os erros se existirem
            if (erros.length > 0) {
                alert(`Erro: ${erros.join(' ')}`);
            } else {
                alert('Erro: Verifique os dados e tente novamente.');
            }
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    cadastroUsuario();
});



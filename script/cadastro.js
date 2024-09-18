const url = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const dataNascimento = document.getElementById('dataNascimento').value;
    const senha = document.getElementById('senha').value;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nome, // "nome" deve ser "name" se a API esperar "name"
                email: email,
                user_type_id: 1,
                password: senha, // "senha" deve ser "password" se a API esperar "password"
                cpf_cnpj: cpf, // Use "cpf_cnpj" se a API esperar isso
                terms: 1, // Enviando como 1, já que a API faz a checagem
                birthday: dataNascimento // Use "birthday" se a API esperar isso
            }),
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
            const errors = await response.json();
            const errorMessages = errors.data?.errors || {};
            let mensagem = '';

            if (errorMessages.email && errorMessages.cpf_cnpj) {
                mensagem = 'O CPF e o e-mail informados já estão em uso.';
            } else if (errorMessages.email) {
                mensagem = 'O e-mail informado já está em uso.';
            } else if (errorMessages.cpf_cnpj) {
                mensagem = 'O CPF informado já está em uso.';
            } else {
                mensagem = 'Verifique os dados e tente novamente.';
            }

            alert(`Erro: ${mensagem}`);
        }
    } catch {
        alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
    }
}

document.getElementById('cadastroForm').addEventListener('submit', e => {
    e.preventDefault();
    cadastroUsuario();
});
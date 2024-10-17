const url = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove formatação
    const dataNascimento = document.getElementById('dataNascimento').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nome,
                email: email,
                user_type_id: 1,
                password: senha,
                cpf_cnpj: cpf,
                terms: 1,
                birthday: dataNascimento
            })
        });

        if (response.ok) {
            alert('Cadastro concluído com sucesso! Um e-mail de confirmação foi enviado.');
            return;
        }

        const errorData = await response.json();
        const errors = errorData.data?.errors || {};
        let errorMessage = 'Verifique os dados e tente novamente.';

        if (errors.email) {
            errorMessage = 'O e-mail informado já está em uso.';
        }
        if (errors.cpf_cnpj) {
            errorMessage = (errorMessage === 'Verifique os dados e tente novamente.') 
                ? 'O CPF informado já está em uso.' 
                : 'O CPF e o e-mail informados já estão em uso.';
        }

        alert(`Erro: ${errorMessage}`);
    } catch {
        alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    cadastroUsuario();
});
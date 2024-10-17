const url = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
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
        } else {
            const { data: { errors } = {} } = await response.json();
            const mensagem = 
                errors?.email && errors?.cpf_cnpj ? 
                'O CPF e o e-mail informados já estão em uso.' : 
                errors?.email ? 
                'O e-mail informado já está em uso.' : 
                errors?.cpf_cnpj ? 
                'O CPF informado já está em uso.' : 
                'Verifique os dados e tente novamente.';
                
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

const url = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

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
                "password": senha,  // Inclua a senha aqui
                "cpf_cnpj": cpf,
                "terms": termos ? 1 : 0,  // Inclua o valor de aceitação dos termos (1 para aceito, 0 para não aceito)
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
                telefone: telefone,
                cpf: cpf,
                dataNascimento: dataNascimento
            }));
            alert('Cadastro concluído com sucesso! Um e-mail de confirmação foi enviado.');
        } else {
            let errorData = await response.json();
            console.error('Erro ao cadastrar:', errorData);
            alert(`Erro ao cadastrar: ${errorData.message || 'Verifique os dados e tente novamente.'}`);
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
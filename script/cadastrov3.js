const urlApi = "https://go-wash-api.onrender.com/api/user";

async function cadastroUsuario() {
    const nomeUsuario = document.getElementById('nome').value;
    const emailUsuario = document.getElementById('email').value; 
    const cpfUsuario = document.getElementById('cpf').value.replace(/\D/g, '');
    const dataNascimentoUsuario = document.getElementById('dataNascimento').value; 
    const senhaUsuario = document.getElementById('senha').value; 

    try {
        let resposta = await fetch(urlApi, { 
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  
                name: nomeUsuario,
                email: emailUsuario, 
                user_type_id: 1,
                password: senhaUsuario, 
                cpf_cnpj: cpfUsuario, 
                terms: 1, 
                birthday: dataNascimentoUsuario 
            }),
        });
        
        if (resposta.ok) { 
            let dados = await resposta.json(); 
            console.log('Cadastro bem-sucedido:', dados); 
            localStorage.setItem('usuario', JSON.stringify({ 
                nome: nomeUsuario, 
                email: emailUsuario, 
                cpf: cpfUsuario, 
                dataNascimento: dataNascimentoUsuario,
                senha: senhaUsuario 
            }));
            alert('Cadastro concluído com sucesso! Um e-mail de confirmação foi enviado.'); 
        } else {
            const erros = await resposta.json(); 
            const mensagensDeErro = erros.data?.errors || {}; 
            let mensagem = ''; 

            if (mensagensDeErro.email && mensagensDeErro.cpf_cnpj) { 
                mensagem = 'O CPF e o e-mail informados já estão em uso.'; 
            } else if (mensagensDeErro.email) { 
                mensagem = 'O e-mail informado já está em uso.'; 
            } else if (mensagensDeErro.cpf_cnpj) { 
                mensagem = 'O CPF informado já está em uso.';
            }

            alert(`Erro: ${mensagem}`); 
        }
    } catch { 
        alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
    }
}

function cadastroEndereco() {
    const endereco = {
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
    };

    // Pega todos os endereços do localStorage ou inicia um array vazio
    const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];

    // Verifica se o endereço já está cadastrado
    const enderecoExistente = enderecos.find(e => e.rua === endereco.rua && e.numero === endereco.numero);

    if (!enderecoExistente) {
        // Se o endereço não existir, adiciona ao array
        enderecos.push(endereco);
        localStorage.setItem('enderecos', JSON.stringify(enderecos));
        alert('Novo cadastro de endereço realizado com sucesso!');
    } else {
        alert('Esse endereço já está cadastrado.');
    }
}

document.getElementById('cadastroForm').addEventListener('submit', e => {
    e.preventDefault(); 
    cadastroUsuario(); 
});

// Adicione um evento para o formulário de cadastro de endereço
document.getElementById('cadastroEnderecoForm').addEventListener('submit', e => {
    e.preventDefault();
    cadastroEndereco();
});

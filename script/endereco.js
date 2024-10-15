document.getElementById('cep').addEventListener('input', function() {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length === 0) {
        limparCampos();
        limparErros();
        return;
    }

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => resposta.json())
            .then(dados => {
                if (!dados.erro) {
                    document.getElementById('logradouro').value = dados.logradouro || '';
                    document.getElementById('cidade').value = dados.localidade || '';
                    document.getElementById('estado').value = dados.uf || '';
                    limparErros();
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(erro => console.error('Erro ao buscar endereço:', erro));
    }
});

document.getElementById('formCadastro').addEventListener('submit', function(evento) {
    evento.preventDefault();
    limparErros();

    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("Token não encontrado. Faça login.");
        return;
    }

    let titulo = document.getElementById('titulo').value;
    let cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    let logradouro = document.getElementById('logradouro').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    let valido = true;

    if (!titulo) {
        mostrarErro('erroTitulo', "O campo Título é obrigatório.");
        valido = false;
    }

    if (cep.length !== 8) {
        mostrarErro('erroCep', "O CEP deve ter 8 dígitos.");
        valido = false;
    }

    if (!logradouro) {
        mostrarErro('erroLogradouro', "O campo Logradouro é obrigatório.");
        valido = false;
    }

    if (!numero || isNaN(numero)) {
        mostrarErro('erroNumero', "O Número é obrigatório e deve ser um valor numérico válido.");
        valido = false;
    }

    if (!valido) return;

    // Checa se o endereço já foi cadastrado pelo usuário atual
    const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
    const usuarioId = token; // Ou um identificador de usuário, se você tiver

    const enderecoExistente = enderecos.find(e => 
        e.usuarioId === usuarioId && // Verifica se o endereço é do mesmo usuário
        e.titulo === titulo && 
        e.cep === cep && 
        e.logradouro === logradouro &&
        e.numero === numero
    );

    if (enderecoExistente) {
        alert('Esse endereço já está cadastrado por você.');
        return;
    }

    // Se não existir, enviar para a API
    fetch('https://go-wash-api.onrender.com/api/auth/address', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title: titulo,
            cep: cep,
            address: logradouro,
            number: numero,
            complement: complemento
        })
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar endereço');
        }
        return resposta.json();
    })
    .then(resposta => {
        // Armazena o novo endereço no localStorage com o ID do usuário
        enderecos.push({
            usuarioId: usuarioId, // Armazena o ID do usuário
            titulo: titulo,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento
        });
        localStorage.setItem('enderecos', JSON.stringify(enderecos));
        alert('Cadastro novo realizado com sucesso!'); // Alerta de sucesso
        document.getElementById('mensagemSucesso').textContent = "Novo endereço cadastrado com sucesso!";
        limparErros();
        document.getElementById('formCadastro').reset();
    })
    .catch(erro => {
        document.getElementById('mensagemErro').textContent = "Erro ao cadastrar endereço: " + erro.message;
    });
});

function mostrarErro(elementoId, mensagem) {
    document.getElementById(elementoId).textContent = mensagem;
}

function limparErros() {
    const elementosErro = document.querySelectorAll('.erro');
    elementosErro.forEach(el => el.textContent = '');
    document.getElementById('mensagemSucesso').textContent = '';
    document.getElementById('mensagemErro').textContent = '';
    const camposEntrada = document.querySelectorAll('input');
    camposEntrada.forEach(input => {
        input.classList.remove('input-erro', 'input-valido');
    });
}

function limparCampos() {
    document.getElementById('logradouro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
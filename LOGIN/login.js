document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login realizado com sucesso!');
    
});

// Login do Usuário
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verifica se o email corresponde ao cadastrado
    if (usuario && usuario.email === loginEmail) {
        document.getElementById('mensagem').innerText = 'Seja bem-vindo,' + usuario.nome + 'ao Team Impacta!';
    } else {
        alert('Email não encontrado. Faça o cadastro primeiro.');
    }
});
function updateButtonVisibility() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {
        document.getElementById('linkCadastrarEndereco').style.display = 'block';
        document.getElementById('linkLogout').style.display = 'block'; // Garantir que o link de logout apareça
        document.getElementById('linkLogin').style.display = 'none';
    } else {
        document.getElementById('linkCadastrarEndereco').style.display = 'none';
        document.getElementById('linkLogout').style.display = 'none';
        document.getElementById('linkLogin').style.display = 'block';
    }
}

// Verifica se o usuário está logado ao carregar a página
updateButtonVisibility();

function logout() {
    localStorage.removeItem('loggedIn'); // Remove o item de login
    localStorage.removeItem('accessToken'); // Remove o token de acesso
    localStorage.removeItem('user'); // Remove informações do usuário
    alert("Deslogado com sucesso!");
    updateButtonVisibility(); // Atualiza a visibilidade após logout
    window.location.href = "../view/index.html"; // Redireciona para a página de login
}

// Eventos de logout
document.getElementById('linkLogout').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    logout(); // Chama a função de logout
});
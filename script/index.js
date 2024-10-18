// Verifica se o usuário está logado
const loggedIn = localStorage.getItem('loggedIn');

if (loggedIn) {
    // Se o usuário estiver logado, exibe o link para cadastrar endereço e o botão de logout
    document.getElementById('linkCadastrarEndereco').style.display = 'block';
    document.getElementById('linkLogout').style.display = 'block'; // Exibir link de logout
    document.getElementById('btnLogout').style.display = 'block'; // Exibir botão de logout
} else {
    // Se o usuário não estiver logado, exibe o link de login
    document.getElementById('linkLogin').style.display = 'block';
}

// Função para deslogar usando o link de logout
document.getElementById('linkLogout').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    localStorage.removeItem('loggedIn'); // Remove o item de login
    alert("Deslogado com sucesso!");
    window.location.href = "../view/index.html"; // Redireciona para a página de login
});//
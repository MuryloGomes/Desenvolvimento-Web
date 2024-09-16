const url = "https://go-wash-api.onrender.com/api/login"; // Substitua pelo URL correto da API de login

async function loginUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": senha
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Login bem-sucedido:', data);
            localStorage.setItem('usuario', JSON.stringify(data)); // Armazena os dados do usuário no localStorage
            alert('Login realizado com sucesso!');
            // Redireciona para uma página protegida ou o dashboard
            window.location.href = 'dashboard.html'; // Substitua pelo URL da página protegida
        } else {
            let errorData = await response.json();
            console.error('Erro ao fazer login:', errorData);
            alert(`Erro ao fazer login: ${errorData.message || 'Verifique os dados e tente novamente.'}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
    }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    loginUsuario();
});
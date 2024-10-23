const url = 'https://go-wash-api.onrender.com/api/login';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodtZWZjOWM5NTgyNjg3Lmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzEyMDc4Mjg0LCJuYmYiOjE3MTIwNzgyODQsImp0aSI6ImRPajVkTng4WEgxdVJ5TVkiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3M";

async function loginUser(event) {
    event.preventDefault(); 
    document.getElementById('loader').style.display = 'block';

    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": emailUsuario,
                "password": senhaUsuario,
                "user_type_id": 1 
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        let resposta = await api.json();
        document.getElementById('loader').style.display = 'none';

        if (api.ok) {
            alert("Sucesso");
            if (resposta.access_token) {
                localStorage.setItem("accessToken", resposta.access_token);
                localStorage.setItem('loggedIn', true);
            }

            if (resposta.user) {
                localStorage.setItem("user", JSON.stringify(resposta.user));
            }
            window.location.href = "index.html";
        } else {
            // Verifica se o email e senha estão corretos antes de verificar o erro da API
            if (usuario && usuario.email === emailUsuario && usuario.senha === senhaUsuario) {
                if (api.status === 401) {
                    alert("Por favor, confirme seu email.");
                    return;
                }
            }

            // Verifica se o usuário existe
            if (!usuario) {
                alert("Email não está cadastrado.");
                return;
            }

            // Verifica se o email está correto
            if (usuario.email !== emailUsuario) {
                alert("Email não está cadastrado.");
                return;
            }

            // Verifica se a senha está correta
            if (usuario.senha !== senhaUsuario) {
                alert("Senha incorreta.");
                return;
            }

            alert(resposta.data?.errors ? resposta.data.errors.join(", ") : "Erro desconhecido");
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none';
        alert("Erro ao tentar logar. Tente novamente mais tarde.");
        console.error('Erro:', error);
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);

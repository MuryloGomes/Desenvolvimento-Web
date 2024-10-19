const url = 'https://go-wash-api.onrender.com/api/login';

async function loginUser(event) {
    event.preventDefault(); 
    document.getElementById('loader').style.display = 'block';

    let email = document.getElementById('email').value;
    let password = document.getElementById('senha').value; 

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1 
            }),
            headers: {
                'Content-Type': 'application/json'
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
            alert(resposta.data?.errors ? resposta.data.errors.join(", ") : "Erro desconhecido");
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none';
        alert("Erro ao tentar logar. Tente novamente mais tarde.");
        console.error('Erro:', error);
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);
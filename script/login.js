const url = 'https://go-wash-api.onrender.com/api/login';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodtZWZjOWM5NTgyNjg3Lmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzEyMDc4Mjg0LCJuYmYiOjE3MTIwNzgyODQsImp0aSI6ImRPajVkTng4WEgxdVJ5TVkiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3M";

async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; // ID atualizado

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                password: password,
                user_type_id: 1
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login bem-sucedido!");
            if (data.access_token) {
                localStorage.setItem("accessToken", data.access_token);
            }
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            window.location.href = "home.html";
        } else {
            const errorMsg = data.data.errors || "Erro desconhecido. Tente novamente.";
            alert(errorMsg);
        }
    } catch (error) {
        alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
}

// Adiciona o evento de submissão ao formulário de login
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault(); // Previne o envio padrão do formulário
    loginUser(); // Chama a função de login
});
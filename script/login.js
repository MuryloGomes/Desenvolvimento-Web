const url = 'https://go-wash-api.onrender.com/api/login';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodtZWZjOWM5NTgyNjg3Lmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzEyMDc4Mjg0LCJuYmYiOjE3MTIwNzgyODQsImp0aSI6ImRPajVkTng4WEgxdVJ5TVkiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3M";

async function loginUser(){
    event.preventDefault();
    document.getElementById('loader').style.display = 'block';
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

        let api = await fetch(url, {
            method:"POST",
            body:JSON.stringify({
            "email":email,
            "password": password,
            "user_type_id":1
        }),
        headers: {
            'Content-Type': 'application/json',
             "Authorization": `Bearer ${token}`
        }
    });

    let resposta = await api.json();
    // Esconde o carregador após a resposta
    document.getElementById('loader').style.display = 'none';

    if (api.ok){
        alert("Sucesso")
        if (resposta.access_token) {
            localStorage.setItem("accessToken", resposta.access_token);
            localStorage.setItem('loggedIn', true); // Adicione esta linha
        }

        if (resposta.user) {
            localStorage.setItem("user", JSON.stringify(resposta.user));
        }
        window.location.href = "index.html";
    }
    else{
        alert(resposta.data.errors);
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);







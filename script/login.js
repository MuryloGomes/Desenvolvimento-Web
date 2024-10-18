const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: emailUsuario,
            user_type_id: 1,
            password: senhaUsuario,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        localStorage.setItem("user", JSON.stringify(resposta))
        console.log(resposta);
        return;
    }

    alert("Erro");
}

login();
//
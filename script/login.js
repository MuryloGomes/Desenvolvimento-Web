const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": "jiajing6623@uorak.com",
            "user_type_id": 1,
            "password": "123456781"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta);
        return;
    }

    alert("Erro");
}

login();

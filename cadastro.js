
const url = "https://go-wash-api.onrender.com/api/user"; 
async function cadastroUsuario(){
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            "name":name,
            "email":email,
            "user_type_id":1,
            "password": "123456",
            "cpf_cnpj": "00188338020",
            "terms": 1,
            "birthday":"2000-10-12"    
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(api.ok){
        let resposta = await api.json();
        console.log(resposta)
        return
    }
    let respostaErro = await api.json();
        console.log(respostaErro.data.errors.cpf_cnpj)
}

// Cadastro de Usuário
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    
    // Armazenamento de dados
    const usuario = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        dataNascimento: dataNascimento
    };
    
    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Cadastro concluído com sucesso!');
});

const urlApi = "https://go-wash-api.onrender.com/api/user";

// o async permite que essa função tenha o uso de await
async function cadastroUsuario() {
    // usamos variáveis para armazenar os valores dos campos do formulário
    const nomeUsuario = document.getElementById('nome').value;
    const emailUsuario = document.getElementById('email').value; 
    const cpfUsuario = document.getElementById('cpf').value.replace(/\D/g, '');
    const dataNascimentoUsuario = document.getElementById('dataNascimento').value; 
    const senhaUsuario = document.getElementById('senha').value; 

    // o bloco try é usado para tentar executar o código dentro dele
    // Se ocorrer um erro, o código pula para o bloco catch
    try {
        // criamos a variavel resposta para armazenar a resposta da nossa requisição
        let resposta = await fetch(urlApi, { 
            //await indica que a execução do código deve pausar até que a requisição seja concluída e a resposta seja recebida
            method: "POST", // indica que estamos enviando dados
            headers: { 'Content-Type': 'application/json' }, //informa que estamos enviando dados no formato json
            body: JSON.stringify({  //body contem os dados que estamos enviando
                //atribui os nossos input do formulario para a chave de cada propriedade da api
                name: nomeUsuario,
                email: emailUsuario, 
                user_type_id: 1,
                password: senhaUsuario, 
                cpf_cnpj: cpfUsuario, 
                terms: 1, 
                birthday: dataNascimentoUsuario 
            }),
        });
        
        // verifica se a resposta da API foi bem sucedida
        if (resposta.ok) { 
            // cria a variavel dados, await faz esperar a resposta e converte a resposta para json
            let dados = await resposta.json(); 
            console.log('Cadastro bem-sucedido:', dados); // mostra no console que o cadastro foi bem sucedido e os dados recebidos
            // armazena os dados do usuário no nosso dominio de socio torcedor
            localStorage.setItem('usuario', JSON.stringify({ // localstorage.setItem é um método que armazena dados, aqui vamos armazenar os dados do usuario(identificador) em forma de json string
                //armazena o input que pegamos do formulario e adicionamos em uma variavel no localstorage
                nome: nomeUsuario, 
                email: emailUsuario, 
                cpf: cpfUsuario, 
                dataNascimento: dataNascimentoUsuario,
                senha: senhaUsuario 
            }));
            // Mostra um alerta informando que o cadastro foi concluído com sucesso.
            alert('Cadastro concluído com sucesso! Um e-mail de confirmação foi enviado.'); 
        } else {
            // se o cadastro não foi bem sucedida, ele tenta especificar o erro
            const erros = await resposta.json(); // aqui criamos uma variavel erro que espera pela resposta da api e converte em json, no intuito de saber onde está o erro
            const mensagensDeErro = erros.data?.errors || {}; // mensagensDeErro acessa/pega a propriedade data se existir '?' a propriedade errors, se não existir, o || 'ou' atribui um objeto vazio
            let mensagem = ''; // criamos uma variavel mensagem vazia para atribuir uma mensagem de erro especifica dentro da noss condição de verificar onde esta o erro

            // verifica onde está o erro e da uma resposta especifica para o erro
            if (mensagensDeErro.email && mensagensDeErro.cpf_cnpj) { 
                mensagem = 'O CPF e o e-mail informados já estão em uso.'; 
            } else if (mensagensDeErro.email) { 
                mensagem = 'O e-mail informado já está em uso.'; 
            } else if (mensagensDeErro.cpf_cnpj) { 
                mensagem = 'O CPF informado já está em uso.';
            }

            alert(`Erro: ${mensagem}`); // o alert mostra o erro detalhadamente encontrado
        }
    } catch { // o bloco catch captura qualquer erro que ocorrer no bloco try
        // se tiver um erro no try, mostra um alert com mensagem de erro geral
        alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
    }
}

// adiciona um evento que aplica duas funções quando o formulário é enviado
document.getElementById('cadastroForm').addEventListener('submit', e => {
    e.preventDefault(); // impede que o formulário seja enviado recarregando a página
    cadastroUsuario(); // chama a função para cadastrar o usuário
});
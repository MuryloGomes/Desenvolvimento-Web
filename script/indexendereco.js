// Seleção de elementos do DOM
const tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];
const token = localStorage.getItem("accessToken");
let enderecos = []; // Array para armazenar os endereços

// Função para mostrar o loader
function mostrarLoader() {
    document.getElementById('loader').style.display = 'block';
}

// Função para esconder o loader
function esconderLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Função para listar endereços
async function listarEndereco() {
    document.getElementById('loader').style.display = 'block';
    
    try {
        const api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const resposta = await api.json();
        enderecos = resposta.data; // Armazena os endereços retornados

        // Limpa a tabela antes de preenchê-la
        tabela.innerHTML = '';

        // Preenche a tabela com os endereços
        resposta.data.forEach((endereco, index) => {
            let linha = document.createElement("tr");

            linha.appendChild(criarColuna(endereco.id));
            linha.appendChild(criarColuna(endereco.title || 'Sem título'));
            linha.appendChild(criarColuna(endereco.cep));
            linha.appendChild(criarColuna(endereco.address || "Sem Endereço"));
            linha.appendChild(criarColuna(endereco.complement || "Sem Complemento"));
            linha.appendChild(criarColunaAcoes(index));

            tabela.appendChild(linha);
        });
    } catch (error) {
        console.error("Erro ao listar endereços:", error);
    } finally {
        document.getElementById('loader').style.display = 'none'; // Esconde o loader
    }
}

// Função auxiliar para criar uma coluna
function criarColuna(conteudo) {
    let coluna = document.createElement("td");
    coluna.textContent = conteudo;
    return coluna;
}

// Função para criar coluna de ações (editar e excluir)
function criarColunaAcoes(index) {
    let colunaAcoes = document.createElement("td");

    let botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "btn";
    botaoEditar.onclick = () => editarEndereco(index);
    //botaoEditar.onclick = () => {
        // Redireciona para a página de edição com o ID do endereço
        //window.location.href = `gepeto.html?id=${enderecos[index].id}`;
    //};

    let botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn";
    botaoExcluir.onclick = () => excluirEndereco(index);

    colunaAcoes.appendChild(botaoEditar);
    colunaAcoes.appendChild(botaoExcluir);

    return colunaAcoes;
}




// Função para excluir endereço
async function excluirEndereco(index) {
    if (confirm("Você tem certeza que deseja excluir este endereço?")) {
        mostrarLoader(); // Mostra o loader ao confirmar a exclusão
        const enderecoId = enderecos[index].id;

        try {
            const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${enderecoId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao excluir: ${response.status} - ${errorText}`);
            }

            enderecos.splice(index, 1); // Remove o endereço do array
            await listarEndereco(); // Aguarda a atualização da lista de endereços
            alert("Endereço excluído com sucesso."); // Mensagem após a tabela ser atualizada
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
        } finally {
            esconderLoader(); // Esconde o loader
        }
    }
}

// Chamada inicial para listar endereços
listarEndereco();

// Função para atualizar endereço
async function atualizarEndereco(endereco) {
    console.log("Atualizando endereço:", endereco);
    mostrarLoader(); // Mostra o loader ao atualizar

    if (!endereco.title || !endereco.cep || !endereco.address || !endereco.number) {
        console.error("Todos os campos obrigatórios devem ser preenchidos.");
        esconderLoader(); // Esconde o loader se houver erro
        return;
    }

    const complementoFinal = endereco.complement ? endereco.complement.trim() : "Sem Complemento";

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${endereco.id}`, {
            method: "POST", // Atualizar com PUT
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: endereco.title,
                cep: endereco.cep,
                address: endereco.address,
                number: endereco.number,
                complement: complementoFinal
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao atualizar: ${response.status} - ${errorText}`);
        }

        await listarEndereco(); // Aguarda a atualização da lista de endereços
        alert("Endereço atualizado com sucesso."); // Mensagem após a tabela ser atualizada
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
    } finally {
        esconderLoader(); // Esconde o loader
    }
}

function editarEndereco(index) {
    const endereco = enderecos[index]; // Obtém o endereço selecionado
    console.log("Endereço selecionado para edição:", endereco); // Log para depuração

    // Redireciona para a página de edição, passando o ID do endereço na URL
    const enderecoId = endereco.id;
    console.log("Redirecionando para editar endereço com ID:", enderecoId); // Log para verificar ID
    window.location.href = `atualizarendereco.html?id=${enderecoId}`;
}

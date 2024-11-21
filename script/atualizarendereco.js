const token = localStorage.getItem("accessToken");

        function formatarCEP(input) {
            let cep = input.value.replace(/\D/g, '');
            if (cep.length > 5) {
                cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
            }
            input.value = cep;
        }

        async function preencherFormulario() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id'); 

            if (!id) {
                alert("ID não encontrado na URL");
                return;
            }

            if (!token) {
                console.log("Token não encontrado. Faça login.");
                return;
            }

            try {
                document.getElementById("loader").style.display = "block";

                const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                document.getElementById("loader").style.display = "none";

                if (response.ok) {
                    document.getElementById('title').value = data.data.title || '';
                    document.getElementById('cep').value = data.data.cep || '';
                    document.getElementById('address').value = data.data.address || '';
                    document.getElementById('number').value = data.data.number || '';
                    document.getElementById('complement').value = data.data.complement || '';
                } else {
                    console.error(data);
                    alert("Erro ao buscar os dados do endereço.");
                }
            } catch (error) {
                console.error(error);
                document.getElementById("loader").style.display = "none";
                alert("Erro na requisição para obter os dados.");
            }
        }

        async function atualizarEndereco() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (!id) {
                alert("ID não encontrado na URL");
                return;
            }

            if (!token) {
                console.log("Token não encontrado. Faça login.");
                return;
            }

            let title = document.getElementById('title').value;
            let cep = document.getElementById('cep').value;
            let address = document.getElementById('address').value;
            let number = document.getElementById('number').value;
            let complement = document.getElementById('complement').value;

            if (!title) {
                alert("O campo Título não pode estar vazio.");
                return;
            }

            if (!cep.match(/^\d{5}-\d{3}$/)) {
                alert("O CEP deve estar no formato XXXXX-XXX.");
                return;
            }

            if (!address) {
                alert("O campo Logradouro não pode estar vazio.");
                return;
            }

            if (!number || isNaN(number)) {
                alert("O Número deve ser um valor numérico válido.");
                return;
            }

            try {
                document.getElementById("loader").style.display = "block";

                const API = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
                    method: "POST",  
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        cep: cep,
                        address: address,
                        number: number,
                        complement: complement
                    })
                });

                const resposta = await API.json();

                document.getElementById("loader").style.display = "none";

                if (API.ok) {
                    alert("Cadastro atualizado com sucesso!");
                    window.location.href = "indexendereco.html";
                } else {
                    console.error(resposta);
                    alert("Erro ao atualizar o endereço.");
                }
            } catch (error) {
                console.error(error);
                document.getElementById("loader").style.display = "none";
                alert("Erro na requisição para atualizar o endereço.");
            }
        }

        window.addEventListener('load', preencherFormulario);
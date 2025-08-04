function cadastrarUsuario() {
    let cadastroUsuario = document.getElementById("cadastroUsuario")
    let res = document.getElementById("res")
    cadastroUsuario.disabled = false
    cadastroUsuario.textContent = "Cadastrar"

    cadastroUsuario.addEventListener("click", async (e) => {
        e.preventDefault()

        let firstName = document.getElementById("firstName").value
        let lastName = document.getElementById("lastName").value
        let age = parseInt(document.getElementById("age").value)
        let phone = document.getElementById("phone").value
        let address = document.getElementById("address").value
        let city = document.getElementById("city").value
        let state = document.getElementById("state").value
        let birthDate = document.getElementById("birthDate").value
        let email = document.getElementById("email").value

        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !birthDate) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        const valores = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          phone: phone,
          address: address,
          city: city,
          state: state,
          birthDate: birthDate,
          email: email
        }

        cadastroUsuario.textContent = "Cadastrando..."
        cadastroUsuario.disabled = true

        await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar usuário")
                return resp.json()
            })
            .then(usuario => {
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuário cadastrado com sucesso!</h2>`
                res.innerHTML += `
                    <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    <tr>
                                        <td>${usuario.id}</td>
                                        <td>${usuario.firstName} ${usuario.lastName}</td>
                                        <td>${usuario.age}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.phone}</td>
                                        <td>${usuario.address}</td>
                                        <td>${usuario.city}</td>
                                        <td>${usuario.state}</td>
                                        <td>${usuario.birthDate ? usuario.birthDate = new Date(usuario.birthDate).toLocaleDateString("pt-BR") : usuario.birthDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                `
                alert("Usuário cadastrado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar usuário:", err)
                alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formCadastroUsuario").reset()
                cadastroUsuario.textContent = "Cadastrar"
                cadastroUsuario.disabled = false
            })
    })
}

cadastrarUsuario();
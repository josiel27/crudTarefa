function salvar() {
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;
    if (nome != "" && senha != "") {
        let texto = {//JSON
            "Nome": nome,
            "Senha": senha
        };
        var txtJson = JSON.stringify(texto);//convertendo o json para string
        var blob = new Blob([txtJson], { type: "text/plain;charset=utf-8" });
        saveAs(blob, nome + ".json");
    }
}
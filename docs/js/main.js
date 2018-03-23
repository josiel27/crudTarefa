//referencia do banco de dados firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBMI6R5l6B4H2fzGAh68gSK5iGZ1GXk_yM",
    authDomain: "crudtarefa.firebaseapp.com",
    databaseURL: "https://crudtarefa.firebaseio.com",
    projectId: "crudtarefa",
    storageBucket: "crudtarefa.appspot.com",
    messagingSenderId: "175156036936"
};
firebase.initializeApp(config);


//funcao que faz a inserção no Banco do FIREBASE
function salvar() {
    let tarefa = document.getElementById("tarefa").value;
    let descricao = document.getElementById("descricao").value;
    let feedSuccess = $("#feedSuccess");
    let feedError = $("#feedError");

    if (tarefa != "" && descricao != "") {
        let texto = {//JSON
            "Tarefa": tarefa,
            "Descricao": descricao
        };

        try {
            var content = {};
            content['/tarefas/'+tarefa] = texto;
            return firebase.database().ref().update(content);
            mostraFeed('success');
        } catch (error) {
            mostraFeed('error');
        }
    }

    //Funcao para mostras os feeds de status da inserção no BD
    function mostraFeed(tipo_alert) {
        switch (tipo_alert) {
            case 'success':
                feedSuccess.show(300);
                setTimeout(function () { feedSuccess.hide(1000); }, 2000);
                break
            case 'error':
                feedError.show(300);
                setTimeout(function () { feedError.hide(1000); }, 2000);
                break
        }
    }
}
// database.on('child_added', function (snapshot) {
//     var message = snapshot.val();

//     // if(message.Tarefa == "asdasdas"){
//         // console.log(message.Tarefa)
//     // }
// });
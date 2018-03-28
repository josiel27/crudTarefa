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

let feedSuccess = $("#feedSuccess");
let feedError = $("#feedError");
let feedAlert = $("#feedAlert");

//funcao que faz a inserção no Banco do FIREBASE
function salvar() {
    let tarefa = document.getElementById("tarefa").value;
    let descricao = document.getElementById("descricao").value;
    var data = document.getElementById("data").value;

    if (tarefa != "" && descricao != "" && data != "") {
        let texto = {//JSON
            "Tarefa": tarefa,
            "Descricao": descricao,
            "Data": data
        };
        try {
            var content = {};
            content['/tarefas/' + tarefa] = texto;
            retorno = firebase.database().ref().update(content);
            mostraFeed('success', 'Tarefa adicionada!');
            return retorno;
        } catch (error) {
            mostraFeed('error', 'Erro ao adicionar tarefa!');
        }
    }
}

//funcao que faz a exclusao no Banco do FIREBASE
function remover(nomeTarefa) {
    let texto = {//JSON
        "Tarefa": tarefa,
        "Descricao": descricao,
        "Data": data
    };
    try {
        var content = {};
        content['/tarefas/' + nomeTarefa] = {};
        retorno = firebase.database().ref().update(content);
        mostraFeed('success', 'Tarefa foi removida!');
        return retorno;
    } catch (error) {
        mostraFeed('error', 'Erro ao remover tarefa!');
    }
}

//funcao que faz a alteracao no Banco do FIREBASE
function update(nomeAlterado) {
    var tarefa = $('#tarefa').val();
    var descricao = $('#descricao').val();
    var data = $('#data').val();

    if (tarefa != "" && descricao != "" && data != "") {
        let texto = {//JSON
            "Tarefa": tarefa,
            "Descricao": descricao,
            "Data": data
        };
        try {
            var content = {};
            content['/tarefas/' + nomeAlterado] = {};
            content['/tarefas/' + tarefa] = texto;
            retorno = firebase.database().ref().update(content);
            mostraFeed('success', 'Tarefa foi alterada!');
            return retorno;
        } catch (error) {
            mostraFeed('error', 'Erro ao alterar tarefa!');
        }
    }
}

// indo para o top
function goToTop() {
    $('html, body, ion-content').animate({ scrollTop: 0 }, 'slow');
};

//setar o focus no input tarefas
function setFocusTarefa() {
    setTimeout(function () {
        $("#tarefa").focus();
    }, 500)
};

//Funcao para mostras os feeds de status da inserção no BD
function mostraFeed(tipo_alert, msg_show) {
    var novaMsg = document.createElement('strong');
    novaMsg.textContent = msg_show;

    var msgSuccess = $(document).find('#msgSuccess');
    var msgError = $(document).find('#msgError');
    var msgAlert = $(document).find('#msgAlert');
    if (msgSuccess) { msgSuccess.remove(); };
    if (msgError) { msgError.remove(); };
    if (msgAlert) { msgAlert.remove(); };

    switch (tipo_alert) {
        case 'success':
            novaMsg.id = 'msgSuccess';
            feedSuccess.append(novaMsg);
            feedSuccess.show(300);
            setTimeout(function () { feedSuccess.hide(1000); }, 2000);
            break
        case 'error':
            novaMsg.id = 'msgError';
            feedError.append(novaMsg);
            feedError.show(300);
            setTimeout(function () { feedError.hide(1000); }, 2000);
            break
        case 'alert':
            novaMsg.id = 'msgAlert';
            feedAlert.append(novaMsg);
            feedAlert.show(300);
            setTimeout(function () { feedAlert.hide(1000); }, 2000);
            break
    }
}

function mostrarCrudTarefa() {
    setFocusTarefa();
    $('#btnNovaTarefa').hide();
    $('#crudForm').show(300);
}

function esconderCrudTarefa() {
    $('#crudForm').hide(300);
    $('#btnNovaTarefa').show();
}
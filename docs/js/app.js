
//referencia do banco de dados firebase
let desc;
let taref;
(function () {
    'use strict';

    angular.module('cadastro', [])

        .controller('tarefaController', function ($scope, $http) {
            $scope.tarefas = [];
            $scope.nomeAlterado = [];

            //inicialização de um usuário vazio
            $scope.tarefa = { tarefa: '', descricao: '' };

            //método para adicionar o usuário a lista
            $scope.cadastrar = function () {
                salvar();//funcao do main.js para fazer a inserção no firebase
                $scope.tarefas = [];
                $scope.atualizar();
            };

            $scope.deletar = function (nomeTarefa) {
                //remover da tabela
                $scope.tarefas.forEach(function (e) {
                    if(e.tarefa == nomeTarefa){
                        $('#'+nomeTarefa).remove();
                    }
                });
                remover(nomeTarefa);//funcao do main.js para fazer a exclusao no firebase
            };

            $scope.alterar = function (nomeTarefa, descTarefa) {
                $scope.nomeAlterado = nomeTarefa;
                $('#btnSalvar').removeClass('disabled');
                // $('#btnCancel').removeClass('disabled');
                $('#btnAdicionar').addClass('disabled');
                $scope.tarefa = { tarefa: nomeTarefa, descricao: descTarefa};
                mostrarCrudTarefa();
            };

            $scope.salvarAlteracao = function () {
                update($scope.nomeAlterado);
                let tarefa = $scope.nomeAlterado;
                // let descricao = document.getElementById("descricao").value;
                
                $scope.tarefas.forEach(function (e) {
                    if(e.tarefa == tarefa){
                        e.tarefa = tarefa;
                        // e.descricao = descricao;
                    }
                });
                $('#btnSalvar').addClass('disabled');
                // $('#btnCancel').addClass('disabled');
                $('#btnAdicionar').removeClass('disabled');
                $scope.tarefas = [];
                $scope.atualizar();
            };

            $scope.cancelAlteracao = function (nomeTarefa, descTarefa) {
                $scope.tarefa = { tarefa: "", descricao: "" };
                $('#btnSalvar').addClass('disabled');
                // $('#btnCancel').addClass('disabled');
                $('#btnAdicionar').removeClass('disabled');
                esconderCrudTarefa();
            };

            //método para buscar do BD firebase e popular a tabela
            $scope.atualizar = function () {
                // Definindo a referência com a qual trabalharemos: "text"
                var textRef = firebase.database().ref('tarefas');
                // var acoes = ;

                // "Escutando" toda e qualquer alteração da chave "text"
                textRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var value = childSnapshot.val();
                        $scope.tarefa = { tarefa: value.Tarefa, descricao: value.Descricao };
                        $scope.tarefas.push($scope.tarefa);
                    });
                    $scope.tarefa = { tarefa: "", descricao: "" };
                    $scope.$apply();
                });
            };
            $scope.atualizar();
        })
})();


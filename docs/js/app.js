
//referencia do banco de dados firebase
(function () {
    'use strict';

    angular.module('cadastro', [])

        .controller('tarefaController', function ($scope, $http) {
            $scope.tarefas = [];
            $scope.nomeAlterado = [];

            //inicialização de um usuário vazio
            $scope.tarefa = { tarefa: '', descricao: '', data: '' };

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

            $scope.alterar = function (nomeTarefa, descTarefa, dataEntrega) {
                $scope.nomeAlterado = nomeTarefa;
                $('#btnSalvar').removeClass('disabled');
                $('#btnAdicionar').addClass('disabled');
                

                var data = new Date(dataEntrega);
                var day = data.getDate()+1;
                var month = data.getMonth()+1;
                var year = data.getFullYear()
                
                var dataFinal = month + "-" + day + "-" + year;
                console.log(dataFinal)

                $scope.tarefa = { tarefa: nomeTarefa, descricao: descTarefa, data: new Date(dataFinal)};
                mostrarCrudTarefa();
            };

            $scope.salvarAlteracao = function () {
                update($scope.nomeAlterado);
                let tarefa = $scope.nomeAlterado;
                
                $('#btnSalvar').addClass('disabled');
                $('#btnAdicionar').removeClass('disabled');
                $scope.tarefas = [];
                $scope.atualizar();
            };

            $scope.cancelAlteracao = function (nomeTarefa, descTarefa, dataEntrega) {
                $scope.tarefa = { tarefa: '', descricao: '', data: '' };
                $('#btnSalvar').addClass('disabled');
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
                        
                        $scope.tarefa = { tarefa: value.Tarefa, descricao: value.Descricao, data: value.Data};
                        $scope.tarefas.push($scope.tarefa);
                    });
                    $scope.tarefa = { tarefa: '', descricao: '', data: '' };
                    $scope.$apply();
                });
            };
            $scope.atualizar();
        })
})();


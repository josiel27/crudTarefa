(function () {
    'use strict';

    angular.module('cadastro', [])

        .controller('tarefaController', function ($scope, $http) {
            $scope.tarefas = [];
            $scope.dataOrigin = []; //para colocar no input type date
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
                    if (e.tarefa == nomeTarefa) {
                        $('#' + nomeTarefa).remove();
                    }
                });
                remover(nomeTarefa);//funcao do main.js para fazer a exclusao no firebase
            };

            $scope.alterar = function (nomeTarefa, descTarefa, dataEntrega) {
                $scope.nomeAlterado = nomeTarefa;
                //desabilitando e habilitando botoes
                $('#btnSalvar').removeAttr('disabled');
                
                $('#btnAdicionar').attr('disabled','');
                let dtEntrega = '';

                //scope que recebeu do bd o valor correto para passar para o input
                $scope.dataOrigin.forEach(function (e) {
                    if (e.tarefa == nomeTarefa) { dtEntrega = e.data; }
                });

                //formatando data para string
                var data = new Date(dtEntrega);
                var day = data.getDate() + 1;
                var month = data.getMonth() + 1;
                var year = data.getFullYear();
                var dataFinal = year + "-" + month + "-" + day;

                //recebendo da tabelas os dados para alteracao
                $scope.tarefa = { tarefa: nomeTarefa, descricao: descTarefa, data: new Date(dataFinal) };
                
                mostrarCrudTarefa();//funcao para mostrar os campos de insercao e alteracao
            };

            $scope.salvarAlteracao = function () {
                update($scope.nomeAlterado);//funcao para update no banco de dados
                let tarefa = $scope.nomeAlterado;

                //desabilitando e habilitando botoes
                $('#btnSalvar').attr('disabled', '');
                $('#btnAdicionar').removeAttr('disabled', '');
                $scope.tarefas = [];
                $scope.atualizar();
            };

            $scope.cancelAlteracao = function (nomeTarefa, descTarefa, dataEntrega) {
                $scope.tarefa = { tarefa: '', descricao: '', data: '' };
                //desabilitando e habilitando botoes
                $('#btnSalvar').attr('disabled', '');
                $('#btnAdicionar').removeAttr('disabled', '');
                esconderCrudTarefa();//funcao para esconder os campos de insercao e alteracao
            };

            //método para buscar do BD firebase e popular a tabela
            $scope.atualizar = function () {
                // Definindo a referência com a qual trabalharemos: "text"
                var textRef = firebase.database().ref('tarefas');
                // "Escutando" toda e qualquer alteração da chave "text"
                textRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var value = childSnapshot.val();

                        //formantando data
                        var dataAtt = new Date(value.Data);
                        var dayAtt = dataAtt.getDate() + 1;
                        dayAtt = ("00" + dayAtt).slice(-2);
                        var monthAtt = dataAtt.getMonth() + 1;
                        monthAtt = ("00" + monthAtt).slice(-2);
                        var yearAtt = dataAtt.getFullYear();
                        yearAtt = ("00" + yearAtt).slice(-4);

                        var dataFinalAtt = dayAtt + "-" + monthAtt + "-" + yearAtt;

                        $scope.tarefa = { tarefa: value.Tarefa, descricao: value.Descricao, data: dataFinalAtt };
                        $scope.tarefas.push($scope.tarefa);
                        $scope.dataOrigin.push({ tarefa: value.Tarefa, data: value.Data });
                    });
                    $scope.tarefa = { tarefa: '', descricao: '', data: '' };
                    $scope.$apply();
                });
            };
            $scope.atualizar();
        })
})();


// curl 'https://[PROJECT_ID].firebaseio.com/users/jack/name.json

// var config = {
//     apiKey: "AIzaSyBMI6R5l6B4H2fzGAh68gSK5iGZ1GXk_yM",
//     authDomain: "crudtarefa.firebaseapp.com",
//     databaseURL: "https://crudtarefa.firebaseio.com",
//     projectId: "crudtarefa",
//     storageBucket: "crudtarefa.appspot.com",
//     messagingSenderId: "175156036936"
// };
// firebase.initializeApp(config);

//referencia do banco de dados firebase
(function () {
    'use strict';

    angular.module('cadastro', [])

        .controller('tarefaController', function ($scope, $http) {

            $scope.tarefas = [
                { tarefa: 'vazio', descricao: '1234' },
                { tarefa: 'Fulano', descricao: '1234' },
                { tarefa: 'Maria', descricao: '12345' },
                { tarefa: 'Zé', descricao: '12345678' }
            ];

            //inicialização de um usuário vazio
            $scope.tarefa = { tarefa: '', descricao: '' };

            //método para adicionar o usuário a lista
            $scope.cadastrar = function () {
                $scope.tarefas.push($scope.tarefa);
                $scope.tarefa = { tarefa: '', descricao: '' };
                $scope.statusdescricao = {};
            };

            //método para buscar do BD firebase e popular a tabela
            $scope.atualizar = function () {

                // Definindo a referência com a qual trabalharemos: "text"
                var textRef = firebase.database().ref('tarefas');
                
                // "Escutando" toda e qualquer alteração da chave "text"
                textRef.on('value', function (snapshot) {
                    // Escrevendo o que foi recebido em tempo real no nosso campo de texto
                    let desc = snapshot.val().tarefa2.Descricao;
                    let taref = snapshot.val().tarefa2.Tarefa;

                    console.log(snapshot.val().tarefa2.Descricao)
                    console.log(snapshot.val())
                    // document.getElementById('text').value = snapshot.val();

                    $scope.tarefa = { tarefa: taref, descricao: desc };
                    $scope.tarefas.push($scope.tarefa);
                    $scope.tarefa = { tarefa: "", descricao: "" };
                });

                // var onSuccess = (data) => {
                //     // console.log(data)
                //     $scope.tarefas = data.data;
                //     console.log($scope.tarefas)
                //     return data;
                // }
                // var onFail = (data) => {
                //     console.log('er ' + data.data)
                //     alert('error')
                // }
                // var database = $http.get("https://crudtarefa.firebaseio.com/tarefas.json").then(onSuccess, onFail);
                // console.log(database)
                // database.val();
                // database.val(function (snapshot) {

                // var message = snapshot.val();
                //$scope.tarefas.push(message);
                // $scope.tarefas = snapshot */
                // console.log(snapshot);

                // $scope.tarefas = snapshot;
                // });


            };
            $scope.atualizar();
        });
})();




    //método para validar a senha do usuário
            // $scope.validardescricao = function () {
            //     $scope.statusdescricao = {};

            //     if ($scope.tarefa.descricao && $scope.tarefa.descricao.length >= 6) {
            //         $scope.statusdescricao.classe = 'has-success';
            //         $scope.statusdescricao.icone = 'glyphicon-ok';
            //         $scope.statusdescricao.mensagem = 'descricao forte';

            //     } else {
            //         $scope.statusdescricao.classe = 'has-error';
            //         $scope.statusdescricao.icone = 'glyphicon-remove';
            //         $scope.statusdescricao.mensagem = 'descricao fraca';
            //     }
            // };
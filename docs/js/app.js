(function () {
    'use strict';

    angular.module('cadastro', [])

        .controller('UsuarioController', function ($scope) {

            // lista de usuários pré cadastrados
            $scope.usuarios = [
                {nome: 'vazio', senha: '1234'},
                {nome: 'Fulano', senha: '1234'},
                {nome: 'Maria', senha: '12345'},
                {nome: 'Zé', senha: '12345678'}
            ];

            //inicialização de um usuário vazio
            $scope.usuario = {nome: '', senha: ''};

            //método para adicionar o usuário a lista
            $scope.cadastrar = function () {
                $scope.usuarios.push($scope.usuario);
                $scope.usuario = {nome: '', senha: ''};
                $scope.statusSenha = {};
            };

            //método para validar a senha do usuário
            $scope.validarSenha = function () {
                $scope.statusSenha = {};

                if ($scope.usuario.senha && $scope.usuario.senha.length >= 6) {
                    $scope.statusSenha.classe = 'has-success';
                    $scope.statusSenha.icone = 'glyphicon-ok';
                    $scope.statusSenha.mensagem = 'Senha forte';

                }else {
                    $scope.statusSenha.classe = 'has-error';
                    $scope.statusSenha.icone = 'glyphicon-remove';
                    $scope.statusSenha.mensagem = 'Senha fraca';
                }
            };
        });

})();
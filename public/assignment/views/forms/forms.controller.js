/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $location, $rootScope) {
        var vm = this;
        var currentForm;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function init() {
            render();
        }
        init();

        function render() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function (response) {
                $scope.forms = response;
            });
        }

        function addForm(form) {
            if (!(form === undefined))
            FormService.createFormForUser($rootScope.currentUser._id, form, function (respone) {
                console.log(respone);
                render();
            });
        }

        function updateForm(form) {
            if (!(form === undefined))
            FormService.updateFormById(form._id, form, function (respone) {
                console.log(respone);
            });
            render();
        }

        function deleteForm(form) {
            FormService.deleteFormById(form._id, function (respone) {
                console.log(respone);
            });
            render();
        }

        function selectForm(form) {
            var selectedForm = {
                _id    : form._id,
                title  : form.title,
                userId : form.userId
            };
            $scope.form = selectedForm;
        }
    }
})();
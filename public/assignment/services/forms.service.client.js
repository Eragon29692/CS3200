/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;


        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id    : (new Date()).getTime(),
                title  : form.title,
                userId : userId
            };
            forms.push(newForm);
            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var f in forms) {
                if (userId === forms[f].userId) {
                    userForms.push(forms[f]);
                }
            }
            return callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for (var i = forms.length - 1; i >= 0; i--) {
                if (formId === forms[i]._id) {
                    forms.splice(i, 1);
                    return callback(forms);
                }
            }
            return null;
        }


        function updateFormById(formId, newForm, callback) {
            var updateForm = {
                _id    : newForm._id,
                title  : newForm.title,
                userId : newForm.userId
            };
            for (var f in forms) {
                if (formId === forms[f]._id) {
                    forms[f] = updateForm;
                    return callback(updateForm);
                }
            }
            return null;
        }


    }
})();
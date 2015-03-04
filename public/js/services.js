/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportServices = angular.module('reportServices', ['ngResource']);

reportServices.factory('TestCases', ['$resource', function ($resource) {
    return $resource('/testcases/:id', null, {});
}]);

reportServices.factory("TestCaseFactory", ['TestCases', function (TestCases) {
    return {
        data: {testcases: []},
        getData: function (filter) {
            var self = this;
            TestCases.query(filter, function (data) {
                self.data.testcases = data;
            });
        }
    };
}]);
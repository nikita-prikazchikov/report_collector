/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportServices = angular.module('reportServices', ['ngResource']);

reportServices.factory('TestCases', ['$resource', function($resource){
    return $resource('/testcases/:id', null, {
        'update': { method:'PUT' }
    });
}]);
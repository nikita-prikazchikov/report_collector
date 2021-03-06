'use strict';
/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportApp = angular.module('reportApp',
    [
        'ngRoute',
        'ngResource',
        'reportControllers',
        'reportServices']
);

reportApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/testcases.html',
            controller: 'TestCasesController'
        })

        .when('/testcases', {
            templateUrl: '/partials/testcases.html',
            controller: 'TestCasesController'
        })

        .when('/testcases/:id', {
            templateUrl: '/partials/testcase.html',
            controller: 'TestCaseController'
        })

        .when('/report', {
            redirectTo: 'report/summary'
        })

        .when('/report/summary', {
            templateUrl: '/partials/report_summary.html',
            controller: 'SummaryReportController'
        });
}]);


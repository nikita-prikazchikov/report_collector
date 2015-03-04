/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportControllers = angular.module('reportControllers', []);

reportControllers.controller('TestCasesController', ['$scope', 'TestCaseFactory', function ($scope, TestCaseFactory) {
    $scope.editing = [];
    $scope.data = TestCaseFactory.data;

    $scope.save = function () {
        if (!$scope.newtestcase || $scope.newtestcase.length < 1) return;
        var testcase = new TestCases({name: $scope.newtestcase, completed: false});

        testcase.$save(function () {
            $scope.testcases.push(testcase);
            $scope.newtestcase = ''; // clear textbox
        });
    };

    $scope.update = function (index) {
        var testcase = $scope.testcases[index];
        TestCases.update({id: testcase._id}, testcase);
        $scope.editing[index] = false;
    };

    $scope.edit = function (index) {
        $scope.editing[index] = angular.copy($scope.testcases[index]);
    };

    $scope.cancel = function (index) {
        $scope.testcases[index] = angular.copy($scope.editing[index]);
        $scope.editing[index] = false;
    };
    $scope.remove = function (index) {
        var testcase = $scope.testcases[index];
        TestCases.remove({id: testcase._id}, function () {
            $scope.testcases.splice(index, 1);
        });
    }
}]);

reportControllers.controller('TestCaseController', ['$scope', '$routeParams', 'TestCases', '$location', function ($scope, $routeParams, TestCases, $location) {
    $scope.testcase = TestCases.get({id: $routeParams.id});
}]);

reportControllers.controller('FilterController', ['$scope', '$routeParams', 'TestCaseFactory', '$location', function ($scope, $routeParams, TestCaseFactory, $location) {
    $scope.filter = {
        name         : $routeParams.name || "",
        status       : $routeParams.status || "",
        tags         : $routeParams.tags || "",
        job_name     : $routeParams.job_name || "",
        build_id     : $routeParams.build_id || "",
        feature      : $routeParams.feature || "",
        environment  : $routeParams.environment || "",
        project      : $routeParams.project || "",
        functionality: $routeParams.functionality || "",
        release      : $routeParams.release || ""
    };

    $scope.setStatus = function (value) {
        $scope.filter.status = value;
    };

    $scope.applyFilter = function () {
        var f = angular.copy($scope.filter);
        for (var k in f) {
            if (!f[k]) delete f[k];
        }
        TestCaseFactory.getData(f);
    };
}]);

//$scope.editing = [];
//$scope.testcases = TestCases.query();
//
//$scope.save = function(){
//    if(!$scope.newTodo || $scope.newTodo.length < 1) return;
//    var todo = new TestCases({ name: $scope.newTodo, completed: false });
//
//    todo.$save(function(){
//        $scope.todos.push(todo);
//        $scope.newTodo = ''; // clear textbox
//    });
//};
//
//$scope.update = function(index){
//    var todo = $scope.todos[index];
//    TestCases.update({id: todo._id}, todo);
//    $scope.editing[index] = false;
//};
//
//$scope.edit = function(index){
//    $scope.editing[index] = angular.copy($scope.todos[index]);
//};
//
//$scope.cancel = function(index){
//    $scope.todos[index] = angular.copy($scope.editing[index]);
//    $scope.editing[index] = false;
//};
//$scope.remove = function(index){
//    var todo = $scope.todos[index];
//    TestCases.remove({id: todo._id}, function(){
//        $scope.todos.splice(index, 1);
//    });
//}

reportControllers.controller('SummaryReportController', ['$scope', 'TestCases',
        function ($scope, TestCases) {
            var testcases = TestCases.query(function () {
                $scope.data = getTestCasesTree(testcases);
                $scope.data2 = formatTestCasesOutput($scope.data);
            });

            $scope.testcases = testcases;
        }]
);
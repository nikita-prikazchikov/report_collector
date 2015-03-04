/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportControllers = angular.module('reportControllers', []);

reportControllers.controller('TestCasesController', ['$scope', 'TestCases', function ($scope, TestCases) {
    $scope.editing = [];
    $scope.todos = TestCases.query();

    $scope.save = function(){
        if(!$scope.newTodo || $scope.newTodo.length < 1) return;
        var todo = new TestCases({ name: $scope.newTodo, completed: false });

        todo.$save(function(){
            $scope.todos.push(todo);
            $scope.newTodo = ''; // clear textbox
        });
    };

    $scope.update = function(index){
        var todo = $scope.todos[index];
        TestCases.update({id: todo._id}, todo);
        $scope.editing[index] = false;
    };

    $scope.edit = function(index){
        $scope.editing[index] = angular.copy($scope.todos[index]);
    };

    $scope.cancel = function(index){
        $scope.todos[index] = angular.copy($scope.editing[index]);
        $scope.editing[index] = false;
    };
    $scope.remove = function(index){
        var todo = $scope.todos[index];
        TestCases.remove({id: todo._id}, function(){
            $scope.todos.splice(index, 1);
        });
    }
}]);

reportControllers.controller('TestCaseController', ['$scope', '$routeParams', 'TestCases', '$location', function ($scope, $routeParams, TestCases, $location) {
    $scope.testcase = TestCases.get({id: $routeParams.id });
}]);

//$scope.editing = [];
//$scope.todos = TestCases.query();
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
        function($scope, TestCases) {
            var testcases = TestCases.query(function(){
                $scope.data = getTestCasesTree(testcases);
                $scope.data2 = formatTestCasesOutput($scope.data);
            });

            $scope.testcases = testcases;
        }]
);
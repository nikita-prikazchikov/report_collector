/**
 * Created by nprikazchikov on 3/2/15.
 */

var reportControllers = angular.module('reportControllers', []);

reportControllers.controller('HeaderController', ['$scope', '$location', 'VisibilityFactory',
    function ($scope, $location, VisibilityFactory) {
        $scope.$location = $location;
        $scope.toggleFilter = function () {
            VisibilityFactory.data.filter = !VisibilityFactory.data.filter;
        }
    }]);

reportControllers.controller('TestCasesController', ['$scope', 'TestCaseFactory', 'VisibilityFactory',
    function ($scope, TestCaseFactory, VisibilityFactory) {
        $scope.visibility = VisibilityFactory.data;
        $scope.data = TestCaseFactory.data;
    }]);

reportControllers.controller('TestCaseController', ['$scope', '$routeParams', 'TestCases', '$location', function ($scope, $routeParams, TestCases, $location) {
    $scope.testcase = TestCases.get({id: $routeParams.id});
}]);

reportControllers.controller('FilterController',
    ['$scope', '$routeParams', 'TestCaseFactory', '$location', 'VisibilityFactory',
        function ($scope, $routeParams, TestCaseFactory, $location, VisibilityFactory) {
            $scope.visibility = VisibilityFactory.data;
            $scope.filter = new SearchFilter($routeParams);

            $scope.applyFilter = function () {
                var filter = $scope.filter.removeEmpty();
                $location.search(filter);
                TestCaseFactory.getData(filter);
            };

            if ($scope.filter.isEmpty()) {
                if (!$scope.data.testcases.length) {
                    $scope.applyFilter();
                }
            }
            else {
                VisibilityFactory.data.filter = true;
            }
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

reportControllers.controller('SummaryReportController',
    ['$scope', '$routeParams', 'TestCaseFactory',
        function ($scope, $routeParams, TestCaseFactory) {
            $scope.data = TestCaseFactory.data;
            $scope.filter = new SearchFilter($routeParams);

            $scope.data.table_data = formatTestCasesOutputTableForSummaryReport(TestCaseFactory.data.testcases, $scope.filter);
            $scope.$watch('data.testcases', function () {
                $scope.data.table_data = formatTestCasesOutputTableForSummaryReport(TestCaseFactory.data.testcases, $scope.filter);
            });
        }
    ]
);
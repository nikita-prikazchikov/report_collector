/**
 * Created by nprikazchikov on 3/2/15.
 */

function getTestCasesTree(testCases){
    var obj = {};
    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        if (obj[testCase.environment] == undefined) {
            obj[testCase.environment] = {name: testCase.environment, projects: {}, status: "pass"};
        }
        if (obj[testCase.environment].projects[testCase.project] == undefined) {
            obj[testCase.environment].projects[testCase.project] = {
                name: testCase.project,
                functionality: {},
                status: "pass"
            };
        }
        if (obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality] == undefined) {
            obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality] = {
                name: testCase.functionality,
                testCases: [],
                status: "pass"
            };
        }
        obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality].testCases.push(testCase);
        if (testCase.status == "fail"){
            obj[testCase.environment].status = "fail";
            obj[testCase.environment].projects[testCase.project].status = "fail";
            obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality].status = "fail";
        }
    }
    return obj;
}

function formatTestCasesOutput(testCases) {
    var obj = {};
    for (var environment in testCases) {
        obj[testCases[environment].name] = {
            name: testCases[environment].name,
            status: testCases[environment].status,
            details: [],
            fails: []
        };
        for (var project in testCases[environment].projects){
            obj[testCases[environment].name].details.push({
                project: project,
                functionality: "",
                status: testCases[environment].projects[project].status
            });
            for (var functionality in testCases[environment].projects[project].functionality){
                var list = testCases[environment].projects[project].functionality[functionality].testCases;
                var pass = 0;
                var fail = 0;
                for( var i = 0; i < list.length; i ++){
                    if ( list[i].status == "pass")
                        pass++;
                    if ( list[i].status == "fail") {
                        fail++;
                        obj[testCases[environment].name].fails.push(list[i]);
                    }
                }
                obj[testCases[environment].name].details.push({
                    project: "",
                    functionality: functionality,
                    status: testCases[environment].projects[project].functionality[functionality].status,
                    pass: pass,
                    fail: fail
                });
            }
        }
    }
    return obj;
}
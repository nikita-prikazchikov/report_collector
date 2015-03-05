/**
 * Created by nprikazchikov on 3/2/15.
 */

function formatTestCasesOutputTableForSummaryReport(testCases, filter) {
    var obj = {};
    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        if (obj[testCase.environment] == undefined) {
            obj[testCase.environment] = {name: testCase.environment, projects: {}, status: "pass"};
        }
        if (obj[testCase.environment].projects[testCase.project] == undefined) {
            obj[testCase.environment].projects[testCase.project] = {
                name         : testCase.project,
                functionality: {},
                testCases: [],
                status       : "pass"
            };
        }
        obj[testCase.environment].projects[testCase.project].testCases.push(testCase);
        if (obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality] == undefined) {
            obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality] = {
                name     : testCase.functionality,
                testCases: [],
                status   : "pass"
            };
        }
        obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality].testCases.push(testCase);
        if (testCase.status == "fail") {
            obj[testCase.environment].status = "fail";
            obj[testCase.environment].projects[testCase.project].status = "fail";
            obj[testCase.environment].projects[testCase.project].functionality[testCase.functionality].status = "fail";
        }
    }
    var output = {};
    for (var environment in obj) {
        if (obj.hasOwnProperty(environment)){
            output[obj[environment].name] = {
                name   : obj[environment].name,
                status : obj[environment].status,
                details: [],
                fails  : []
            };
            for (var project in obj[environment].projects) {
                if (obj[environment].projects.hasOwnProperty(project)) {
                    var list = obj[environment].projects[project].testCases;
                    var pass = 0;
                    var fail = 0;
                    for (i = 0; i < list.length; i++) {
                        if (list[i].status == "pass")
                            pass++;
                        if (list[i].status == "fail") {
                            fail++;
                        }
                    }
                    output[obj[environment].name].details.push({
                        project      : project,
                        functionality: "",
                        status       : obj[environment].projects[project].status,
                        pass         : pass,
                        fail         : fail,
                        href_pass    : filter.toUrl(filter.extend({
                            status       : "pass",
                            project      : project,
                            environment  : environment
                        })),
                        href_fail    : filter.toUrl(filter.extend({
                            status       : "fail",
                            project      : project,
                            environment  : environment
                        }))
                    });
                    for (var functionality in obj[environment].projects[project].functionality) {
                        if (obj[environment].projects[project].functionality.hasOwnProperty(functionality)) {
                            var list1 = obj[environment].projects[project].functionality[functionality].testCases;
                            var pass1 = 0;
                            var fail1 = 0;
                            for (i = 0; i < list1.length; i++) {
                                if (list1[i].status == "pass")
                                    pass1++;
                                if (list1[i].status == "fail") {
                                    fail1++;
                                    output[obj[environment].name].fails.push(list1[i]);
                                }
                            }
                            output[obj[environment].name].details.push({
                                project      : "",
                                functionality: functionality,
                                status       : obj[environment].projects[project].functionality[functionality].status,
                                pass         : pass1,
                                fail         : fail1,
                                href_pass    : filter.toUrl(filter.extend({
                                    status       : "pass",
                                    project      : project,
                                    environment  : environment,
                                    functionality: functionality
                                })),
                                href_fail    : filter.toUrl(filter.extend({
                                    status       : "fail",
                                    project      : project,
                                    environment  : environment,
                                    functionality: functionality
                                }))
                            });
                        }
                    }
                }
            }
        }
    }
    return output;
}

function SearchFilter(parameters) {
    this.data = {
        name         : parameters.name || "",
        status       : parameters.status || "",
        tags         : parameters.tags || "",
        job_name     : parameters.job_name || "",
        build_id     : parameters.build_id || "",
        feature      : parameters.feature || "",
        environment  : parameters.environment || "",
        project      : parameters.project || "",
        functionality: parameters.functionality || "",
        release      : parameters.release || ""
    }
}
SearchFilter.prototype.setStatus = function (value) {
    this.data.status = value;
};
SearchFilter.prototype.extend = function (parameters) {
    return angular.extend(angular.copy(this.removeEmpty()), this.removeEmpty(parameters));
};
SearchFilter.prototype.removeEmpty = function(filter){
    filter = filter || this.data;
    var f = angular.copy(filter);
    for (var k in f) {
        if (f.hasOwnProperty(k) && !f[k]) delete f[k];
    }
    return f;
};
SearchFilter.prototype.toUrl = function(filter){
    filter = filter || this.data;
    var f = angular.copy(filter);
    for (var k in f) {
        if (f.hasOwnProperty(k) && !f[k]) delete f[k];
    }
    var pairs = [];

    for (var prop in f) {
        if (f.hasOwnProperty(prop)) {
            var key = encodeURIComponent(prop),
                v = encodeURIComponent(f[prop]);
            pairs.push( key + "=" + v);
        }
    }
    return "?" + pairs.join("&");
};
SearchFilter.prototype.isEmpty = function(){
    var f = this.removeEmpty();
    return Object.getOwnPropertyNames(f).length != 0;
};

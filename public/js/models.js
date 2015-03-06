/**
 * Created by nprikazchikov on 3/2/15.
 */

function formatTestCasesOutputTableForSummaryReport(testCases, filter) {
    var obj = {};
    for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        if (obj[testCase.environment] == undefined) {
            obj[testCase.environment] = {name: testCase.environment, projects: {}, status: "pass", testCases: []};
        }
        var env = obj[testCase.environment];
        env.testCases.push(testCase);
        if (env.projects[testCase.project] == undefined) {
            env.projects[testCase.project] = {
                name         : testCase.project,
                functionality: {},
                testCases    : []
            };
        }
        var proj = env.projects[testCase.project];
        proj.testCases.push(testCase);
        if (proj.functionality[testCase.functionality] == undefined) {
            proj.functionality[testCase.functionality] = {
                name     : testCase.functionality,
                testCases: []
            };
        }
        var func = proj.functionality[testCase.functionality];
        func.testCases.push(testCase);
        if (testCase.status == "fail") {
            obj[testCase.environment].status = "fail";
        }
    }
    var output = {};
    for (var environmentName in obj) {
        if (!obj.hasOwnProperty(environmentName)) {
            continue;
        }
        var environment = obj[environmentName];
        output[environment.name] = {
            name   : environment.name,
            status : environment.status,
            details: [],
            fails  : []
        };
        for (var projectName in environment.projects) {
            if (!environment.projects.hasOwnProperty(projectName)) {
                continue;
            }
            var project = environment.projects[projectName];
            var list = project.testCases;
            var pass = 0;
            var fail = 0;
            for (i = 0; i < list.length; i++) {
                if (list[i].status == "pass")
                    pass++;
                if (list[i].status == "fail") {
                    fail++;
                }
            }
            output[environment.name].details.push({
                project      : projectName,
                functionality: "",
                pass         : pass,
                fail         : fail,
                href_pass    : filter.toUrl(filter.extend({
                    status     : "pass",
                    project    : projectName,
                    environment: environmentName
                })),
                href_fail    : filter.toUrl(filter.extend({
                    status     : "fail",
                    project    : projectName,
                    environment: environmentName
                }))
            });
            for (var functionalityName in project.functionality) {
                if (!project.functionality.hasOwnProperty(functionalityName)) {
                    continue;
                }
                var list1 = project.functionality[functionalityName].testCases;
                var pass1 = 0;
                var fail1 = 0;
                for (i = 0; i < list1.length; i++) {
                    if (list1[i].status == "pass")
                        pass1++;
                    if (list1[i].status == "fail") {
                        fail1++;
                        output[environment.name].fails.push(list1[i]);
                    }
                }
                output[environment.name].details.push({
                    project      : "",
                    functionality: functionalityName,
                    pass         : pass1,
                    fail         : fail1,
                    href_pass    : filter.toUrl(filter.extend({
                        status       : "pass",
                        project      : projectName,
                        environment  : environmentName,
                        functionality: functionalityName
                    })),
                    href_fail    : filter.toUrl(filter.extend({
                        status       : "fail",
                        project      : projectName,
                        environment  : environmentName,
                        functionality: functionalityName
                    }))
                });
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
SearchFilter.prototype.removeEmpty = function (filter) {
    filter = filter || this.data;
    var f = angular.copy(filter);
    for (var k in f) {
        if (f.hasOwnProperty(k) && !f[k]) delete f[k];
    }
    return f;
};
SearchFilter.prototype.toUrl = function (filter) {
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
            pairs.push(key + "=" + v);
        }
    }
    return "?" + pairs.join("&");
};
SearchFilter.prototype.isEmpty = function () {
    var f = this.removeEmpty();
    return Object.getOwnPropertyNames(f).length != 0;
};

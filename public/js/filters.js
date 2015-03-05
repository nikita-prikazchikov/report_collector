/**
 * Created by nprikazchikov on 3/2/15.
 */

reportApp.filter('fake', function() {
    return function(input, key) {
        return "fake";
    };
});

reportApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = true;
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});
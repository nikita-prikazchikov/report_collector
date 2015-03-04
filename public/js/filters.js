/**
 * Created by nprikazchikov on 3/2/15.
 */

reportApp.filter('fakse', function() {
    return function(input, key) {
        return "fake";
    };
});

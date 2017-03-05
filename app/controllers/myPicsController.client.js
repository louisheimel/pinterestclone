'use strict';

(function() {
    ajaxFunctions.ready(
        ajaxFunctions.ajaxRequest('GET', '/get_my_pics', function(data) {
        console.log(data);
    }));
})();
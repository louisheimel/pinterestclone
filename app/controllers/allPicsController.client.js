'use strict';

(function() {
    ajaxFunctions.ready(
        ajaxFunctions.ajaxRequest('GET', '/all_pics', function(data) {
        console.log(data);
    }));
})();
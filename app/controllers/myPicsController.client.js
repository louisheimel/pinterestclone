'use strict';

(function() {
    var body = document.getElementsByTagName('body')[0];
    
    ajaxFunctions.ready(
        ajaxFunctions.ajaxRequest('GET', '/get_my_pics', function(data) {
            console.log(data)
        JSON.parse(data).forEach((pic) => {
            var newPic = document.createElement('img');
            img.setAttribute('href', pic.url);
            body.appendChild(img)
        })
        console.log(data);
    }));
})();
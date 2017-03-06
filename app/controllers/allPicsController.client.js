'use strict';

(function() {
    ajaxFunctions.ready(
        ajaxFunctions.ajaxRequest('GET', '/all_pics', function(data) {
        var grid = document.querySelector('.masonry-grid');
        JSON.parse(data).forEach((datum) => {
            var img = document.createElement('img'),
                div = document.createElement('div');
            img.setAttribute('src', datum.url);
            div.appendChild(img);
            grid.appendChild(div);
        })
        console.log(data);
    }));
})();
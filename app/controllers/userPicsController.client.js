'use strict';

(function() {
    ajaxFunctions.ready(
        
        ajaxFunctions.ajaxRequest('GET', '/user/', function(data) {
        var grid = document.querySelector('.masonry-grid');
        document.querySelector('body').setAttribute('width', '100%');
        grid.style.margin = '20px';
        JSON.parse(data).forEach((datum) => {
            var img = document.createElement('img'),
                div = document.createElement('div');
            img.setAttribute('src', datum.url);
            img.style.width = '200px';
            img.style.boxSizing = 'border-box';
            img.style.padding = '10px 10px 20px 10px';
            div.classList.add('grid-item');
            
            div.appendChild(img);
            grid.appendChild(div);
        })
        console.log(data);
        var msnry = new Masonry( grid, {
          // options
          itemSelector: '.grid-item',
          columnWidth: 200
        });
    }));
})();
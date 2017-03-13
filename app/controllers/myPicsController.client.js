'use strict';

(function() {
    ajaxFunctions.ready(
        
        ajaxFunctions.ajaxRequest('GET', '/get_my_pics', function(data) {
        var all_pics = data;
        console.log(data);
        var grid = document.querySelector('.masonry-grid');
        JSON.parse(data)
            .filter((pic) => { return pic._creator === data.id; })
            .forEach((datum) => {
            var img = document.createElement('img'),
                div = document.createElement('div'),
                img_link = document.createElement('a'),
                remove_link = document.createElement('a');
            img.setAttribute('src', datum.url);
            img.onerror = function(e) {
                console.log(e.target);
                e.target.setAttribute('src', 'http://placehold.it/350x150');
            }
            img_link.appendChild(document.createTextNode(datum.description));
            img_link.setAttribute('href', datum.url);
            remove_link.setAttribute('href', '/remove/' + datum._id);
            remove_link.appendChild(document.createTextNode('Remove'));
            div.classList.add('grid-item');
            
            div.appendChild(img);
            div.appendChild(img_link);
            div.appendChild(remove_link);
            grid.appendChild(div);
        })
        var msnry = new Masonry( grid, {
          // options
          itemSelector: '.grid-item',
          columnWidth: 200
        });
    }));
})();
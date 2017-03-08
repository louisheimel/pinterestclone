'use strict';

(function() {
    ajaxFunctions.ready(
        
        ajaxFunctions.ajaxRequest('GET', '/all_pics', function(data) {
        var grid = document.querySelector('.masonry-grid');
        document.querySelector('body').setAttribute('width', '100%');
        grid.style.margin = '20px';
        JSON.parse(data).forEach((datum) => {
            var img = document.createElement('img'),
                div = document.createElement('div'),
                anchor = document.createElement('a'),
                p = document.createElement('p');
            
            p.appendChild(document.createTextNode(datum.description));
                
            img.setAttribute('src', datum.url);
            img.style.width = '200px';
            img.style.boxSizing = 'border-box';
            img.style.padding = '10px';
            
            anchor.appendChild(document.createTextNode(datum.creator_username));
            anchor.setAttribute('href', '/user/' + datum._creator);
            anchor.style.display = 'block';
            anchor.style.margin = '10px';
            
            p.style.display = 'block'
            p.style.margin = '10px';
            
            div.classList.add('grid-item');
            
            div.appendChild(img);
            // div.appendChild(title);
            div.appendChild(p);
            div.appendChild(anchor);
            
            grid.appendChild(div);
        })
        var msnry = new Masonry( grid, {
          itemSelector: '.grid-item',
          columnWidth: 200
        });
    }));
})();
// 'use strict';

// (function() {

//     ajaxFunctions.ready(
//             // var id = document.querySelector('.id').dataset.id;
//             ajaxFunctions.ajaxRequest('GET', '/all_pics', function(data) {
//                 var id = document.querySelector('.id').dataset.id,
//                 user_data = JSON.parse(data).filter(datum => datum._creator === id);
//             }))
    
// })();

'use strict';

(function() {
    ajaxFunctions.ready(
        
        ajaxFunctions.ajaxRequest('GET', '/all_pics', function(data) {
        var grid = document.querySelector('.masonry-grid');
        document.querySelector('body').setAttribute('width', '100%');
        grid.style.margin = '20px';
        var id = document.querySelector('.id').dataset.id;
        JSON.parse(data).filter(datum => datum._creator === id).forEach(datum => {
            var img = document.createElement('img'),
                div = document.createElement('div'),
                img_link = document.createElement('a');
            
            img_link.appendChild(document.createTextNode(datum.description));
            img_link.setAttribute('href', datum.url)
                
            img.setAttribute('src', datum.url);
            img.onerror = function(e) {
                console.log(e.target);
                e.target.setAttribute('src', 'http://placehold.it/350x150');
            }
            // anchor.appendChild(document.createTextNode(datum.creator_username));
            // anchor.classList.add('user_link');
            // anchor.setAttribute('href', '/user/' + datum._creator);
            
            div.classList.add('grid-item');
            
            div.appendChild(img);
            div.appendChild(img_link);
            // div.appendChild(anchor);
            
            grid.appendChild(div);
        })
        var msnry = new Masonry( grid, {
          itemSelector: '.grid-item',
          columnWidth: 200
        });
    }));
})();
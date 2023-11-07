// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//dropdown menu
let btnQuicklink = document.querySelector('.header--quicklinks .dropdown--toggle');
let contQuicklinks = document.getElementById("quickLinks")
btnQuicklink.addEventListener("click", (event) => {
    event.preventDefault();
    // contQuicklinks.classList.toggle("show");
    if(!contQuicklinks.classList.contains('show')) {
        contQuicklinks.classList.add('show');
        contQuicklinks.style.height = 'auto';

        let height = contQuicklinks.clientHeight + 'px';
        contQuicklinks.style.height = '0px';

        setTimeout(function () {
            contQuicklinks.style.height = height;
        }, 0);
    }else{
        contQuicklinks.style.height = '0px';
        contQuicklinks.addEventListener('transitionend', function(){
            contQuicklinks.classList.remove('show');
        }, {
            once: true
        });
    }
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown .dropdown--toggle')) {
      var dropdowns = document.getElementsByClassName("dropdown--menu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.style.height = '0px';
            openDropdown.addEventListener('transitionend', function(){
                openDropdown.classList.remove('show');
            }, {
                once: true
            });
        }
      }
    }
  }
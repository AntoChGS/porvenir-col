// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//dropdown menu quicklinks
const btnQuicklink = document.querySelector('.header--quicklinks .dropdown--toggle');
const contQuicklinks = document.getElementById("quickLinks");

btnQuicklink.addEventListener("click", (event) => {
    event.preventDefault();
    
    if(!contQuicklinks.classList.contains('show')) {
        
        btnQuicklink.classList.add('open');
        contQuicklinks.classList.add('show');

        contQuicklinks.style.height = 'auto';

        let height = contQuicklinks.clientHeight + 'px';
        contQuicklinks.style.height = '0px';

        document.body.insertAdjacentHTML("beforeend", '<div class="backdrop">&nbsp;</div>');

        setTimeout(function () {
            contQuicklinks.style.height = height;
            
        }, 0);
    }else{
        
        contQuicklinks.style.height = '0px';
        contQuicklinks.addEventListener('transitionend', function(){
            contQuicklinks.classList.remove('show');
            btnQuicklink.classList.remove('open');
            document.querySelector('.backdrop').remove();
        }, {
            once: true
        });
    }
});

if (btnQuicklink.nextElementSibling) {
    const subMenu = btnQuicklink.nextElementSibling
    const subMenuLinks = subMenu.querySelectorAll('a')
    const lastLinkIndex = subMenuLinks.length - 1
    const lastLink = subMenuLinks[lastLinkIndex]

    lastLink.addEventListener('blur', function() {
        btnQuicklink.parentElement.querySelector('.dropdown--toggle').focus();
    })
    
}

const btnNav = document.querySelector('#btnNav');
btnNav.addEventListener("click", (event) => {
    event.preventDefault();
    btnNav.classList.toggle('open');
});

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('.dropdown .dropdown--toggle')) {
//       let dropdowns = document.getElementsByClassName("dropdown--menu");
//       let i;
//       for (i = 0; i < dropdowns.length; i++) {
//         let openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//             openDropdown.style.height = '0px';
//             openDropdown.addEventListener('transitionend', function(){
//                 openDropdown.classList.remove('show');
//                 btnQuicklink.classList.remove('open')
//             }, {
//                 once: true
//             });
//         }
//       }
//     }
//   }





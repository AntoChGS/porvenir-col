// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

if (document.querySelector('.prv-footer .menu-accordion')) {
    let acc = document.querySelectorAll(".prv-footer .menu-accordion .menu-accordion__header");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function (e) {
            e.preventDefault();
            var panel = this.nextElementSibling;
            var coursePanel = document.getElementsByClassName("menu-accordion__collapse");
            var courseAccordionActive = document.getElementsByClassName("menu-accordion__header active");

            if (panel.style.height) {
                panel.style.height = null;
                this.classList.remove("active");
            } else {
                for (var ii = 0; ii < courseAccordionActive.length; ii++) {
                    courseAccordionActive[ii].classList.remove("active");
                }
                for (var iii = 0; iii < coursePanel.length; iii++) {
                    this.classList.remove("active");
                    coursePanel[iii].style.height = null;
                }
                
                panel.style.height = panel.scrollHeight + "px";
                this.classList.add("active");
            }
        }
    }
}
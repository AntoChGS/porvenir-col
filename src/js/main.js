// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//Tabs Interests

if (document.querySelector('.prv-interest-section .prv-nav-tab')) {
    const _tabsInterest1 = document.querySelectorAll('[data-tab-extra]');
    const _contentInterest1 = document.getElementsByClassName('active');

    const toggleContentInterest1 = function () {

        if (!this.classList.contains("active")) {

            Array.from(_contentInterest1).forEach(item1 => {
                item1.classList.remove('active');
            });

            this.classList.add('active');

            let currentTabInterest1 = this.getAttribute('data-tab-extra'),
                _tabContentInterest1 = document.getElementById(currentTabInterest1);
            _tabContentInterest1.classList.add('active');
        }
    };

    Array.from(_tabsInterest1).forEach(item1 => {
        item1.addEventListener('click', toggleContentInterest1);
    });
}

if (document.querySelector('.prv-interest-section .interest__swiper')) {
    var swiper = new Swiper(".interest__swiper .swiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            nextEl: ".interest__swiper .swiper .swiper-button-next",
            prevEl: ".interest__swiper .swiper .swiper-button-prev",
        },
        pagination: {
            el: ".interest__swiper .swiper .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 40,
            },
        },
    });
}

// Footer Menu accordion
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
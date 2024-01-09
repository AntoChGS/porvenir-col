// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//dropdown menu quicklinks
function dropDownQuickLinks() {
  const btnQuicklink = document.querySelector(
    ".header--quicklinks .dropdown--toggle"
  );
  const contQuicklinks = document.getElementById("quickLinks");
  btnQuicklink.addEventListener("click", (event) => {
    if (document.getElementById("mainQuicklinks")) {
      event.preventDefault();
      if (!contQuicklinks.classList.contains("show")) {
        btnQuicklink.classList.add("open");
        contQuicklinks.classList.add("show");
        contQuicklinks.style.height = "auto";
        let height = contQuicklinks.clientHeight + "px";
        contQuicklinks.style.height = "0px";
        document.body.style.overflow = "hidden";
        document.body.insertAdjacentHTML(
          "beforeend",
          '<div class="backdrop">&nbsp;</div>'
        );
        setTimeout(function () {
          contQuicklinks.style.height = height;
        }, 0);
        document
          .querySelector(".header--navigation .navigation--menu")
          .classList.remove("show");
        document
          .querySelector(".header--navigation .navigation--action .btn--menu")
          .classList.remove("open");
        btnQuicklink.focus();
      } else {
        document.body.removeAttribute("style");
        contQuicklinks.style.height = "0px";
        contQuicklinks.addEventListener(
          "transitionend",
          function () {
            contQuicklinks.classList.remove("show");
            btnQuicklink.classList.remove("open");
            document.querySelector(".backdrop").remove();
          },
          {
            once: true,
          }
        );
      }
    }
  });
  //focus next btnclick
  if (btnQuicklink.nextElementSibling) {
    const subMenu = btnQuicklink.nextElementSibling;
    const subMenuLinks = subMenu.querySelectorAll("a");
    const lastLinkIndex = subMenuLinks.length - 1;
    const lastLink = subMenuLinks[lastLinkIndex];
    lastLink.addEventListener("blur", function () {
      if (document.getElementById("mainQuicklinks")) {
        btnQuicklink.parentElement.querySelector(".dropdown--toggle").focus();
      }
    });
  }
}

//Funcion Hamburger Show and Hide Menu Navegación Mobile 
function showMenuHamburguer() {
  const btnNav = document.querySelector("#btnNav");
  const navMain = document.querySelector(".navigation--menu");
  const navigation = document.querySelector(".nav__menu#navigation");
  btnNav.addEventListener("click", (event) => {
    if (document.querySelector(".accordion")) {
      event.preventDefault();
      btnNav.classList.toggle("open");
      navMain.classList.toggle("show");
      if (navMain.classList.contains("show")) {
        document.body.style.overflow = "hidden";
        navMain.insertAdjacentElement("beforeEnd", navigation);
        document.querySelector(".navigation--menu .nav__menu").style.visibility =
          "visible";
        const visibleNav = Array.from(
          document.querySelectorAll(".nav__menu")
        ).filter(
          (s) => window.getComputedStyle(s).getPropertyValue("display") !== "none"
        )[0];
        const visibleNavLinks = Array.from(
          visibleNav.getElementsByTagName("li")
        ).filter(
          (s) => window.getComputedStyle(s).getPropertyValue("display") !== "none"
        );
        // if (visibleNavLinks.length > 0) {
        //   const firstLink = visibleNavLinks[0].querySelector("a");
        //   firstLink.focus();
        // }
      } else {
        document.querySelector(".navigation--menu .nav__menu").style.visibility =
          "hidden";
        document.body.removeAttribute("style");
      }
    }
    navMain.addEventListener("focusout", (e) => {
      if (navMain !== e.target && !navMain.contains(e.relatedTarget)) {
        document.getElementById("btnNav").focus();
      }
    });
  });
  document.querySelectorAll('.menu--list .menu--item').forEach((element) => {
    if (element.childNodes[3]) {
      let childrenMenu = element.children[1].querySelectorAll('.submenu--item');
      childrenMenu.forEach(el => {
        el.querySelector('.sub-link').addEventListener('click', () => {
          document.querySelector('body').removeAttribute('style');
        });
      });
    }
  });
}

//Scroll Header
function scrollFunction() {
  window.onscroll = () => {
    scroll_position = window.scrollY;
    if (scroll_position >= 45) {
      document.querySelector('.pvr__header').classList.add('scroll--head');
    } else {
      document.querySelector('.pvr__header').classList.remove('scroll--head');
    }
  };
}

//accordion tab
function accordionToggle(element) {
  if (document.querySelectorAll(element)) {
    const randomId = function (length = 6) {
      return Math.random().toString(36).substring(2, length + 2);
    };
    let components = document.getElementsByClassName(element);
    if (components) {
      let component;
      for (let a = components.length - 1; a >= 0; a--) {
        component = components[a];
        let tabs = component.getElementsByClassName("accordion__tab");
        let tab;
        for (let b = tabs.length - 1; b >= 0; b--) {
          tab = tabs[b];
          tab.id = "accordionTab" + randomId();
          // tab.setAttribute("aria-expanded", false);
          let button = tab;
          button.addEventListener("click", toggle);
          let panel = tab.nextElementSibling;
          if (panel) {
            panel.id = "accordionPanel" + randomId();
            panel.dataset.height = getHeight(tab, panel);
            // -- Set Initial ARIA
            tab.setAttribute("aria-controls", panel.id);
            // tab.setAttribute("aria-expanded", false);
            panel.setAttribute("aria-labelledby", tab.id);
          }
        }
      }
    }
  }
}
// -- Toggle Panels
function toggle(e) {
  e.preventDefault();
  let component = this.parentNode.parentNode;
  let tab = this;
  let panel = tab.nextElementSibling;
  if (component.dataset.multiselect == "false") {
    let active = component.getElementsByClassName("accordion__tab--active")[0];
    tab.classList.toggle("accordion__tab--active");
    if (active?.nextElementSibling) {
      active.classList.remove("accordion__tab--active");
      active.nextElementSibling.style.height = 0;
      // tab.setAttribute("aria-expanded", "false");
    }
  } else tab.classList.toggle("accordion__tab--active");
  // Set the aria-expanded
  if (tab.classList.contains("accordion__tab--active") && panel) {
    panel.style.height = panel.dataset.height;
    // this.setAttribute("aria-expanded", "true");
  } else if (panel) {
    panel.style.height = 0;
    // this.setAttribute("aria-expanded", "false");
  }
}
// -- Get the natural height of the element
function getHeight(tab, panel) {
  tab.classList.add("accordion__tab--active");
  let height = panel.scrollHeight + "px";
  tab.classList.remove("accordion__tab--active");
  return height;
}

//Swiper Sliders Function
function swiperLoops() {
  let swiperTestimonials, swiperCards, swiperCards01, swiperCards05, swiperCards07;
  // Section Testimonials Carousel
  if (document.querySelector(".testimonials-tpl-swiper")) {
    swiperTestimonials = new Swiper(".testimonials-tpl-swiper .swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".testimonials-tpl-swiper .swiper .swiper-button-next",
        prevEl: ".testimonials-tpl-swiper .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".testimonials-tpl-swiper .swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        },
      },
    });
  }
  // Section Interest Carousel
  if (document.querySelector(".cards-tpl-swiper")) {
    swiperCards = new Swiper(".cards-tpl-swiper .swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".cards-tpl-swiper .swiper .swiper-button-next",
        prevEl: ".cards-tpl-swiper .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".cards-tpl-swiper .swiper .swiper-pagination",
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

  // Section Interest Carousel
  if (document.querySelector(".cards-swiper-01")) {
    const swpCardC01 = document.querySelector(".cards-swiper-01");
    const dataLgCardC01 = swpCardC01.getAttribute("data-slide-lg");
    const dataMdCardC01 = swpCardC01.getAttribute("data-slide-md");
    const dataSmCardC01 = swpCardC01.getAttribute("data-slide-sm");
    const swpCardC01Id = "#" + swpCardC01.id;

    swiperCards01 = new Swiper(swpCardC01Id + " .swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: swpCardC01Id + " .swiper .swiper-button-next",
        prevEl: swpCardC01Id + " .swiper .swiper-button-prev",
      },
      pagination: {
        el: swpCardC01Id + " .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: dataSmCardC01,
          slidesPerGroup: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: dataMdCardC01,
          slidesPerGroup: 2,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: dataLgCardC01,
          slidesPerGroup: 2,
          spaceBetween: 15,
        },
      },
    });
  }

  // Section Carousel Variante 05
  if (document.querySelector(".cards-swiper-05")) {
    swiperCards05 = new Swiper(".cards-swiper-05 .swiper", {
      slidesPerView: 3,
      spaceBetween: 6,
      navigation: {
        nextEl: ".cards-swiper-05 .swiper .swiper-button-next",
        prevEl: ".cards-swiper-05 .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".cards-swiper-05 .swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 14,
        },
      },
    });
  }

  // Section Interest Carousel
  if (document.querySelector(".cards-swiper-07")) {
    swiperCards07 = new Swiper(".cards-swiper-07 .swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".cards-swiper-07 .swiper .swiper-button-next",
        prevEl: ".cards-swiper-07 .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".cards-swiper-07 .swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50,
        },
        1200: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 70,
        },
      },
    });
  }
  //return { swiperTestimonials, swiperCards, swiperCards01 }
}

// Tabs
function tabsSection(element1, element2) {
  const prvTabsId = "#" + element1.id;
  const prvTabsPaneId = element2.getAttribute("data-fragment-namespace");
  const fragmentElement = document.querySelector(prvTabsId);
  const fragmentNamespace = prvTabsPaneId;

  const tabItems = [].slice.call(
    fragmentElement.querySelectorAll(
      '[data-fragment-namespace="' + fragmentNamespace + '"].tab__link'
    )
  );
  const tabPanelItems = [].slice.call(
    fragmentElement.querySelectorAll(
      '[data-fragment-namespace="' + fragmentNamespace + '"].prv-tab-pane'
    )
  );

  function activeTab(item) {
    tabItems.forEach(function (tabItem) {
      tabItem.setAttribute("aria-selected", false);
      tabItem.classList.remove("active");
    });
    item.setAttribute("aria-selected", true);
    item.classList.add("active");
  }

  function activeTabPanel(item) {
    tabPanelItems.forEach(function (tabPanelItem) {
      if (!tabPanelItem.classList.contains("prv-tab-pane--none")) {
        tabPanelItem.classList.add("prv-tab-pane--none");
      }
    });
    item.classList.remove("prv-tab-pane--none");
  }

  function openTabPanel(event, i) {
    const currentTarget = event.currentTarget;
    const target = event.target;

    currentTarget.focus();

    activeTab(currentTarget, i);
    activeTabPanel(tabPanelItems[i]);

    this.tabIndex = i;
  }

  function mainTabs() {
    const initialState = !this.tabIndex || this.tabIndex >= tabItems.length;
    let tabItemSelected = tabItems[0];

    if (initialState) {
      tabItems.forEach(function (item, i) {
        if (!i) {
          activeTab(item);
        }
        item.addEventListener("click", function (event) {
          openTabPanel(event, i);
        });
      });
      tabPanelItems.forEach(function (item, i) {
        if (!i) {
          activeTabPanel(item);
        }
      });
    } else {
      tabItemSelected = tabItems[this.tabIndex];
      tabItems.forEach(function (item, i) {
        activeTab(tabItems[this.tabIndex]);
        item.addEventListener("click", function (event) {
          openTabPanel(event, i);
        });
      });
      tabPanelItems.forEach(function () {
        activeTabPanel(tabPanelItems[this.tabIndex]);
      });
    }
  }
  mainTabs();
}

//Footer Function
function footerAccordion() {
  if (document.querySelector(".prv-footer .menu-accordion")) {
    let acc = document.querySelectorAll(".prv-footer .menu-accordion .menu-accordion__header");
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function (e) {
        e.preventDefault();
        let panel = this.nextElementSibling;
        let coursePanel = document.getElementsByClassName("menu-accordion__collapse");
        let courseAccordionActive = document.getElementsByClassName("menu-accordion__header active");

        if (panel.style.height) {
          panel.style.height = null;
          this.classList.remove("active");
        } else {
          for (const element of courseAccordionActive) {
            element.classList.remove("active");
          }
          for (const element of coursePanel) {
            this.classList.remove("active");
            element.style.height = null;
          }

          panel.style.height = panel.scrollHeight + "px";
          this.classList.add("active");
        }
      };
    }
  }
}

//DataLayer Push
function porvenirDataLayer() {
  //variables dataset
  const dataSet = this.dataset;
  //Variable dataEvent
  const event = dataSet.event ? dataSet.event : "";
  //delete object event
  delete dataSet.event
  //datalayerPush
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event,
    gtm: { ...dataSet, uniqueEventId: 1 }
  });
}

//Window Resize
function widthChangeCallback() {
  const navigation = document.querySelector(".nav__menu#navigation");
  const search = document.querySelector(".navigation--search");
  if (window.innerWidth > 768) {
    document.querySelector(".header--quicklinks").removeAttribute("id");
    document
      .querySelector(".navigation .navigation--desktop")
      .insertAdjacentElement("beforeEnd", navigation);
    document
      .querySelector(".navigation .navigation--login")
      .insertAdjacentElement("beforebegin", search);
  } else {
    document
      .querySelector(".header--quicklinks")
      .setAttribute("id", "mainQuicklinks");
  }
  if (window.innerWidth < 992) {
    document.querySelector(".nav__menu").classList.remove("nav__accessible");
    document.querySelector(".navigation--menu").insertAdjacentElement("beforeEnd", navigation);
    document.querySelector(".nav__menu .menu--list").classList.add("accordion");
    if (document.querySelector(".nav__menu .menu--list").classList.contains('accordion')) {
      document.querySelectorAll(".menu--list .has__child").forEach((element) => {
        element.querySelector('.link').classList.add('accordion__tab');
        element.querySelector('.submenu--list').classList.add('accordion__panel');
      });
      accordionToggle('accordion');
    }
  } else {
    document.querySelector(".nav__menu").classList.add("nav__accessible");
    document.querySelector(".nav__menu").classList.remove("accordion");
    document.querySelector(".navigation--menu").classList.remove("show");
    document.querySelector(".navigation--action .btn--menu").classList.remove("open");
    document.querySelector(".nav__menu").removeAttribute("style");
    document.querySelector(".nav__menu .menu--list").classList.remove("accordion");
    if (!document.querySelector(".nav__menu .menu--list").classList.contains('accordion')) {
      document.querySelectorAll(".menu--list .has__child").forEach((element) => {
        element.querySelector('.link').classList.remove('accordion__tab');
        element.querySelector('.submenu--list').classList.remove('accordion__panel');
        element.querySelector('.link').removeAttribute('id');
        element.querySelector('.link').removeAttribute('aria-controls');
        element.querySelector('.submenu--list').removeAttribute('id');
        element.querySelector('.submenu--list').removeAttribute('aria-labelledby');
        element.querySelector('.submenu--list').removeAttribute('style');
        element.querySelector('.submenu--list').removeAttribute('data-height');
      });
    }
  }
}

function directAccess() {
  if (document.querySelector(".prv__certificados")) {
    let certificados__items = document.querySelectorAll(".prv__certificados--item");
    let boton_vermas = document.querySelector(".prv__certificados--view-all .btn-view-all");
    if (certificados__items.length <= 4) {
      boton_vermas.style.display = "none";
    }
    if (certificados__items.length > 4) {
      certificados__items.forEach((elem, i) => {
        if (i > 3) {
          certificados__items[i].classList.add("item-disabled");
        }
      });
    }
    boton_vermas.addEventListener("click", (e) => {
      e.preventDefault();
      if (boton_vermas.classList.contains("active")) {
        boton_vermas.classList.remove("active");
        certificados__items.forEach((elem, i) => {
          if (i > 3) {
            boton_vermas.textContent = "Ver más";
            certificados__items[i].classList.add("item-disabled");
          }
        });

        boton_vermas.blur();
        setTimeout(function () {
          certificados__items[0]
            .querySelector(".prv__certificados--link")
            .focus();
        }, 50);
      } else {
        boton_vermas.classList.add("active");
        certificados__items.forEach((elem, i) => {
          boton_vermas.textContent = "Ver menos";
          certificados__items[i].classList.remove("item-disabled");
        });

        boton_vermas.blur();
        setTimeout(function () {
          certificados__items[4]
            .querySelector(".prv__certificados--item--link")
            .focus();
        }, 50);
      }
    });
  }
}


//function resize
window.addEventListener("resize", widthChangeCallback);
widthChangeCallback();

//function accordion toggle
accordionToggle('accordion');

//dropdown menu quicklinks
dropDownQuickLinks();

//function header mobile
showMenuHamburguer();

//scroll function
scrollFunction();

// function swiper sliders
swiperLoops();

// invoke function DataLayer
const elemDataLayer = document.querySelectorAll('*[class^="datalayer"]');
if (elemDataLayer) {
  elemDataLayer.forEach(element => {
    element.addEventListener('click', porvenirDataLayer);
  });
}

// More View Direct Access
directAccess();

// Tabs Section
if (document.querySelector(".prv-tabs-container")) {
  let prvTabs = document.querySelector(".prv-tabs-container");
  let prvTabsPane = document.querySelector(".prv-tabs-container .prv-tab-pane");
  tabsSection(prvTabs, prvTabsPane);
}

// Footer Menu accordion
footerAccordion();
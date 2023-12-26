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
    if (document.querySelector(".nav__accordion")) {
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
  if (this.parentNode.classList.contains('has__child')) {
    e.preventDefault();
    let component = this.parentNode.parentNode;
    let tab = this;
    let panel = tab.nextElementSibling;
    if (component.dataset.multiselect == "false") {
      let active = component.getElementsByClassName(
        "accordion__tab--active"
      )[0];
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
  let swiperTestimonials, swiperCards;
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
  return { swiperTestimonials, swiperCards }
}

// Tabs
if (document.querySelector("#fragment-2-aywy")) {
  var fragmentElement = document.querySelector("#fragment-2-aywy");
  var fragmentNamespace = "aywy";

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
    document.querySelector(".nav__menu").classList.add("nav__accordion");
    if (document.querySelector(".nav__menu .menu--list .menu--item").classList.contains('has__child')) {
      document.querySelector(".nav__menu .menu--list").classList.add("accordion");
      if (document.querySelector(".nav__menu .menu--list").classList.contains('accordion')) {
        document.querySelector(".nav__menu .menu--list .menu--item .link").classList.add('accordion__tab');
        document.querySelector(".nav__menu .menu--list .menu--item .submenu--list").classList.add('accordion__panel');
        accordionToggle('accordion');
      }
    }
  } else {
    document.querySelector(".nav__menu").classList.add("nav__accessible");
    document.querySelector(".nav__menu").classList.remove("nav__accordion");
    document.querySelector(".navigation--menu").classList.remove("show");
    document.querySelector(".navigation--action .btn--menu").classList.remove("open");
    document.querySelector(".nav__menu").removeAttribute("style");
    if (document.querySelector(".nav__menu .menu--list .menu--item").classList.contains('has__child')) {
      document.querySelector(".nav__menu .menu--list").classList.remove("accordion");
      document.querySelector(".nav__menu .menu--list .menu--item .link").classList.remove('accordion__tab');
      document.querySelector(".nav__menu .menu--list .menu--item .submenu--list").classList.remove('accordion__panel');
    }
  }
}

function directAccess() {
  if (document.querySelector(".prv-direct-access-tpl")) {
    let certificados__items = document.querySelectorAll(".direct-access-tpl--item");
    let boton_vermas = document.querySelector(".direct-access-tpl--view-all .btn-view-all");
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
            .querySelector(".direct-access-tpl--link")
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
            .querySelector(".direct-access-tpl--link")
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
mainTabs();

// Footer Menu accordion
footerAccordion();
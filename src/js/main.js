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
          .querySelector(".header--navigation .navigation--column-3 .btn--menu")
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
        document.querySelector(
          ".navigation--menu .nav__menu"
        ).style.visibility = "visible";
        const visibleNav = Array.from(
          document.querySelectorAll(".nav__menu")
        ).filter(
          (s) =>
            window.getComputedStyle(s).getPropertyValue("display") !== "none"
        )[0];
        const visibleNavLinks = Array.from(
          visibleNav.getElementsByTagName("li")
        ).filter(
          (s) =>
            window.getComputedStyle(s).getPropertyValue("display") !== "none"
        );
        // if (visibleNavLinks.length > 0) {
        //   const firstLink = visibleNavLinks[0].querySelector("a");
        //   firstLink.focus();
        // }
      } else {
        document.querySelector(
          ".navigation--menu .nav__menu"
        ).style.visibility = "hidden";
        document.body.removeAttribute("style");
      }
    }
    navMain.addEventListener("focusout", (e) => {
      if (navMain !== e.target && !navMain.contains(e.relatedTarget)) {
        document.getElementById("btnNav").focus();
      }
    });
  });
  document.querySelectorAll(".menu--list .menu--item").forEach((element) => {
    if (element.childNodes[3]) {
      let childrenMenu = element.children[1].querySelectorAll(".submenu--item");
      childrenMenu.forEach((el) => {
        el.querySelector(".sub-link").addEventListener("click", () => {
          document.querySelector("body").removeAttribute("style");
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
      document.querySelector(".pvr__header").classList.add("scroll--head");
    } else {
      document.querySelector(".pvr__header").classList.remove("scroll--head");
    }
  };
}

//accordion tab
function accordionToggle(element) {
  if (document.querySelectorAll(element)) {
    const randomId = function (length = 6) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
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
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
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
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  }

  // Section Card Carousel 01
  if (document.querySelector(".cards-swiper-01")) {
    const buildSwpCardC01 = (swpCardC01) => {
      const swpCardC01Id = "#" + swpCardC01.id;
      const dataXsCardC01 = swpCardC01.getAttribute("data-slide-xs");
      const dataSmCardC01 = swpCardC01.getAttribute("data-slide-sm");
      const dataMdCardC01 = swpCardC01.getAttribute("data-slide-md");
      const dataLgCardC01 = swpCardC01.getAttribute("data-slide-lg");

      return new Swiper(swpCardC01Id + " .swiper", {
        slidesPerView: dataXsCardC01,
        spaceBetween: 5,
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
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: dataMdCardC01,
            spaceBetween: 5,
          },
          1200: {
            slidesPerView: dataLgCardC01,
            spaceBetween: 5,
          },
        },
      });
    };

    const allSlidersCardC01 = document.querySelectorAll(".cards-swiper-01");

    allSlidersCardC01.forEach((sliderCardC01) =>
      buildSwpCardC01(sliderCardC01)
    );
  }

  // Section Card Carousel 05
  if (document.querySelector(".cards-swiper-05")) {
    const buildSwpCardC05 = (swpCardC05) => {
      const swpCardC05Id = "#" + swpCardC05.id;
      const dataXsCardC05 = swpCardC05.getAttribute("data-slide-xs");
      const dataSmCardC05 = swpCardC05.getAttribute("data-slide-sm");
      const dataMdCardC05 = swpCardC05.getAttribute("data-slide-md");
      const dataLgCardC05 = swpCardC05.getAttribute("data-slide-lg");

      return new Swiper(swpCardC05Id + " .swiper", {
        slidesPerView: dataXsCardC05,
        spaceBetween: 0,
        navigation: {
          nextEl: swpCardC05Id + " .swiper .swiper-button-next",
          prevEl: swpCardC05Id + " .swiper .swiper-button-prev",
        },
        pagination: {
          el: swpCardC05Id + " .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: dataSmCardC05,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: dataMdCardC05,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: dataLgCardC05,
            spaceBetween: 10,
          },
        },
      });
    };

    const allSlidersCardC05 = document.querySelectorAll(".cards-swiper-05");

    allSlidersCardC05.forEach((sliderCardC05) =>
      buildSwpCardC05(sliderCardC05)
    );
  }

  // Section Card Carousel 07
  if (document.querySelector(".cards-swiper-07")) {
    const buildSwpCardC07 = (swpCardC07) => {
      const swpCardC07Id = "#" + swpCardC07.id;
      const dataXsCardC07 = swpCardC07.getAttribute("data-slide-xs");
      const dataSmCardC07 = swpCardC07.getAttribute("data-slide-sm");
      const dataMdCardC07 = swpCardC07.getAttribute("data-slide-md");
      const dataLgCardC07 = swpCardC07.getAttribute("data-slide-lg");

      return new Swiper(swpCardC07Id + " .swiper", {
        slidesPerView: dataXsCardC07,
        spaceBetween: 15,
        navigation: {
          nextEl: swpCardC07Id + " .swiper .swiper-button-next",
          prevEl: swpCardC07Id + " .swiper .swiper-button-prev",
        },
        pagination: {
          el: swpCardC07Id + " .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: dataSmCardC07,
            slidesPerGroup: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: dataMdCardC07,
            slidesPerGroup: 2,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: dataLgCardC07,
            slidesPerGroup: 2,
            spaceBetween: 15,
          },
        },
      });
    };

    const allSlidersCardC07 = document.querySelectorAll(".cards-swiper-07");

    allSlidersCardC07.forEach((sliderCardC07) =>
      buildSwpCardC07(sliderCardC07)
    );
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
    let acc = document.querySelectorAll(
      ".prv-footer .menu-accordion .menu-accordion__header"
    );
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function (e) {
        e.preventDefault();
        let panel = this.nextElementSibling;
        let coursePanel = document.getElementsByClassName(
          "menu-accordion__collapse"
        );
        let courseAccordionActive = document.getElementsByClassName(
          "menu-accordion__header active"
        );

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
  delete dataSet.event;
  //datalayerPush
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event,
    gtm: { ...dataSet, uniqueEventId: 1 },
  });
}

//Window Resize
function widthChangeCallback() {
  const navigation = document.querySelector(".nav__menu#navigation");
  const search = document.querySelector(".navigation--search");
  if (window.innerWidth > 768) {
    document.querySelector(".header--quicklinks").removeAttribute("id");
    document
      .querySelector(".navigation .navigation--column-1")
      .insertAdjacentElement("beforeEnd", navigation);
  } else {
    document
      .querySelector(".header--quicklinks")
      .setAttribute("id", "mainQuicklinks");
  }
  if (window.innerWidth < 992) {
    document.querySelector(".nav__menu").classList.remove("nav__accessible");
    document
      .querySelector(".navigation--menu")
      .insertAdjacentElement("beforeEnd", navigation);
    document.querySelector(".nav__menu .menu--list").classList.add("accordion");
    if (
      document
        .querySelector(".nav__menu .menu--list")
        .classList.contains("accordion")
    ) {
      document
        .querySelectorAll(".menu--list .has__child")
        .forEach((element) => {
          element.querySelector(".link").classList.add("accordion__tab");
          element
            .querySelector(".submenu--list")
            .classList.add("accordion__panel");
        });
      accordionToggle("accordion");
    }
  } else {
    document.querySelector(".nav__menu").classList.add("nav__accessible");
    document.querySelector(".nav__menu").classList.remove("accordion");
    document.querySelector(".navigation--menu").classList.remove("show");
    document
      .querySelector(".navigation--column-3 .btn--menu")
      .classList.remove("open");
    document.querySelector(".nav__menu").removeAttribute("style");
    document
      .querySelector(".nav__menu .menu--list")
      .classList.remove("accordion");
    if (
      !document
        .querySelector(".nav__menu .menu--list")
        .classList.contains("accordion")
    ) {
      document
        .querySelectorAll(".menu--list .has__child")
        .forEach((element) => {
          element.querySelector(".link").classList.remove("accordion__tab");
          element
            .querySelector(".submenu--list")
            .classList.remove("accordion__panel");
          element.querySelector(".link").removeAttribute("id");
          element.querySelector(".link").removeAttribute("aria-controls");
          element.querySelector(".submenu--list").removeAttribute("id");
          element
            .querySelector(".submenu--list")
            .removeAttribute("aria-labelledby");
          element.querySelector(".submenu--list").removeAttribute("style");
          element
            .querySelector(".submenu--list")
            .removeAttribute("data-height");
        });
    }
  }
}

function directAccess() {
  if (document.querySelector(".prv__certificados")) {
    let certificados__items = document.querySelectorAll(
      ".prv__certificados--item"
    );
    let boton_vermas = document.querySelector(
      ".prv__certificados--view-all .btn-view-all"
    );
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

function listVariante1VerMas() {
  if (document.querySelector(".pvr__afiliarte")) {
    let certificados__items = document.querySelectorAll(
      ".pvr__afiliarte--item"
    );
    let boton_vermas = document.querySelector(
      ".pvr__afiliarte--view-all .btn-view-all"
    );
    if (certificados__items.length <= 3) {
      boton_vermas.style.display = "none";
    }
    if (certificados__items.length > 3) {
      certificados__items.forEach((elem, i) => {
        if (i > 2) {
          certificados__items[i].classList.add("item-disabled");
        }
      });
    }
    boton_vermas.addEventListener("click", (e) => {
      e.preventDefault();
      if (boton_vermas.classList.contains("active")) {
        boton_vermas.classList.remove("active");
        certificados__items.forEach((elem, i) => {
          if (i > 2) {
            boton_vermas.textContent = "Ver más";
            certificados__items[i].classList.add("item-disabled");
          }
        });
      } else {
        boton_vermas.classList.add("active");
        certificados__items.forEach((elem, i) => {
          boton_vermas.textContent = "Ver menos";
          certificados__items[i].classList.remove("item-disabled");
        });
      }
    });
  }
}

//funcion para obtener posicion de elementos
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
//funcion ancla hub navegacion
function scrollSpy() {
  let anchors = document.querySelectorAll(".pvr__hub-navigation .link");
  let headH = document.querySelector(".pvr__header").offsetHeight;
  anchors.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      let currentEl = this.getAttribute("href");
      let sectionId = document.querySelector(currentEl);
      anchors.forEach(function (ele) {
        ele.classList.remove("active");
      });
      this.classList.add("active");
      window.scrollTo({
        top: getOffset(sectionId).top - headH,
        behavior: "smooth",
      });
    });
  });
}

function inputSearchFocus(el){
  let parentEl = el.parentNode;
  parentEl.querySelector('.search__btn').classList.add('d-sm-none');
  parentEl.querySelector('.clear__btn').classList.add('visible');
}

function inputSearchBlur(el){
  let parentEl = el.parentNode;
  setTimeout(function(){
    parentEl.querySelector('.search__btn').classList.remove('d-sm-none');
    parentEl.querySelector('.clear__btn').classList.remove('visible');
  },200);
}

function searchMobile(){
  let btnSearchMob = document.querySelector('#btnSearch');
  btnSearchMob.addEventListener('click', function(e){
    document.querySelector('.navigation--search').classList.add('show');
    document.body.style.overflow = "hidden";
  });
}

function clearBtnSearch(btnEle){
  let parentEl = btnEle.parentNode;
  parentEl.querySelector('.search__input').value = '';
}

function closeSearchBar(){
  let btnCloseMob = document.querySelector('#closeSearch');
  let inputSearch = document.querySelector('#search');
  btnCloseMob.addEventListener('click', function(e){
    document.querySelector('.navigation--search').classList.remove('show');    
    document.body.removeAttribute("style");
    inputSearch.value = '';
  });
}

function openModal() {
  modal.classList.add('visible');
}

function closeModal() {
  modal.classList.remove('visible');
}

//request Json
function getJson(rqUrlJson, loadFunction){
  const requestUrl = rqUrlJson;
  const request = new XMLHttpRequest();
  request.open("GET", requestUrl);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const rqObject = request.response;
    loadFunction(rqObject);
  }
}

function loadOffices(jsonObj){
  //variables Generales
  const cities = jsonObj['ciudades'];
  const selectCity = document.getElementById('selectCity');
  const listCities = selectCity.querySelector('.select--dropdown');
  const selectTown = document.getElementById('selectTown');
  const listTowns = selectTown? selectTown.querySelector('.select--dropdown') : "";
  const resultContent = document.querySelector('.pvr__offices .results');
  let getHeightResultC = resultContent.offsetHeight;

  //variables resultado
  let conResult = document.querySelector('.pvr__offices .result__row');
  let dataCities = cities.sort((a, b) => {
    if (a.nombre < b.nombre) {
      return -1;
    }
  });

  //swiper paginator
  const swiperOffices = new Swiper(".pvr__offices .result__swiper", {
    slidesPerView: 1,
    grid: {
      rows: 2
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  //reinicia valores del swiper
  function reloadSwiper(){
    swiperOffices.update();
    swiperOffices.updateSize();
    swiperOffices.updateSlides();
    swiperOffices.updateProgress();
    swiperOffices.updateSlidesClasses();
  }
  
  //carga de ciudades
  for(let i = 0; i < dataCities.length; i++){
    let innerObject = dataCities[i];
    let id = innerObject.id;
    let city = innerObject.nombre;
    listCities.innerHTML += `
      <li class="select--item">
        <input type="radio" id="${id}" name="city" value="${city}">
        <label for="${id}">${city}</label>
      </li>    
    `;
  }

  //cargar ciudad y localidad por defecto  
  const checkFirstEl = listCities.querySelector(".select--item #C001");
  checkFirstEl.checked = true;
  if(checkFirstEl.checked == true){
    selectCity.querySelector('.select--value').textContent = checkFirstEl.value;
    let getCheckFirstEl = checkFirstEl.getAttribute('id');
    for(let i = 0; i < cities.length; i++){
      let innerObject = cities[i];
      if(innerObject.id == getCheckFirstEl){
        let locations = innerObject.locaciones;      
        if(locations.length > 1){
          resultContent.style.height = getHeightResultC+'px';
          selectTown ? selectTown.querySelector('.select--button').removeAttribute('disabled') : "";
          conResult.innerHTML = '';
          for(let j = 0; j < locations.length; j++){
            let location = locations[j];
            listTowns.innerHTML += `
              <li class="select--item">
                <input type="radio" id="${location.id}" name="town" value="${location.locacion}">
                <label for="${location.id}">${location.locacion}</label>
              </li> 
            `;
            for (let x = 0; x < location.oficinas.length; x++) {
              let oficina = location.oficinas[x];    
              conResult.innerHTML += `
                <div class="result__column swiper-slide">
                  <div class="result__box"> 
                    <div class="content">
                      <span class="icon">
                        <svg><use xlink:href="images/icons/icons.svg#icon-location"></use></svg>
                      </span>
                      <div class="description"> 
                        <span class="name">${oficina.oficina}</span>
                        <span class="address">${oficina.direccion}</span>
                        <span class="journal">${oficina.horario} ${oficina.jornada}</span>
                      </div>
                    </div>
                    <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${oficina.direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                  </div>
                </div>
              `;
            }
          }
        }else{
          resultContent.style.height = "auto";
          let local = innerObject.locaciones[0];                    
          conResult.innerHTML = '';
          selectTown ? selectTown.querySelector('.select--button').removeAttribute('disabled') : "";
          listTowns.innerHTML += `
            <li class="select--item">
              <input type="radio" id="${local.id}" name="town" value="${local.locacion}" checked="true">
              <label for="${local.id}">${local.locacion}</label>
            </li> 
          `;
          let oneTown = selectTown ? listTowns.querySelector(".select--item #T001") : "";     
          selectTown ? selectTown.querySelector('.select--value').textContent = oneTown.value : "";
          let informacion = local.oficinas;
          if(informacion){
            for (let i = 0; i < informacion.length; i++) {
              conResult.innerHTML += `
                <div class="result__column swiper-slide"> 
                  <div class="result__box">
                    <div class="content"> <span class="icon">
                            <svg>
                                <use xlink:href="images/icons/icons.svg#icon-location"></use>
                            </svg></span>
                        <div class="description"> 
                          <span class="name">${informacion[i].oficina}</span>
                          <span class="address">${informacion[i].direccion}</span>
                          <span class="journal">${informacion[i].horario} ${informacion[i].jornada}</span></div>
                    </div>
                    <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${informacion[i].direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                  </div>     
                </div>          
              `              
            }
          }else{
            resultContent.style.height = "auto";
            document.querySelector('.results .title--result').textContent = 'Para la búsqueda que estás realizando no se encontraron resultados';
          }
        }
      }
    }

    //ciudad por defecto seleccionar localidad / comuna 
    if(selectTown){
      let locacion = listTowns.querySelectorAll('input[type=radio]');
      resultContent.style.height = getHeightResultC+'px';
      locacion.forEach(function(el){
        el.addEventListener('change', function(e){
          let idLocal = e.target.id;
          conResult.innerHTML = "";
          for (let i = 0; i < cities.length; i++){
            let innerObject = cities[i];
            if(innerObject.id == checkFirstEl.getAttribute('id')){
              let locations = innerObject.locaciones; 
              for (let j = 0; j < locations.length; j++) {
                let location = locations[j];
                if(location.id == idLocal){
                  let officess = location.oficinas;
                  for (let k = 0; k < officess.length; k++) {
                    officess.length > 1 ? resultContent.style.height = getHeightResultC+'px' : resultContent.style.height = "auto";
                    const office = officess[k];
                    conResult.innerHTML += `
                    <div class="result__column swiper-slide">
                      <div class="result__box"> 
                        <div class="content">
                          <span class="icon">
                            <svg><use xlink:href="images/icons/icons.svg#icon-location"></use></svg>
                          </span>
                          <div class="description"> 
                            <span class="name">${office.oficina}</span>
                            <span class="address">${office.direccion}</span>
                            <span class="journal">${office.horario} ${office.jornada}</span>
                          </div>
                        </div>
                        <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${office.direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                      </div>
                    </div>
                  `;
                  }
                }
              }
            }
          }
          reloadSwiper();
        });
      });
    }
    reloadSwiper();
  }

  //capturar cambio de valor
  let inputRadioCity = selectCity.querySelectorAll('.select--dropdown input[type=radio]');
  let idSelectCity = '';
  inputRadioCity.forEach(function(el){
    el.addEventListener('change', function(e){
      idSelectCity = e.target.id;
      selectTown ? selectTown.querySelector('.select--value').textContent = 'Seleccionar' : "";
      selectTown ? selectTown.querySelector('.select--button').setAttribute('disabled', true) : "";      
      listTowns.innerHTML = `
        <li class="select--item disabled">
          <input type="radio" id="" name="offices" value="">
          <label for="">Seleccionar</label>
        </li>  
      `;
      for(let i = 0; i < cities.length; i++){
        let innerObject = cities[i];
        if(innerObject.id == idSelectCity){
          let locations = innerObject.locaciones;
          if(locations.length > 1){
            resultContent.style.height = getHeightResultC+'px';
            selectTown ? selectTown.querySelector('.select--button').removeAttribute('disabled') : "";
            conResult.innerHTML = '';
            for(let j = 0; j < locations.length; j++){
              let location = locations[j];
              listTowns.innerHTML += `
                <li class="select--item">
                  <input type="radio" id="${location.id}" name="town" value="${location.locacion}">
                  <label for="${location.id}">${location.locacion}</label>
                </li>
              `;
              document.querySelector('.pvr__offices .results .title--result').textContent = 'Nuestra oficina más cercana a ti';
              for (let x = 0; x < location.oficinas.length; x++) {
                let oficina = location.oficinas[x];
                conResult.innerHTML += `
                  <div class="result__column swiper-slide"> 
                    <div class="result__box"> 
                      <div class="content"> <span class="icon">
                              <svg>
                                  <use xlink:href="images/icons/icons.svg#icon-location"></use>
                              </svg></span>
                          <div class="description"> 
                            <span class="name">${oficina.oficina}</span>
                            <span class="address">${oficina.direccion}</span>
                            <span class="journal">${oficina.horario} ${oficina.jornada}</span></div>
                      </div>
                      <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${oficina.direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                    </div>   
                  </div>           
                `;
              }
            }
          }else{
            resultContent.style.height = "auto";         
            let ciudad = innerObject.locaciones[0];    
            conResult.innerHTML = '';
            selectTown ? selectTown.querySelector('.select--button').removeAttribute('disabled') : "";
            listTowns.innerHTML += `
              <li class="select--item">
                <input type="radio" id="${ciudad.id}" name="town" value="${ciudad.locacion}" checked="true">
                <label for="${ciudad.id}">${ciudad.locacion}</label>
              </li> 
            `;
            let oneTown = selectTown ? listTowns.querySelector(".select--item #T001") : ""; 
            selectTown ? selectTown.querySelector('.select--value').textContent = oneTown.value : "";
            let informacion = ciudad.oficinas;
            if(informacion){
              for (let i = 0; i < informacion.length; i++) {
                conResult.innerHTML += `
                  <div class="result__column swiper-slide"> 
                    <div class="result__box"> 
                      <div class="content"> <span class="icon">
                              <svg>
                                  <use xlink:href="images/icons/icons.svg#icon-location"></use>
                              </svg></span>
                          <div class="description"> 
                            <span class="name">${informacion[i].oficina}</span>
                            <span class="address">${informacion[i].direccion}</span>
                            <span class="journal">${informacion[i].horario} ${informacion[i].jornada}</span></div>
                      </div>
                      <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${informacion[i].direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                    </div> 
                  </div>             
                `              
              }
            }else{
              document.querySelector('.results .title--result').textContent = 'Para la búsqueda que estás realizando no se encontraron resultados';
            }
          }
        }
      }
      //seleccionar localidad / comuna
      if(selectTown){
        let locacion = selectTown ? listTowns.querySelectorAll('input[type=radio]') : "";
        if(locacion.length > 2){
          resultContent.style.height = getHeightResultC+'px';
          locacion.forEach(function(el){
            el.addEventListener('change', function(e){
              let idLocal = e.target.id;
              conResult.innerHTML = "";
              for (let i = 0; i < cities.length; i++){
                let innerObject = cities[i];
                if(innerObject.id == idSelectCity){
                  let locations = innerObject.locaciones; 
                  for (let j = 0; j < locations.length; j++) {
                    let location = locations[j];
                    if(location.id == idLocal){
                      let officess = location.oficinas;
                      for (let k = 0; k < officess.length; k++) {
                        officess.length > 1 ? resultContent.style.height = getHeightResultC+'px' : resultContent.style.height = "auto";
                        const office = officess[k];
                        conResult.innerHTML += `
                        <div class="result__column swiper-slide">
                          <div class="result__box"> 
                            <div class="content">
                              <span class="icon">
                                <svg><use xlink:href="images/icons/icons.svg#icon-location"></use></svg>
                              </span>
                              <div class="description"> 
                                <span class="name">${office.oficina}</span>
                                <span class="address">${office.direccion}</span>
                                <span class="journal">${office.horario} ${office.jornada}</span>
                              </div>
                            </div>
                            <div class="footer"> <a class="link" href="https://www.google.com/maps/place/${office.direccion},+Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer">Cómo llegar                             </a></div>
                          </div>
                        </div>
                      `;
                      }
                    }
                  }
                }
              }
              reloadSwiper();
            });
          });
        }
      }
      reloadSwiper();
    });
  });
}

function loadTransact(jsonObj){
  
  const getProducts = jsonObj['productos'] ? jsonObj['productos'] : '';
  const getServices = jsonObj['servicios'] ? jsonObj['servicios'] : '';

  const selectProduct = document.getElementById('selectProduct');
  const listProduct = selectProduct.querySelector('.select--dropdown');
  const selectService = document.getElementById('selectService');
  const listService = selectService.querySelector('.select--dropdown');

  //variables resultado
  const conResult = document.querySelector('.pvr__transact .results');

  //carga de productos
  for(let i = 0; i < getProducts.length; i++){
    let innerObject = getProducts[i];
    let id = innerObject.id;
    let product = innerObject.nombre;
    listProduct.innerHTML += `
      <li class="select--item">
        <input type="radio" id="${id}" name="product" value="${product}">
        <label for="${id}">${product}</label>
      </li>    
    `;
  }

  //capturar cambio de valor
  const inputRadioProd = selectProduct.querySelectorAll('.select--dropdown input[type=radio]');

  inputRadioProd.forEach(function(el){
    el.addEventListener('change', function(e){
      let arrayServices = [];
      let idSelectProduct = e.target.id;
      selectService.querySelector('.select--value').textContent = 'Seleccionar';
      selectService.querySelector('.select--button').setAttribute('disabled', true);
      listService.innerHTML = `
        <li class="select--item disabled">
          <input type="radio" id="" name="services" value="">
          <label for="">Seleccionar</label>
        </li>  
      `;      
      for (let i = 0; i < getServices.length; i++) {
        const services = getServices[i];
        const servicesParent = services.parent;
        for (let j = 0; j < servicesParent.length; j++) {      
          if(servicesParent.indexOf(idSelectProduct) !== -1){
            arrayServices.push(services);
            break;
          }
        }
      }
      let ServiForProd = arrayServices;       
      for (let x = 0; x < ServiForProd.length; x++) {
        selectService.querySelector('.select--button').removeAttribute('disabled');
        const service = ServiForProd[x];
        listService.innerHTML += `
          <li class="select--item">
            <input type="radio" id="${service.id}" name="services" value="${service.nombre}">
            <label for="${service.id}">${service.nombre}</label>
          </li>
        `;
      }
      
      const inputRadioServ = selectService.querySelectorAll('.select--dropdown input[type=radio]');
      inputRadioServ.forEach(function(el){
        el.addEventListener('change', function(e){
          conResult.style.display = "block";
          const idService = e.target.id;
          const itemResult = conResult.querySelectorAll('.result__row .result__column');
          for (let i = 0; i < itemResult.length; i++) {
            let columnElement = itemResult[i];     
            columnElement.classList.remove('show'); 
            if(columnElement.hasAttribute('data-'+idService)){
              columnElement.classList.add('show');
            }
          }
        });
      });
    });
  });
}

//Select function
function selectCustom(ele){
  let customSelect = ele.parentNode;
  let optionsList = customSelect.querySelectorAll(".select--dropdown li");
  let selectedValue = customSelect.querySelector(".select--value");
  if(!customSelect.classList.contains("active")){
    document.querySelectorAll('.pvr__select').forEach(function (ele) {
      ele.classList.remove("active");
    });
    customSelect.classList.add('active');
  }else if(customSelect.classList.contains("active")){
    customSelect.classList.remove('active');
  }
  ele.setAttribute(
    "aria-expanded",
    ele.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );

  //lista opciones
  optionsList.forEach((option) => {
    function handler(e) {
      // Click Events
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        selectedValue.textContent = this.children[1].textContent;
        customSelect.classList.remove("active");
      }
      // Key Events
      if (e.key === "Enter") {
        selectedValue.textContent = this.textContent;
        customSelect.classList.remove("active");
      }
    }  
    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
  });
}

//function resize
window.addEventListener("resize", widthChangeCallback);
widthChangeCallback();

//function accordion toggle
accordionToggle("accordion");

//dropdown menu quicklinks
dropDownQuickLinks();

//function header mobile
showMenuHamburguer();

//scroll function
scrollFunction();

//funcion ancla hub navegacion
scrollSpy();

//function swiper sliders
swiperLoops();

//Validation and Function search 
if(document.getElementById('navigation')){
  let inputSearchNav = document.querySelector('.search__input');
  inputSearchNav.addEventListener('focus', function(){
    document.querySelector('.nav__menu .menu--list').classList.add('search__focus');
  });
  window.onclick = function(event) {
    if (event.target != inputSearchNav){
      document.querySelector('.nav__menu .menu--list').classList.remove('search__focus');
    }
  }
}
searchMobile();
closeSearchBar();

//modal function
const openModalButtons = document.querySelectorAll('.open-modal'),
      modal = document.querySelector('.pvr__modal'),
      closeModalButtons = document.querySelectorAll('.close-modal');

openModalButtons.forEach(openBtn => {
  openBtn.addEventListener('click', openModal)
});

closeModalButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', closeModal)
});

// invoke function DataLayer
const elemDataLayer = document.querySelectorAll('*[class^="datalayer"]');
if (elemDataLayer) {
  elemDataLayer.forEach((element) => {
    element.addEventListener("click", porvenirDataLayer);
  });
}

// More View Direct Access
directAccess();
listVariante1VerMas();

// Tabs Section
if (document.querySelector(".tab__carousel-container")) {
  let prvTabs = document.querySelector(".tab__carousel-container");
  let prvTabsPane = document.querySelector(
    ".tab__carousel-container .prv-tab-pane"
  );
  tabsSection(prvTabs, prvTabsPane);
}

// Json function
getJson('http://localhost:3000/js/offices.json', loadOffices);
getJson('http://localhost:3000/js/products.json', loadTransact);
getJson('http://localhost:3000/js/services.json', loadTransact);

// Footer Menu accordion
footerAccordion();

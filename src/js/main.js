// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

// accesibilidad
var components = document.getElementsByClassName("c-accordion");

if (components) {
  var component;

  for (a = components.length - 1; a >= 0; a--) {
    component = components[a];

    var tabs = component.getElementsByClassName("c-accordion__tab");
    var tab;

    for (b = tabs.length - 1; b >= 0; b--) {
      tab = tabs[b];
      tab.id = "accordionTab" + b;
      tab.setAttribute("aria-expanded", false);

      var button = tab.firstElementChild;
      button.addEventListener("click", toggle);

      var panel = tab.nextElementSibling;
      panel.id = "accordionPanel" + b;
      panel.dataset.height = getHeight(tab, panel);

      // -- Set Initial ARIA
      tab.setAttribute("aria-controls", panel.id);
      tab.setAttribute("aria-expanded", false);
      panel.setAttribute("aria-labelledby", tab.id);
    }
  }
}

// -- Toggle Panels
function toggle() {
  var component = this.parentNode.parentNode;
  var tabs = component.getElementsByClassName("c-accordion__tab");
  var tab = this.parentNode;
  var panel = tab.nextElementSibling;

  if (component.dataset.multiselect == "false") {
    var active = component.getElementsByClassName(
      "c-accordion__tab--active"
    )[0];
    tab.classList.toggle("c-accordion__tab--active");
    if (active) {
      active.classList.remove("c-accordion__tab--active");
      active.nextElementSibling.style.height = 0;
      tab.setAttribute("aria-expanded", "false");
    }
  } else tab.classList.toggle("c-accordion__tab--active");

  // Set the aria-expanded
  if (tab.classList.contains("c-accordion__tab--active")) {
    panel.style.height = panel.dataset.height;
    this.setAttribute("aria-expanded", "true");
  } else {
    panel.style.height = 0;
    this.setAttribute("aria-expanded", "false");
  }
}

// -- Get the natural height of the element
function getHeight(tab, panel) {
  tab.classList.add("c-accordion__tab--active");
  var height = panel.scrollHeight + "px";
  tab.classList.remove("c-accordion__tab--active");
  return height;
}

//dropdown menu quicklinks
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

//Menu Navegación
const btnNav = document.querySelector("#btnNav");
const navMain = document.querySelector(".navigation--menu");
const navigation = document.querySelector(".nav__menu");
const search = document.querySelector(".navigation--search");

btnNav.addEventListener("click", (event) => {
  if (document.querySelector(".nav__accordion")) {
    event.preventDefault();

    btnNav.classList.toggle("open");
    navMain.classList.toggle("show");

    if (navMain.classList.contains("show")) {
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

      if (visibleNavLinks.length > 0) {
        const firstLink = visibleNavLinks[0].querySelector("a");
        firstLink.focus();
        // document.getElementById("btnNav").focus();
      }
    } else {
      document.querySelector(".navigation--menu .nav__menu").style.visibility =
        "hidden";
    }
  }

  navMain.addEventListener("focusout", (e) => {
    if (navMain !== e.target && !navMain.contains(e.relatedTarget)) {
      document.getElementById("btnNav").focus();

      // navMain.classList.remove('show');
      // btnNav.classList.remove('open');
    }
  });
});

// -- Nav Accordion get and configuration
let navComponents = document.getElementsByClassName("nav__accordion--list");
if (navComponents) {
  let component;
  for (a = navComponents.length - 1; a >= 0; a--) {
    component = navComponents[a];
    let tabs = component.getElementsByClassName("nav__accordion--tab");
    let tab;
    for (b = tabs.length - 1; b >= 0; b--) {
      tab = tabs[b];
      tab.id = "accordionTab" + b;
      tab.setAttribute("aria-expanded", false);

      let button = tab.firstElementChild;
      button.addEventListener("click", toggle);

      let panel = tab.querySelector(".link").nextElementSibling;
      panel.id = "accordionPanel" + b;
      panel.dataset.height = getHeight(tab, panel);

      // -- Set Initial ARIA
      tab.setAttribute("aria-controls", panel.id);
      tab.setAttribute("aria-expanded", false);
      panel.setAttribute("aria-labelledby", tab.id);
    }
  }
}

// -- function Toggle List navigation
function toggle(e) {
  if (document.querySelector(".nav__accordion")) {
    e.preventDefault();
    let component = this.parentNode.parentNode;
    let tabs = component.getElementsByClassName("nav__accordion--tab");
    let tab = this;
    let panel = tab.nextElementSibling;

    if (component.dataset.multiselect == "false") {
      let active = component.getElementsByClassName(
        "nav__accordion-tab--active"
      )[0];
      tab.classList.toggle("nav__accordion-tab--active");
      if (active) {
        active.classList.remove("nav__accordion-tab--active");
        active.nextElementSibling.style.height = 0;
        tab.setAttribute("aria-expanded", "false");
      }
    } else tab.classList.toggle("nav__accordion-tab--active");

    // aria-expanded
    if (tab.classList.contains("nav__accordion-tab--active")) {
      panel.style.height = panel.dataset.height;
      this.setAttribute("aria-expanded", "true");
    } else {
      panel.style.height = 0;
      this.setAttribute("aria-expanded", "false");
    }
  }
}

// height of the element panel
function getHeight(tab, panel) {
  tab.classList.add("nav__accordion-tab--active");
  let height = panel.scrollHeight + "px";
  tab.classList.remove("nav__accordion-tab--active");
  return height;
}

//Window Resize
function widthChangeCallback() {
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

  if (window.innerWidth > 992) {
    document.querySelector(".nav__menu").classList.remove("nav__accordion");
    document.querySelector(".navigation--menu").classList.remove("show");
    document
      .querySelector(".navigation--action .btn--menu")
      .classList.remove("open");
    document.querySelector(".nav__menu").removeAttribute("style");
  } else {
    document.querySelector(".nav__menu").classList.add("nav__accordion");
    document
      .querySelector(".navigation--menu")
      .insertAdjacentElement("beforeEnd", navigation);
  }
}

window.addEventListener("resize", widthChangeCallback);
widthChangeCallback();

// Section Interests Tabs
if (document.querySelector(".prv-interest-section .prv-nav-tab")) {
  const _tabsInterest1 = document.querySelectorAll("[data-tab-extra]");
  const _contentInterest1 = document.getElementsByClassName("active");

  const toggleContentInterest1 = function () {
    if (!this.classList.contains("active")) {
      Array.from(_contentInterest1).forEach((item1) => {
        item1.classList.remove("active");
      });

      this.classList.add("active");

      let currentTabInterest1 = this.getAttribute("data-tab-extra"),
        _tabContentInterest1 = document.getElementById(currentTabInterest1);
      _tabContentInterest1.classList.add("active");
    }
  };

  Array.from(_tabsInterest1).forEach((item1) => {
    item1.addEventListener("click", toggleContentInterest1);
  });
}

// Section Interest Carousel
if (document.querySelector(".prv-interest-section .interest__swiper")) {
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
if (document.querySelector(".prv-footer .menu-accordion")) {
  let acc = document.querySelectorAll(
    ".prv-footer .menu-accordion .menu-accordion__header"
  );
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function (e) {
      e.preventDefault();
      var panel = this.nextElementSibling;
      var coursePanel = document.getElementsByClassName(
        "menu-accordion__collapse"
      );
      var courseAccordionActive = document.getElementsByClassName(
        "menu-accordion__header active"
      );

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
    };
  }
}

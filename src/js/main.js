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

// var html = document.getElementsByTagName("html")[0];
// var rtlBtn = document.getElementsByClassName("rtlBtn")[0];
// rtlBtn.addEventListener("click", rtlToggle);

// function rtlToggle() {
//   console.log("click");
//   if (html.dir != "rtl") {
//     console.log("here");
//     html.dir = "rtl";
//   } else {
//     html.dir = "ltr";
//   }
// }
// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

if (document.querySelector(".prv-footer")) {
  let acc = document.querySelectorAll(".prv-footer .menu-accordion__header");
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

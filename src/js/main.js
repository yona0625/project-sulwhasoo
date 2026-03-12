const allSearch = {
  init: function () {
    const searchBar = document.querySelector(".search-bar")
    const searchBtn = document.querySelector(".search-btn")
    searchBtn.addEventListener("click", () => {
      searchBar.classList.toggle('h-[60px]');
    }) 
  },
};
allSearch.init();

const mobileAllmenu = {
  init: function () {
    const trigger = document.querySelector(".trigger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const exitbtn = document.querySelector(".exit-btn")

    const toggleMenu = () => {
      mobileMenu.classList.toggle('-translate-x-full');
      mobileMenu.classList.toggle('translate-x-0');
    }

    trigger.addEventListener("click", toggleMenu);
    exitbtn.addEventListener("click", toggleMenu);
  }
}
mobileAllmenu.init();

const footerInfo = {
  init: function () {
    const footerInfoBtn = document.querySelector(".footer-btn")
    const footerAllInfo = document.querySelector(".footer-wrap")
    footerInfoBtn.addEventListener("click", () => {
      footerToggle = footerAllInfo.style;
      if(footerToggle.maxHeight === '') {
        footerToggle.maxHeight = footerAllInfo.scrollHeight + 'px';
      }
      else {
        footerToggle.maxHeight = '';
      }
    })
  }
}
footerInfo.init();
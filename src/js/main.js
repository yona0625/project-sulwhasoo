const allSearch = {
  init: function () {
    /* mobile */
    const searchBar = document.querySelector(".search-bar");
    const searchBtn = document.querySelectorAll(".mobile-search, .pc-search");

    searchBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        searchBar.classList.toggle("active");
      });
    });
    
    document.addEventListener("click", (e) => {
      if (!searchBar.contains(e.target)) {
        searchBar.classList.remove("active");
      }
    });
  },
};
allSearch.init();

const selectLang = {
  init: function () {
    const langBtn = document.querySelector(".language-btn");
    const langList = document.querySelector(".language-list");
    langBtn.addEventListener("click", () => {
      langList.classList.toggle("hidden");
    });
  },
};
selectLang.init();

const slideAutoPlay = {
  init: function () {
    const playBtn = document.querySelector(".visual-autoplay-btn");
    playBtn.addEventListener("click", () => {
      if (visual_slide.autoplay.running) {
        visual_slide.autoplay.stop();
      } else {
        visual_slide.autoplay.start();
      }
    });
  },
};
slideAutoPlay.init();

const pcMenu = {
  init: function () {
    const pcMenuItems = document.querySelectorAll('.pc-menu > ul > li');

    pcMenuItems.forEach(item => {
      const pcMenuPanel = item.querySelector('ul');
      if (!pcMenuPanel) return;

      item.addEventListener('mouseenter', () => {
        pcMenuPanel.classList.add('active');
      });

      item.addEventListener('mouseleave', () => {
        pcMenuPanel.classList.remove('active');
      });
    });
  }
}
pcMenu.init();

const mobileAllmenu = {
  init: function () {
    const trigger = document.querySelector(".trigger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const exitbtn = document.querySelector(".exit-btn");

    const toggleMenu = () => {
      mobileMenu.classList.toggle("-translate-x-full");
      mobileMenu.classList.toggle("translate-x-0");
    };

    trigger.addEventListener("click", toggleMenu);
    exitbtn.addEventListener("click", toggleMenu);
  },
};
mobileAllmenu.init();

const footerInfo = {
  init: function () {
    const footerInfoBtn = document.querySelector(".footer-btn");
    const footerAllInfo = document.querySelector(".footer-wrap");
    footerInfoBtn.addEventListener("click", () => {
      footerToggle = footerAllInfo.style;
      if (footerToggle.maxHeight === "") {
        footerToggle.maxHeight = footerAllInfo.scrollHeight + "px";
      } else {
        footerToggle.maxHeight = "";
      }
    });
  },
};
footerInfo.init();

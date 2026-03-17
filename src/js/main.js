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

const slideAutoPlay = (autoBtn, swiper) => {
  /* 화살표 시 객체 메서드 함수 불가 */
  const autoPlay = document.querySelector(autoBtn);
  const playBtn = autoPlay.querySelector(".play-btn");
  const pauseBtn = autoPlay.querySelector(".pause-btn");
  autoPlay.addEventListener("click", () => {
    /* swiper로 변경 */
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      pauseBtn.classList.add("hidden");
      playBtn.classList.remove("hidden");
    } else {
      swiper.autoplay.start();
      playBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    }
  });
};
slideAutoPlay(".visual-autoplay", visual_slide);
slideAutoPlay(".reco-autoplay", recommend_slide);

const pcMenu = {
  init: function () {
    const pcMenuItems = document.querySelectorAll(".pc-menu > ul > li");

    pcMenuItems.forEach((item) => {
      const pcMenuPanel = item.querySelector("ul");
      if (!pcMenuPanel) return;

      item.addEventListener("mouseenter", () => {
        pcMenuPanel.classList.add("active");
      });

      item.addEventListener("mouseleave", () => {
        pcMenuPanel.classList.remove("active");
      });
    });
  },
};
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

const mobileMenuToggle = {
  init: function () {
    const openMainMenu = document.querySelectorAll(".openMenu");
    const openSubMenu = document.querySelectorAll(".openSubMenu");
    openSubMenu.forEach((subItem) => {
      subItem.addEventListener("click", (e) => {
        e.stopPropagation();
        const subMenu = subItem.querySelector("ul");
        const subBold = subItem.querySelector("a");
        subMenu.classList.toggle("active");
        subBold.classList.toggle("bold");
      });
    });
    openMainMenu.forEach((mainItem) => {
      mainItem.addEventListener("click", (e) => {
        /* 이중 아코디언 이벤트 버블링 방지 */
        e.stopPropagation();
        const mainMenu = mainItem.querySelector("ul");
        const mainBold = mainItem.querySelector("a");
        /* 이중 아코디언 메뉴가 아니라면 이벤트 발생 안 함 */
        if (mainMenu.contains(e.target)) return;
        /* 쿼리 셀렉터와 달리 toggle의 특성 상 변수 선언을 했어도 실행이 됨. 실행하고 변수 저장 -> 따라서 1단 아코디언도 실행 가능 */
        const isOpen = mainMenu.classList.toggle("active");
        mainBold.classList.toggle("bold");

        /* 자동 열림 */
        const openSubMenu = mainItem.querySelector(".openSubMenu ul");
        const subBold = mainItem.querySelector(".openSubMenu > a");
        if (!openSubMenu) return;

        if (isOpen) {
          setTimeout(() => {
            if (mainMenu.classList.contains("active")) {
              openSubMenu.classList.add("active");
              subBold.classList.add("bold");
            }
          }, 500);
        } else {
          openSubMenu.classList.remove("active");
          subBold.classList.remove("bold");
        }
      });
    });
  },
};
mobileMenuToggle.init();

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

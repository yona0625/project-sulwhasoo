const goTop = {
  init: function () {
    const goTopBtn = document.querySelector(".go-top");

    goTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const bottomAni = totalScroll - scrollY < 150;
      /* top fade */
      if (scrollY > 100) {
        goTopBtn.classList.add("active");
      } else {
        goTopBtn.classList.remove("active");
      }
      /* bottom animation */
      if (bottomAni) {
        goTopBtn.classList.remove("bottom-0");
        goTopBtn.classList.add("bottom-20");
      } else {
        goTopBtn.classList.remove("bottom-20");
        goTopBtn.classList.add("bottom-0");
      }
    });
  },
};
goTop.init();

const allSearch = {
  init: function () {
    /* mobile */
    const searchBar = document.querySelector(".search-bar");
    const searchBtn = document.querySelectorAll(".mobile-search, .pc-search");
    const searchCloseBtn = document.querySelector(".search-close");
    const header = document.querySelector("header");
    const headerNav = document.querySelectorAll("header, .pc-menu");

    searchBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        searchBar.classList.toggle("active");
        headerNav.forEach((item) => item.classList.toggle("bg-white"));
      });
    });
    document.addEventListener("click", (e) => {
      if (!searchBar.contains(e.target)) {
        searchBar.classList.remove("active");
      }
      if (
        !header.contains(e.target) &&
        searchBar.classList.contains("active")
      ) {
        headerNav.forEach((item) => item.classList.toggle("bg-white"));
      }
    });
    searchCloseBtn.addEventListener("click", () => {
      searchBar.classList.remove("active");
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

    const openItem = (item) => {
      /* 메뉴 / 볼드체 / 플러스 아이콘 순 */
      item.querySelector("ul").classList.add("active");
      item.querySelector("a").classList.add("bold");
      item.querySelector(".menuPlus")?.classList.add("icon-active");
    };
    const closeItem = (item) => {
      item.querySelector("ul").classList.remove("active");
      item.querySelector("a").classList.remove("bold");
      item.querySelector(".menuPlus")?.classList.remove("icon-active");
    };
    const toggleItem = (item) => {
      item.querySelector("ul").classList.toggle("active");
      item.querySelector("a").classList.toggle("bold");
      item.querySelector(".menuPlus")?.classList.toggle("icon-active");
    };

    /* 2단 아코디언 */
    openSubMenu.forEach((subItem) => {
      subItem.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleItem(subItem);
      });
    });
    /* 1단 아코디언 */
    openMainMenu.forEach((mainItem) => {
      mainItem.addEventListener("click", (e) => {
        /* 이중 아코디언 이벤트 버블링 방지 */
        e.stopPropagation();
        const mainMenu = mainItem.querySelector("ul");
        /* 이중 아코디언 메뉴가 아니라면 이벤트 발생 안 함 */
        if (mainMenu.contains(e.target)) return;
        /* 쿼리 셀렉터와 달리 toggle의 특성 상 변수 선언을 했어도 실행이 됨. 실행하고 변수 저장 -> 따라서 1단 아코디언도 실행 가능(toggle) */
        /* + 해당 요소 빼고 나머지를 닫아야 하므로 isOpen: toggle -> contain, 나머지는 remove로 변경 */
        const isOpen = mainMenu.classList.contains("active");

        /* 전부 닫고 선택한 것만 열게 함
        foreach로 전부 돌면서 닫고, 닫혀 있을 때 열면서(!isOpen) + openItem(mainItem) toggle 역할 */
        openMainMenu.forEach(closeItem);

        const currentSubItem = mainItem.querySelector(".openSubMenu");
        if (!isOpen) {
          openItem(mainItem);
          if (!currentSubItem) return;
          /* 자동 열림 */
          setTimeout(() => {
            if (mainMenu.classList.contains("active")) {
              openItem(currentSubItem);
            }
          }, 500);
        } else {
          closeItem(currentSubItem);
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

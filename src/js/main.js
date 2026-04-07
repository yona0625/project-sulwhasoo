const hrefLink = {
  init: function() {
    document.querySelectorAll('[data-href]').forEach(clickItem => {
      clickItem.style.cursor = 'pointer';
      clickItem.addEventListener("click", e => {
        /* 본연의 a 링크 포함 시 무시 */
        if (e.target.closest('a')) return;
        const href = clickItem.dataset.href;
        if(href && href !== '#none') 
          window.location.href = href;
      });
    });
  }
}
hrefLink.init();
const goTop = {
  init: function () {
    const goTopWrapper = document.querySelector(".go-top");
    const footer = document.querySelector("footer");
    const goTopBtn = goTopWrapper.querySelector(".go-top-btn");

    const topInitPosition = () => {
      if (window.innerWidth > 1023) {
        goTopWrapper.style.bottom = "";
        return;
      }
      goTopWrapper.style.bottom =
        footer.offsetHeight - goTopBtn.offsetHeight + "px";
    };

    topInitPosition();
    window.addEventListener("resize", topInitPosition);

    goTopWrapper.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const bottomAni = totalScroll - scrollY < 100;
      /* top fade */
      if (scrollY > 100) {
        goTopWrapper.classList.add("active");
      } else {
        goTopWrapper.classList.remove("active");
      }
      /* bottom animation */
      if (window.innerWidth > 1023) return;

      if (bottomAni) {
        goTopWrapper.style.bottom =
          footer.offsetHeight - goTopBtn.offsetHeight + "px";
      } else {
        goTopWrapper.style.bottom = "0px";
      }
    });
  },
};
goTop.init();

const allSearch = {
  init: function () {
    /* mobile */
    const body = document.body;
    const dimmed = document.querySelector(".dimmed");
    const searchBar = document.querySelector(".search-bar");
    const searchBtn = document.querySelectorAll(".mobile-search, .pc-search");
    const header = document.querySelector("header");
    const searchFold = document.querySelector(".search-close");
    const pcMenu = document.querySelector(".pc-menu");
    const headerNav = [header, pcMenu];

    function openSearch() {
      searchBar.classList.add("active");
      header.classList.add("searchBtn-active");
      dimmed.classList.remove("hidden");
      body.style.overflow = "hidden";
      /* closeSearch가 아니라 외부 클릭에서 제어 */
      headerNav.forEach((item) => item.classList.add("bg-white"));
    }
    function closeSearch() {
      searchBar.classList.remove("active");
      header.classList.remove("searchBtn-active");
      dimmed.classList.add("hidden");
      body.style.overflow = "";
    }

    /* 검색창 활성화 시 */
    searchBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        const searchActived = searchBar.classList.contains("active");
        if (searchActived) {
          closeSearch();
        } else {
          openSearch();
        }
      });
    });

    searchFold.addEventListener("click", closeSearch);

    /* 검색창 하위 메뉴 컨트롤 */
    document.addEventListener("click", (e) => {
      const isInHeader = header.contains(e.target);
      const isInSearchBar = searchBar.contains(e.target);
      const isSearchOpen = searchBar.classList.contains("active");

      /* 검색창 활성화인 상태에서 검색창을 벗어나면, 검색창만 닫음 */
      if (isSearchOpen && !isInSearchBar) {
        closeSearch();
        return;
      }
      /* 검색창이 닫히고, 헤더를 벗어나면 헤더 배경 해제 */
      /* openSearch에서 항상 bg-white를 활성화 하고, 외부 클릭할 때(=헤더를 벗어날 때)만 지우면 됨. */
      if (!isInSearchBar && !isInHeader) {
        headerNav.forEach((item) => item.classList.remove("bg-white"));
      }
    });
  },
};
allSearch.init();

const selectLang = {
  init: function () {
    const openLang = document.querySelector(".open-lang");
    const langList = document.querySelector(".language-list");
    const langBtn = document.querySelector(".language-btn");
    openLang.addEventListener("click", () => {
      langList.classList.toggle("hidden");
      langBtn.classList.toggle("open");
    });
  },
};
selectLang.init();

const slideAutoPlay = (autoBtn, swiper) => {
  /* 화살표 시 객체 메서드 함수 불가 */
  const autoPlay = document.querySelector(autoBtn);
  const playBtn = autoPlay.querySelector(".play-btn");
  const pauseBtn = autoPlay.querySelector(".pause-btn");

  const slideAutoToggle = (slidePlay, slidePause)  => {
    slidePlay.classList.replace("hidden", "flex");
    slidePause.classList.replace("flex", "hidden");
  }
  autoPlay.addEventListener("click", () => {
    /* swiper로 변경 */
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      slideAutoToggle(playBtn, pauseBtn);
    } else {
      swiper.autoplay.start();
      slideAutoToggle(pauseBtn, playBtn);
    }
  });
};
slideAutoPlay(".visual-autoplay", visual_slide);
slideAutoPlay(".reco-autoplay", recommend_slide);

const pcMenu = {
  init: function () {
    const header = document.querySelector("header");
    const pcAllMenu = document.getElementById("pc-allmenu");
    const pcMainMenu = document.querySelector(".pc-menu ul");
    const allPanels = pcAllMenu.querySelectorAll(".pc-panel-list");

    let firstEnterTimer = null;
    let isFirstEnter = true;

    /* 항목이 있는 메뉴만 open */
    function openPanel(panelId) {
      allPanels.forEach((panelItem) => {
        const activePanel = panelItem.id === `panel-${panelId}`;
        panelItem.classList.toggle("hidden", !activePanel);
        panelItem.classList.toggle("flex", activePanel);
      });
    }

    function closePanel() {
      pcAllMenu.style.height = "0";
      allPanels.forEach((panelItem) => {
        panelItem.classList.replace("flex", "hidden");
      });
    }

    function openSubMenu(subMenuName) {
      const haveSubMenu = document.getElementById(`panel-${subMenuName}`);
      openPanel(subMenuName);
      pcAllMenu.style.height = haveSubMenu.scrollHeight + "px";
    }

    // 메뉴 영역(ul) 위에서 마우스가 움직일 때만 감시
    pcMainMenu.addEventListener("mouseover", (e) => {
      /* 메인 메뉴만 선택(여백 등 무시) */
      const dataMenu = e.target.closest("li");
      if (!dataMenu) return;

      /* dataset.menu = data-menu */
      const subMenuName = dataMenu.dataset.menu;
      /* 하위 메뉴(ul) 미포함 */
      if (!subMenuName) {
        closePanel();
        return;
      }
      
      /* 최초 접근 시 딜레이 */
      if (isFirstEnter) {
        if (firstEnterTimer) return;
        firstEnterTimer = setTimeout(() => {
          isFirstEnter = false;
          openSubMenu(subMenuName);
        }, 300);
        return;
      }
      /* 하위 메뉴 포함 */
      openSubMenu(subMenuName);
    });

    /* 헤더 떠날 시 */
    header.addEventListener("mouseleave", () => {
      clearTimeout(firstEnterTimer);
      /* 다시 처음으로 초기화 */
      firstEnterTimer = null;
      isFirstEnter = true;
      pcAllMenu.style.height = "0";
      allPanels.forEach((item) => item.classList.replace("flex", "hidden"));
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
      const openMoMenu = "translate-x-0";
      const closeMoMenu = "-translate-x-full";
      mobileMenu.classList.toggle(closeMoMenu);
      mobileMenu.classList.toggle(openMoMenu);

      if (mobileMenu.classList.contains(openMoMenu)) {
        trigger.setAttribute("aria-expanded", true);
      } else {
        trigger.setAttribute("aria-expanded", false);
      }
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

    const setItem = (menu, menuActived) => {
      /* 메뉴 / 볼드체 / 플러스 아이콘 순 */
      menu.querySelector("ul").classList.toggle("active", menuActived);
      menu.querySelector("a").classList.toggle("bold", menuActived);
      menu
        .querySelector(".menuPlus")
        ?.classList.toggle("icon-active", menuActived);
    };

    /* 2단 아코디언 */
    openSubMenu.forEach((subItem) => {
      subItem.addEventListener("click", (e) => {
        e.stopPropagation();
        const subMenuActived = subItem
          .querySelector("ul")
          .classList.contains("active");
        /* = toggle */
        if (subMenuActived) {
          setItem(subItem, false);
        } else {
          setItem(subItem, true);
        }
      });
    });
    /* 1단 아코디언 */
    openMainMenu.forEach((mainItem) => {
      mainItem.addEventListener("click", (e) => {
        e.stopPropagation();
        /* 하위 메뉴 클릭 시에 1단이 접히면 안 됨. */
        const mainMenu = mainItem.querySelector("ul");
        if (mainMenu.contains(e.target)) return;

        const mainMenuActived = mainMenu.classList.contains("active");

        /* 일단 전부 닫기 */
        openMainMenu.forEach((mainItem) => {
          setItem(mainItem, false);
          mainItem.querySelector("a").setAttribute("aria-expanded", false);
        });

        const currentSubItem = mainItem.querySelector(".openSubMenu");
        /* 선택한 것만 열기 */
        if (!mainMenuActived) {
          setItem(mainItem, true);
          mainItem.querySelector("a").setAttribute("aria-expanded", true);

          /* 자동 열림 */
          if (!currentSubItem) return;
          setTimeout(() => {
            if (mainMenu.classList.contains("active")) {
              setItem(currentSubItem, true);
            }
          }, 500);
        } else {
          setItem(currentSubItem, false);
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
      /* 버튼 */
      footerInfoBtn.classList.toggle("footer-btn-active");
      const footerToggle = footerAllInfo.style;
      if (footerToggle.maxHeight === "") {
        footerAllInfo.classList.add("footer-open");
        footerToggle.maxHeight = footerAllInfo.scrollHeight + "px";
      } else {
        footerAllInfo.classList.remove("footer-open");
        footerToggle.maxHeight = "";
      }
    });
  },
};
footerInfo.init();

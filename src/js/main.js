const goTop = {
  init: function () {
    const goTopWrapper = document.querySelector(".go-top");
    const footer = document.querySelector("footer");
    const goTopBtn = goTopWrapper.querySelector("div");

    const topInitPosition = () => {
      if(window.innerWidth > 1023) {
        goTopWrapper.style.bottom = "";
        return;
      }
      goTopWrapper.style.bottom = footer.offsetHeight - goTopBtn.offsetHeight + "px";
    }

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
      if (window.innerWidth >= 1024) return;

      if (bottomAni) {
        goTopWrapper.style.bottom = footer.offsetHeight - goTopBtn.offsetHeight + "px";
      } else {
        goTopWrapper.style.bottom = "0px";
      }
    });
  },
};
goTop.init();

const allSearch = {
  init: function () {
    /* 클래스명 좀 더 직관적으로 알기 쉽게 바꾸기.
    현재
    1. 아이콘이 눌렸을 때: search-active
    2. 검색창이 열렸을 때: active */

    /* mobile */
    const body = document.body;
    const dimmed = document.querySelector(".dimmed");
    const searchBar = document.querySelector(".search-bar");
    const searchBtn = document.querySelectorAll(".mobile-search, .pc-search");
    const header = document.querySelector("header");
    const searchFold = document.querySelector(".search-close");
    const pcMenu = document.querySelector(".pc-menu");
    const headerNav = [header, pcMenu];

    /* 검색창 활성화 시 */
    searchBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        /* 검색 아이콘, 검색 창, 배경 딤드 토글 - html 구조 상 add/remove(X) */
        searchBar.classList.toggle("active");
        header.classList.toggle("search-active");
        dimmed.classList.toggle("hidden");

        /* 딤드 시 스크롤 방지 */
        if (!dimmed.classList.contains("hidden")) {
          body.style.overflow = "hidden";
        } else {
          /* 스크롤 해제 */
          body.style.overflow = "";
        }

        /* 헤더 활성화 시 배경 유지하도록 */
        const headerOpen = header.classList.contains("active");
        const searchOpen = header.classList.contains("search-active");
        if (headerOpen || searchOpen) {
          headerNav.forEach((item) => item.classList.add("bg-white"));
        } else {
          headerNav.forEach((item) => item.classList.remove("bg-white"));
        }
      });
    });

    searchFold.addEventListener("click", () => {
      searchBar.classList.remove("active");
      dimmed.classList.add("hidden");
      body.style.overflow = "";
    });

    /* 하위 메뉴 컨트롤 */
    document.addEventListener("click", (e) => {
      const currentHeader = header.contains(e.target);
      const currentSearchBar = searchBar.contains(e.target);

      /* 검색창 활성화인 상태에서 검색창을 벗어나면, 검색창만 닫음 */
      if (searchBar.classList.contains("active") && !currentSearchBar) {
        searchBar.classList.remove("active");
        /* return이 없다면 바로 밑의 if문이 실행되어서 순차적으로 배경 해제가 이루어지지 않음. */
        header.classList.remove("search-active");
        dimmed.classList.add("hidden");
        body.style.overflow = "";
        return;
      }
      /* 검색창이 닫히고, 헤더를 벗어나면 헤더 배경 해제 */
      if (!currentSearchBar && !currentHeader) {
        headerNav.forEach((item) => item.classList.remove("bg-white"));
      }
    });
  },
};
allSearch.init();

const selectLang = {
  init: function () {
    const openLang = document.querySelector(".language > div");
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
    const header = document.querySelector("header");
    const pcAllMenu = document.getElementById("pc-allmenu");
    const pcMainMenu = document.querySelector(".pc-menu ul");
    let activeMenuName = null;

    // 메뉴 영역(ul) 위에서 마우스가 움직일 때만 감시
    pcMainMenu.addEventListener("mouseover", (e) => {
      /* li의 data-menu를 정확히 찾기 위해 closest */
      const dataMenu = e.target.closest("li");
      if (!dataMenu) return;

      /* dataset.menu = data-menu */
      const subMenuName = dataMenu.dataset.menu;

      // 하위 메뉴가 없는 메뉴일 때 닫음
      if (!subMenuName) {
        pcAllMenu.style.height = "0";
        /* 이전 activeMenuName을 null로 지워 '초기화'함. */
        /* 하위 메뉴가 없어서 0으로 닫더라도, 다음 동작을 이전에 저장된 정보를 갖지 않고 원활하게 하기 위해 초기화를 하면서 0으로 닫는다. */
        if (activeMenuName !== null) {
          const otherMenu = document.getElementById(`panel-${activeMenuName}`);
          otherMenu.classList.remove("flex");
          otherMenu.classList.add("hidden");
          activeMenuName = null;
        }
        return;
      }

      /* 하위 메뉴 포함 */
      const haveSubMenu = document.getElementById(`panel-${subMenuName}`);

      if (activeMenuName !== null && activeMenuName !== subMenuName) {
        /* ★★★ 여기서는 초기화가 이루어지지 않음. 하위 메뉴 포함 -> 하위 메뉴 포함 간 이동이기 때문에 null로 지워버리면 작동을 안 함. */
        const otherMenu = document.getElementById(`panel-${activeMenuName}`);
        otherMenu.classList.remove("flex");
        otherMenu.classList.add("hidden");
      }

      /* 실제 실행이 이루어지는 곳 */
      haveSubMenu.classList.remove("hidden");
      haveSubMenu.classList.add("flex");
      pcAllMenu.style.height = haveSubMenu.scrollHeight + "px";
      activeMenuName = subMenuName;
    });

    // 헤더 전체를 나갈 때만 닫기
    header.addEventListener("mouseleave", () => {
      pcAllMenu.style.height = "0";
      if (activeMenuName !== null) {
        const currentPanel = document.getElementById(`panel-${activeMenuName}`);
        currentPanel.classList.remove("flex");
        currentPanel.classList.add("hidden");
        activeMenuName = null;
      }
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
      /* 버튼 */
      footerInfoBtn.classList.toggle("footer-btn-active");
      footerToggle = footerAllInfo.style;
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

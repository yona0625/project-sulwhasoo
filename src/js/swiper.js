/* visual */
const visual_slide = new Swiper(".visual-slide", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  speed: 1000,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  //   observer: true,
  //   observeParents: true,
  // },
  pagination: {
    el: ".visual-pagination",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    nextEl: ".visual-button-next",
    prevEl: ".visual-button-prev",
    enabled: true,
  },
  on: {
    /* resize */
    resize: function () {
      this.update();
    },

  },
});

/* recommend */
const recommend_slide = new Swiper(".recommend-slide", {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    observer: true,
    observeParents: true,
  },
  pagination: {
    el: ".reco-pagination",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    nextEl: ".reco-button-next",
    prevEl: ".reco-button-prev",
    enabled: true,
  },
  breakpoints: {
    721: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
  },
  on: {
    resize: function () {
      this.update();
    },
  },
});

const swiper = new Swiper(".visual", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    observer: true,
    observeParents: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    resize: function () {
      this.update();
    },
  },
});

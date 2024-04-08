'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector(".header");

// const message = document.createElement("div");

// message.classList.add("cookie-message");
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>'

// header.append(message);

// document.querySelector(".btn--close--cookie").addEventListener("click", function () {
//   message.remove();
// });

const learnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
learnMore.addEventListener("click", function (e) {
  console.log(section1);
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  tabs.forEach(t => {
    t.classList.remove("operations__tab--active");
  })
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach(el => el.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`).classList.add("operations__content--active");
});


const nav = document.querySelector(".nav");

const hoverLink = function (e, o) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const logo = link.closest('.nav').querySelector('img');
    const sibiling = link.closest('.nav').querySelectorAll('.nav__link');

    sibiling.forEach(el => {
      if (el !== link) el.style.opacity = o;
    })
    logo.style.opacity = o;
  }
};

nav.addEventListener("mouseover", e => hoverLink(e, 0.5));
nav.addEventListener("mouseout", e => hoverLink(e, 1));

// Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const callback = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting)
    nav.classList.add("sticky");
  else
    nav.classList.remove("sticky");

};

const stickyNav = new IntersectionObserver(callback, {
  root: null, threshold: 0, rootMargin: `-${navHeight}px`
});
stickyNav.observe(header);


const allSection = document.querySelectorAll('.section');

const revealCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // IF it TRUE

  observer.unobserve(entry.target);
  entry.target.classList.remove('section--hidden');
};

const revel = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  section.classList.add("section--hidden");
  revel.observe(section);
});


// Lazy loading image
const imgTarget = document.querySelectorAll("img[data-src]")

const loadingImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace the image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImg, { root: null, threshold: 0, rootMargin: '200px' });

imgTarget.forEach(img => imgObserver.observe(img));


// Slider
const slider = function () {

  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');

  let currentSlide = 0;
  const slideLength = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }
  goToSlide(0);

  const dotsContainer = document.querySelector('.dots');

  const creatDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML("beforeend", `
    <button class="dots__dot" data-slide="${i}"></button>
    `)
    });
  };
  creatDots();

  const changeDotColor = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }
  changeDotColor(currentSlide);

  const goRight = function () {
    if (currentSlide === slideLength - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    changeDotColor(currentSlide);
  };


  const goLeft = function () {
    if (currentSlide === 0) {
      currentSlide = slideLength - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    changeDotColor(currentSlide);
  }

  btnRight.addEventListener('click', goRight);
  btnLeft.addEventListener('click', goLeft);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goRight();
    if (e.key === 'ArrowLeft') goLeft();
  });


  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      goToSlide(e.target.getAttribute('data-slide'));
      changeDotColor(e.target.getAttribute('data-slide'));
    }
  });
}
slider();


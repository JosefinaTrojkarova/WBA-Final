const setupParallax = document.getElementById('how-it-work-p');
const whyUsParallaxMinus2 = document.getElementById('question-layer--2');
const whyUsParallaxMinus1 = document.getElementById('question-layer--1');
const whyUsParallaxPlus1 = document.getElementById('question-layer-1');
const whyUsParallaxPlus2 = document.getElementById('question-layer-2');
const whyUs = document.getElementById('why-us');

window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  let setupParallaxPosition = (scrollPosition - 1500) * (17 / 21) - 300;

  if (scrollPosition < 1500) {
    setupParallax.style.transform = `translateX(-50%) translateY(-300px)`;
  } else if (scrollPosition > 3600) {
    setupParallax.style.transform = `translateX(-50%) translateY(1400px)`;
  } else {
    setupParallax.style.transform = `translateX(-50%) translateY(${setupParallaxPosition}px)`;
  }
});

window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  let whyUsPosition = 0 - (scrollPosition - 4800)
  let whyUsParallaxMinus2Position = 50 - (scrollPosition - 3400) * (1 / 15);
  let whyUsParallaxMinus1Position = 100 - (scrollPosition - 3400) * (2 / 15);
  let whyUsParallaxPlus1Position = (scrollPosition - 3400) * (3 / 15) - 150;
  let whyUsParallaxPlus2Position = (scrollPosition - 3400) * (4 / 15) - 250;

  if (scrollPosition < 3400) {
    whyUsParallaxMinus2.style.transform = `translateX(-50.8%) translateY(50px)`;
    whyUsParallaxMinus1.style.transform = `translateX(-50.8%) translateY(100px)`;
    whyUsParallaxPlus1.style.transform = `translateX(-50.8%) translateY(-150px)`;
    whyUsParallaxPlus2.style.transform = `translateX(-50.8%) translateY(-250px)`;
  } else if (scrollPosition > 4900) {
    whyUsParallaxMinus2.style.transform = `translateX(-50.8%) translateY(-50px)`;
    whyUsParallaxMinus1.style.transform = `translateX(-50.8%) translateY(-100px)`;
    whyUsParallaxPlus1.style.transform = `translateX(-50.8%) translateY(150px)`;
    whyUsParallaxPlus2.style.transform = `translateX(-50.8%) translateY(150px)`;
  } else {
    whyUsParallaxMinus2.style.transform = `translateX(-50.8%) translateY(${whyUsParallaxMinus2Position}px)`;
    whyUsParallaxMinus1.style.transform = `translateX(-50.8%) translateY(${whyUsParallaxMinus1Position}px)`;
    whyUsParallaxPlus1.style.transform = `translateX(-50.8%) translateY(${whyUsParallaxPlus1Position}px)`;
    whyUsParallaxPlus2.style.transform = `translateX(-50.8%) translateY(${whyUsParallaxPlus2Position}px)`;
  }

  if (scrollPosition < 4800) {
    whyUs.style.transform = `translateY(0px)`;
  } else if (scrollPosition > 5100) {
    whyUs.style.transform = `translateY(-300px)`;
  } else {
    whyUs.style.transform = `translateY(${whyUsPosition}px)`;
  }
});

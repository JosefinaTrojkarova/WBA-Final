const setupParallax = document.getElementById('how-it-work-p');
const whyUsParallaxLayers = {
  minus2: document.getElementById('question-layer--2'),
  minus1: document.getElementById('question-layer--1'),
  plus1: document.getElementById('question-layer-1'),
  plus2: document.getElementById('question-layer-2')
};
const whyUs = document.getElementById('why-us');

window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;

  // Calculate transform position for setupParallax
  let setupParallaxPosition = calculateSetupParallaxPosition(scrollPosition);
  setupParallax.style.transform = `translateX(-50%) translateY(${setupParallaxPosition}px)`;

  // Calculate transform positions for whyUsParallaxLayers
  calculateWhyUsParallaxLayers(scrollPosition);

  // Calculate transform position for whyUs
  let whyUsPosition = calculateWhyUsPosition(scrollPosition);
  whyUs.style.transform = `translateY(${whyUsPosition}px)`;
});

function calculateSetupParallaxPosition(scrollPosition) {
  if (scrollPosition < 1500) {
    return -300;
  } else if (scrollPosition > 3600) {
    return 1400;
  } else {
    return (scrollPosition - 1500) * (17 / 21) - 300;
  }
}

function calculateWhyUsParallaxLayers(scrollPosition) {
  let scrollDelta = scrollPosition - 3400;
  let transformValues = {
    minus2: 50 - scrollDelta * (1 / 15),
    minus1: 100 - scrollDelta * (2 / 15),
    plus1: scrollDelta * (3 / 15) - 150,
    plus2: scrollDelta * (4 / 15) - 250
  };

  Object.keys(whyUsParallaxLayers).forEach(layer => {
    let transformValue = transformValues[layer];
    whyUsParallaxLayers[layer].style.transform = `translateX(-50.8%) translateY(${transformValue}px)`;
  });
}

function calculateWhyUsPosition(scrollPosition) {
  if (scrollPosition < 4800) {
    return 0;
  } else if (scrollPosition > 5150) {
    return -350;
  } else {
    return 0 - (scrollPosition - 4800);
  }
}

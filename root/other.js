// OTHER JS CODE
// Parallax effects
const setupParallax = document.getElementById('how-it-work-p');
const whyUsParallaxLayers = {
    minus2: document.getElementById('question-layer--2'),
    minus1: document.getElementById('question-layer--1'),
    plus1: document.getElementById('question-layer-1'),
    plus2: document.getElementById('question-layer-2')
};
const whyUs = document.getElementById('why-us');
const phoneParallaxes = {
    phone1: document.getElementById('profile-system-phone-1'),
    phone2: document.getElementById('profile-system-phone-2'),
    phone3: document.getElementById('profile-system-phone-3'),
    phone4: document.getElementById('profile-system-phone-4'),
    phone5: document.getElementById('profile-system-phone-5')
}

function scrollParallaxEffects() {
    let scrollPosition = window.scrollY;

    // Calculate transform position for setupParallax
    calculateSetupParallaxPosition(scrollPosition);

    // Calculate transform positions for whyUsParallaxLayers
    calculateWhyUsParallaxLayers(scrollPosition);

    // Calculate transform position for whyUs
    calculateWhyUsPosition(scrollPosition);

    // Calculate transform positions for phoneParallaxes
    calculatePhoneParallaxes(scrollPosition);
}

// Call scrollParallaxEffects once on page load to position elements correctly
scrollParallaxEffects();

// Call scrollParallaxEffects on scroll event
window.addEventListener('scroll', scrollParallaxEffects);

function calculateSetupParallaxPosition(scrollPosition) {
    const scrollDelta = scrollPosition - 1500;
    let parallaxPosition = scrollDelta * (17 / 21) - 300;

    if (scrollPosition < 1500) {
        parallaxPosition = -300;
    } else if (scrollPosition > 3600) {
        parallaxPosition = 1400;
    }

    setupParallax.style.transform = `translateX(-50%) translateY(${parallaxPosition}px)`;
}

function calculateWhyUsParallaxLayers(scrollPosition) {
    const scrollDelta = scrollPosition - 3400;
    let parallaxPositions = {
        minus2: 50 - scrollDelta * (1 / 15),
        minus1: 100 - scrollDelta * (2 / 15),
        plus1: scrollDelta * (3 / 15) - 150,
        plus2: scrollDelta * (4 / 15) - 200
    };

    if (scrollPosition < 3400) {
        parallaxPositions = {
            minus2: 50,
            minus1: 100,
            plus1: -150,
            plus2: -200
        };
    } else if (scrollPosition > 4900) {
        parallaxPositions = {
            minus2: -50,
            minus1: -100,
            plus1: 150,
            plus2: 200
        };
    }

    Object.keys(whyUsParallaxLayers).forEach(layer => {
        let transformValue = parallaxPositions[layer];
        whyUsParallaxLayers[layer].style.transform = `translateX(-50.8%) translateY(${transformValue}px)`;
    });
}

function calculateWhyUsPosition(scrollPosition) {
    const scrollDelta = scrollPosition - 4800;
    let parallaxPosition = 0 - scrollDelta;

    if (scrollPosition < 4800) {
        parallaxPosition = 0;
    } else if (scrollPosition > 5150) {
        parallaxPosition = -350;
    }

    whyUs.style.transform = `translateY(${parallaxPosition}px)`
}

function calculatePhoneParallaxes(scrollPosition) {
    const scrollDelta = scrollPosition - 5000;
    let parallaxPositions = {
        phone1: 50 - scrollDelta * (1 / 20),
        phone2: scrollDelta * (1 / 20) - 50,
        phone3: 50 - scrollDelta * (1 / 20),
        phone4: scrollDelta * (1 / 20) - 50,
        phone5: 50 - scrollDelta * (1 / 20)
    };

    if (scrollPosition < 5000) {
        parallaxPositions = {
            phone1: 50,
            phone2: -50,
            phone3: 50,
            phone4: -50,
            phone5: 50
        };
    } else if (scrollPosition > 6000) {
        parallaxPositions = {
            phone1: 0,
            phone2: 0,
            phone3: 0,
            phone4: 0,
            phone5: 0
        };
    }

    Object.keys(phoneParallaxes).forEach(phone => {
        let transformValue = parallaxPositions[phone];
        phoneParallaxes[phone].style.transform = `translateY(${transformValue}px)`;
    });
}


// Card focus animation
const cards = document.querySelectorAll('.wavetag-showcase-cards');
const showcase = document.getElementById('wavetag-showcase-cards');

cards.forEach(card => {
    card.addEventListener('click', function () {
        cards.forEach(card => {
            card.classList.remove('focused');
        });

        this.classList.add('focused');

        let showcasePosition = 0;

        if (this === cards[2]) {
            showcasePosition = -560;
        } else if (this === cards[0]) {
            showcasePosition = 560;
        }

        showcase.style.transform = `translateX(${showcasePosition}px)`
    });
});


// Faq animations
const faqQuestions = document.querySelectorAll('.faq-question');
const faqIcons = document.querySelectorAll('.faq-question-icon');

faqQuestions.forEach((question, index) => {
    question.style.height = 'auto';
    let questionHeight = question.getBoundingClientRect().height - 50;
    question.style.height = `2rem`;

    question.addEventListener('click', function () {
        if (this.style.height !== '2rem') {
            this.style.height = '2rem';
            faqIcons[index].setDirection(-1);
            faqIcons[index].play();
        } else {
            faqQuestions.forEach(q => {
                q.style.height = '2rem';
            });

            this.style.height = `${questionHeight}px`;

            faqIcons.forEach((icon, i) => {
                icon.setDirection(-1);
                icon.play();
                if (i === index) {
                    icon.setDirection(1);
                    icon.play();
                }
            });
        }
    });
});
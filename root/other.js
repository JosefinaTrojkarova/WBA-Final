// OTHER JS CODE

// Scroll related effects
const navMenu = document.getElementById('nav-menu');
const navOptions = {
    option1: document.getElementById('nav-option-1'),
    option2: document.getElementById('nav-option-2'),
    option3: document.getElementById('nav-option-3')
}
const profileBtn = document.getElementById('profile-btn-text');
const navBurger = document.getElementById('burger');
const setupSection = document.getElementById('how-it-work');
const setupParallax = document.getElementById('how-it-work-p');
const whyUsParallaxLayers = {
    minus2: document.getElementById('question-layer--2'),
    minus1: document.getElementById('question-layer--1'),
    plus1: document.getElementById('question-layer-1'),
    plus2: document.getElementById('question-layer-2')
};
const whyUs = document.getElementById('why-us');
const phoneSection = document.getElementById('profile-system');
const phonesWrapper = document.getElementById('profile-system-phones');
const phonesButton = document.getElementById('profile-system-btn');
const phones = {
    phone1: document.getElementById('profile-system-phone-1'),
    phone2: document.getElementById('profile-system-phone-2'),
    phone3: document.getElementById('profile-system-phone-3'),
    phone4: document.getElementById('profile-system-phone-4'),
    phone5: document.getElementById('profile-system-phone-5')
}
const featureCallouts = document.querySelectorAll('.profile-system-feature-callout');
const showcase = document.getElementById('wavetag-showcase-cards');

// Function to handle phone section animations
function phoneSectionAnimations() {
    let phonesWrapperPosition = phonesWrapper.getBoundingClientRect().top - (window.innerHeight * 5 / 6);
    if (phonesWrapperPosition < 0) {
        phonesWrapper.classList.add('phones-visible');
        phonesButton.classList.add('profile-system-btn-visible');
    } else {
        phonesWrapper.classList.remove('phones-visible');
        phonesButton.classList.remove('profile-system-btn-visible');
    }

    featureCallouts.forEach((callout) => {
        let calloutPosition = callout.getBoundingClientRect().top - (window.innerHeight * 5 / 6);

        if (calloutPosition < 0) {
            callout.classList.add('callout-visible');
        } else {
            callout.classList.remove('callout-visible');
        }
    });
}

// Function to handle showcase animations
function showcaseAnimations() {
    let showcasePosition = showcase.getBoundingClientRect().top - (window.innerHeight * 5 / 6);
    if (showcasePosition < 0) {
        showcase.classList.add('showcase-visible');
    } else {
        showcase.classList.remove('showcase-visible');
    }
}

// Function to handle scroll effects
function handleScrollEffects() {
    let scrollPosition = window.scrollY;

    // Phone section animations
    phoneSectionAnimations();

    // Showcase animations
    showcaseAnimations();

    // Calculate transform position for setupParallax
    calculateSetupParallaxPosition();

    // Calculate transform positions for whyUsParallaxLayers
    calculateWhyUsParallaxLayers(scrollPosition);

    // Calculate transform position for whyUs
    calculateWhyUsPosition(scrollPosition);

    // Calculate transform positions for phones
    calculatephones(scrollPosition);

    // Determine nav fold status
    navFoldStatus(scrollPosition);
}

// Call handleScrollEffects once on page load to position elements correctly
handleScrollEffects();

// Call handleScrollEffects on scroll event
window.addEventListener('scroll', handleScrollEffects);

// Function to determine nav fold status
function navFoldStatus(scrollPosition) {
    if (scrollPosition === 0) {
        profileBtn.classList.remove('profile-btn-hidden');
        navBurger.classList.remove('fa-bars-active');
        Object.values(navOptions).forEach((option, index) => {
            setTimeout(() => {
                option.classList.remove('nav-text-hidden');
            }, index * 50);
        });
    } else if (profileBtn.classList.contains('profile-btn-hidden')) {
        return;
    } else {
        profileBtn.classList.add('profile-btn-hidden');
        navBurger.classList.add('fa-bars-active');
        Object.values(navOptions).forEach((option, index) => {
            setTimeout(() => {
                option.classList.add('nav-text-hidden');
            }, index * 50);
        });
    }
}

// Function to calculate transform position for setupParallax
function calculateSetupParallaxPosition() {
    let anchor = 0 - (setupSection.getBoundingClientRect().top - window.innerHeight / 2);
    let parallaxPosition = anchor * (5 / 6) - 400;

    if (anchor < 0) {
        parallaxPosition = -400;
    } else if (anchor > 2400) {
        parallaxPosition = 1600;
    }

    setupParallax.style.transform = `translateX(-50%) translateY(${parallaxPosition}px)`;
}

// Function to calculate transform positions for whyUsParallaxLayers
function calculateWhyUsParallaxLayers(scrollPosition) {
    const scrollDelta = scrollPosition - 3800;
    let parallaxPositions = {
        minus2: 50 - scrollDelta * (1 / 15),
        minus1: 100 - scrollDelta * (2 / 15),
        plus1: scrollDelta * (3 / 15) - 150,
        plus2: scrollDelta * (4 / 15) - 200
    };

    if (scrollPosition < 3800) {
        parallaxPositions = {
            minus2: 50,
            minus1: 100,
            plus1: -150,
            plus2: -200
        };
    } else if (scrollPosition > 5300) {
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

// Function to calculate transform position for whyUs
function calculateWhyUsPosition(scrollPosition) {
    const scrollDelta = scrollPosition - 5200;
    let parallaxPosition = 0 - scrollDelta;

    if (scrollPosition < 5200) {
        parallaxPosition = 0;
    } else if (scrollPosition > 5550) {
        parallaxPosition = -350;
    }

    whyUs.style.transform = `translateY(${parallaxPosition}px)`
}

// Function to calculate transform positions for phones
function calculatephones() {
    let anchor = 0 - (phoneSection.getBoundingClientRect().top - window.innerHeight);
    let parallaxPositions = {
        phone1: 50 - (anchor - 700) * (1 / 20),
        phone2: (anchor - 700) * (1 / 20) - 50,
        phone3: 50 - (anchor - 700) * (1 / 20),
        phone4: (anchor - 700) * (1 / 20) - 50,
        phone5: 50 - (anchor - 700) * (1 / 20)
    };

    if (anchor < 700) {
        parallaxPositions = {
            phone1: 50,
            phone2: -50,
            phone3: 50,
            phone4: -50,
            phone5: 50
        };
    } else if (anchor > 1700) {
        parallaxPositions = {
            phone1: 0,
            phone2: 0,
            phone3: 0,
            phone4: 0,
            phone5: 0
        };
    }

    Object.keys(phones).forEach(phone => {
        let transformValue = parallaxPositions[phone];
        phones[phone].style.transform = `translateY(${transformValue}px)`;
    });
}

// Other animations and effects

// Nav menu animations
navBurger.addEventListener('click', () => {
    if (navMenu.classList.contains('nav-menu-unrolled')) {
        navMenu.classList.remove('nav-menu-unrolled');
        document.documentElement.style.overflow = 'auto';
    } else {
        navMenu.classList.add('nav-menu-unrolled');
        document.documentElement.style.overflow = 'hidden';
    }
});

// Card focus animation
const cards = document.querySelectorAll('.wavetag-showcase-cards');

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
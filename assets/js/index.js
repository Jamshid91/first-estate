let openLanguage = document.querySelector('header .language');
let languageBg = document.querySelector('.language-bg');
let burger = document.querySelector('header .burger');
let mobileHeader = document.querySelector('.mobile-header-item');
let mobileHeaderMenu = document.querySelector('.mobile-header-menu');
let mobileHeaderLang = document.querySelector('.mobile-header-language');

openLanguage.addEventListener('click', () => {
    languageBg.classList.add('openLanguageBg')
});

burger.addEventListener('click', () => {
    burger.classList.toggle('rotateBurger');
    mobileHeader.classList.toggle('openMobileHeader')
});

mobileHeaderLang.addEventListener('click', () => {
    mobileHeaderLang.children[1].style.display = 'block';
    mobileHeaderMenu.children[1].style.display = 'none';
});

mobileHeaderMenu.addEventListener('click', () => {
    mobileHeaderLang.children[1].style.display = 'none';
    mobileHeaderMenu.children[1].style.display = 'block';
});
// End menu mobile

// Start Carouel
class Carouel {
    constructor({
        main, 
        wrap, 
        next, 
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.carousels = document.querySelector(wrap).children;
        this.position = position;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.carousels.length - this.slidesToShow
        }
        this.responsive = responsive;
    }

    init() {
        this.addMyClass();
        this.addStyle();
        if(this.next && this.prev) {
            this.controlSlider();
        }

        if(this.responsive) {
            this.responseInit();
        }
        console.log(this.carousels)
    }

     addMyClass() {
         this.main.classList.add('main');
         this.wrap.classList.add('wrap');
        for(const item of this.carousels) {
            item.classList.add('my-carousel-list')
        }
    }

    addStyle() {
        let style = document.getElementById('carousel-style');
            style = document.createElement('style');
            style.id = 'carousel-style';

        style.textContent = `
            .main {
                overflow: hidden
            }

            .wrap {
                display: flex;
                transition: transform .5s;
                will-change: transform;
            }

            .my-carousel-list {
                flex: 0 0 ${this.options.widthSlide}%;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.next.addEventListener('click', this.nextSlider.bind(this));
        this.prev.addEventListener('click', this.prevSlider.bind(this));
    }

    nextSlider() {
        if(this.options.position < this.carousels.length - this.slidesToShow) {
        ++this.options.position
        console.log( ++this.options.position)
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }


    nextSlider() {
        if(this.options.infinity || this.options.position < this.options.maxPosition) {
        ++this.options.position
            if(this.options.position > this.options.maxPosition) {
                this.options.position = 0
            }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    prevSlider() {
        if(this.options.infinity || this.options.position > 0) {
        --this.options.position
        if(this.options.position < 0) {
            this.options.position = this.options.maxPosition
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allRespone = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allRespone);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;

            if(widthWindow < maxResponse) {
                for(let i = 0; i < allRespone.length; i++) {
                    if(widthWindow < allRespone[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    } 
                }
            } 
            else {
                this.slidesToShow = slidesToShowDefault
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        }

        checkResponse();

        window.addEventListener('resize', checkResponse)
    }
}

const carousel = new Carouel({
    main: '.carousel-wrapper',
    wrap: '.carousel-item',
    next: '.next',
    prev: '.prev',
    slidesToShow: 3,
    infinity: true,
    responsive: [
        {
        breakpoint: 1024,
        slidesToShow: 3
        },
        {
        breakpoint: 769,
        slidesToShow: 2
        },
        {
        breakpoint: 576,
        slidesToShow: 1
        }
]
});
carousel.init();
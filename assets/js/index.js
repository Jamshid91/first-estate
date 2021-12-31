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
// End Carousel

// Start Form
let form = document.getElementById('form');
let userName = document.getElementById('userName');
let userPhone = document.getElementById('userPhone');
let userEmail = document.getElementById('userEmail');
let message = document.getElementById('message');
let submitBtn = document.getElementById('submitForm')


submitBtn.addEventListener('click', () => {
  checkInputs()

  let successName = userName.parentElement.children[1].classList;
  let successEmail = userEmail.parentElement.children[1].classList;
  let successPass = userPhone.parentElement.children[1].classList;
  let successMessage = message.parentElement.children[1].classList;

  if(successName == 'success' && successEmail == 'success' && successPass == 'success' && successMessage == 'success') {
    submitBtn.type = 'submit'
  }
});

function checkInputs() {
  const userNameValue = userName.value.trim();
  const userEmailValue = userEmail.value.trim();
  const userPhoneValue = userPhone.value.trim();
  const messageValue = message.value.trim();


  if(userNameValue === '' || userNameValue.length <= 2) {
    setErrorFor(userName, "Введите ваше имя")
  } else {
    setSuccesFor(userName)
    userName.parentElement.children[1].classList.add('success')
  }

  if(userEmailValue === '') {
    setErrorFor(userEmail, "Введите ваш электронной почты")
  }
  else if(!isEmail(userEmailValue)) {
    setErrorFor(userEmail, 'Некорректный эл. почта')
  }
  else {
    setSuccesFor(userEmail)
    userEmail.parentElement.children[1].classList.add('success')
  }

  if(userPhoneValue === '' || userPhoneValue.length < 4) {
    setErrorFor(userPhone, "Введите ваше номер")
  } else {
    setSuccesFor(userPhone)
    userPhone.parentElement.children[1].classList.add('success')
  }
  
  if(messageValue === '') {
    setErrorFor(message, "Оставьте свой отзыв")
  }
  else if(messageValue.length < 20) {
    setErrorFor(message, "введите не менее 20 символов")
  }
  else {
    setSuccesFor(message)
    message.parentElement.children[1].classList.add('success')
  }
}

function setErrorFor(input, message) {
let small = input.parentElement.children[1]

    input.classList.add('inputError');

    small.innerText = message
}

function setSuccesFor(input) {
let small = input.parentElement.children[1]
    input.classList.remove('inputError');
    input.classList.add('inputSucces');

    small.innerText = ''

} 

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// End Form
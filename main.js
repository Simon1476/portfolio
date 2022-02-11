'use strict';

// Make navber transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {  
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null ) {
        return;
    }

    scrollIntoView(link);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () =>{
    scrollIntoView('#contact');
});



// Make home slowly fade to transparent as the window scrolls down
const homeSection = document.querySelector('.home__container');
const homeSectionHeight = homeSection.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    homeSection.style.opacity = 1 - window.scrollY / homeSectionHeight; 
});

// Show "arrow up" button when scrolling down
const arrowBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {  
    if(window.scrollY > navbarHeight){
        arrowBtn.classList.add('visible');
    } else {
        arrowBtn.classList.remove('visible');
    }
});

// Make arrow function go to the top of the page
arrowBtn.addEventListener('click', ()=>{
    scrollIntoView('#home');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
}


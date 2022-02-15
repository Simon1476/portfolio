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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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


//Projects 
const workBtnCotainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnCotainer.addEventListener('click', (e) =>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName ==='BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=> {
        projects.forEach((project) => {
            if(filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
    
});




// 프로젝트 목록 보이기 도전 내가 한 코드 
// 가독성이 좋지 않고, 자주 출현하는 반복문
// const categoryBtn = document.querySelectorAll('.category__btn');
// const projectList = document.querySelectorAll('.project');
// console.log(projectList[0].dataset.kind);
// // console.log(categoryBtn);
// // console.log(projectList);
// for(var i=0; i < categoryBtn.length; i++){
//     categoryBtn[i].addEventListener('click', (event)=>{
//         const target = event.target;
//         const kind = target.dataset.kind;
//         if (kind === "all"){
//             for(var i=0; i<projectList.length; i++){
//                   projectList[i].style.display ='block';
//             }
//             return;
//         }
        
//         for(let i=0; i < projectList.length; i++){
//             if(kind != projectList[i].dataset.kind) {
//                 projectList[i].style.display ='none';
//             } else {
//                 projectList[i].style.display ='block';
//             }
//         }
        
//     });
// }


// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserv를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다. 

const sectionIds = [
    '#home',
    '#about', 
    '#skills', 
    '#work', 
    '#testimonial', 
    '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
);


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions ={
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersection && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            console.log(entry);
            console.log(`index: ${index},entry.boundingClientRect.y ${entry.boundingClientRect.y} `);
            // 스크롤링이 아래로 되어서 페이지가 올라움
            if(entry.boundingClientRect.y < 0 ) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        } 
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

 window.addEventListener('wheel', () => {
     if(window.scrollY === 0) {
        selectedNavIndex = 0;
     } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
         selectedNavIndex = navItems.length - 1;
     }
     selectNavItem(navItems[selectedNavIndex]);
 });
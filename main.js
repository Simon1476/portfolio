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
    console.log(e.target.nodeName);
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


// categoryBtn.addEventListener('click', (event)=> {
//     const target = event.target;
//     const kind = target.dataset.kind;
//     console.log(`Kind is ${kind}`);
// });



function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
}




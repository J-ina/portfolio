const sections = document.querySelectorAll('section');
const sectionArray = Array.from(sections);
const home = document.querySelector('#home');

typeHello();
sections.forEach( section => section.addEventListener('wheel',smoothScroll));
document.addEventListener('scroll',moveDot);
home.addEventListener('wheel', scrollDown);
aboutNav();

function typeHello () {
  const typingEl = document.querySelector('.hello');
  const textArray = ('Hello!').split('');
  let i = 0;

  setInterval(() => {
    if ( i < textArray.length) {
      typingEl.innerText += textArray[i];
      i++;
    }
  },200);
}

function scrollDown (event) {
  const scrollTxt = document.querySelector('.scrollDown');
  let delta = event.deltaY;

  if (delta > 0) {
      scrollTxt.style.display = 'none';
    } else {
      scrollTxt.style.display = 'block';
    }
}

function moveDot () {
  const colorDot = document.querySelector('.dots > .on');
  const scrollLocation = window.scrollY;
  const browserHeight = window.innerHeight;
  const page = Math.trunc(scrollLocation/browserHeight);
  
  colorDot.style.top = `${15 * page}px`;
}

function smoothScroll (event) {
  let i = sectionArray.indexOf(this);
  let delta = event.deltaY;

  event.preventDefault();

  if (delta > 0) {
    let nextSection, nextSectionTop;
    
    if (i < sectionArray.length - 1) {
      nextSection = this.nextElementSibling;
    } else {
      return;
    }
    nextSectionTop = window.scrollY + nextSection.getBoundingClientRect().top;
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: nextSectionTop
    })
  } else if (delta < 0) {
    let prevSection, prevSectionTop;

    if (i > 0) {
      prevSection = this.previousElementSibling;
    } else {
      return;
    }
    prevSectionTop = window.scrollY + prevSection.getBoundingClientRect().top;
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: prevSectionTop
    })
  }
}

function aboutNav () {
  const nav = document.querySelectorAll('.snb > li');
  const navArray = Array.from(nav);
  const aboutPages = document.querySelectorAll('.aboutWrap > *');

  nav.forEach( menu => menu.addEventListener('click', (event) => {
    let i = navArray.indexOf(event.target);

    aboutPages.forEach(page => page.style.opacity = '0');
    aboutPages[i].style.opacity = '1';
    nav.forEach(menu => menu.classList.remove('on'));
    event.target.classList.add('on');
  }))
}


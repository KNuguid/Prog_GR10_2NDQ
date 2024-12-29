let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let tabs = document.querySelectorAll('.tab');
let container = document.querySelector('.container');
let heightDefault = container.offsetHeight;
let topBefore = 0;
let body = document.querySelector('body');

window.addEventListener('wheel', function(event){
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY/3) * scrollSpeed;
    window.scrollTo(0, scrollValue);
    let top = scrollValue;
    listBg.forEach((bg, index) => {
        if(index != 0){
            bg.animate({
                transform: `translateY(${(-top*index)}px)`
            }, { duration: 1000, fill: "forwards" });
        }
        if(index == listBg.length - 1){
            tabs.forEach(tab => {
                tab.animate({
                    transform: `translateY(${(-top*index)}px)`
                }, { duration: 500, fill: "forwards" });
            })

            if(topBefore < top){
                setHeight = heightDefault-window.scrollY*index;
                container.animate({
                    height: `${(setHeight + 100)}px`
                }, { duration: 50, fill: "forwards" });
                topBefore = window.scrollY;
            }
        }
        tabs.forEach((tab, index) => {
            // console.log(tab.offsetTop - top, window.innerHeight); para sa cons trieeee
            if((tab.offsetTop - top) <= window.innerHeight*(index+1)){
                let content = tab.getElementsByClassName('content')[0];
                let transformContent = window.innerHeight*(index+1) - (tab.offsetTop - top);
                console.log(tab);
                content.animate({
                    transform: `translateY(${(-transformContent + (100*index))}px)`
                }, { duration: 500, fill: "forwards" });
            }
        })
    })
}, { passive: false });  const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  slides.forEach(slide => slide.querySelector('.caption').classList.remove('show'));

  dots[currentIndex].classList.add('active');
  slides[currentIndex].querySelector('.caption').classList.add('show');
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.getAttribute('data-index'));
    updateCarousel();
  });
});
setInterval(nextSlide, 3000); 
updateCarousel();

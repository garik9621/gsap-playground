const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
    lenis.raf(time)
    ScrollTrigger.update();
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const section1 = document.querySelector('#section1')
const aside = document.querySelector('#aside');
const timeline = gsap.timeline({paused: true});

timeline.fromTo(
    aside, 
    {y: 0},
    {y: `170vh`, duration: 1, ease: 'none'},
    0
);

const scroll1 = ScrollTrigger.create({
    animation: timeline,
    trigger: section1,
    start: 'top top',
    end: 'bottom center',
    scrub: true,
});   

//----------------


console.log(123);

const sliderSection = document.getElementById('slider');
const sliderItems = gsap.utils.toArray('.slider-item');

gsap.to(sliderItems, {
        x: -100 * (sliderItems.length - 1),
        ease: 'sine.out',
        scrollTrigger: {
            trigger: '#slider',
            scrub: true, 
            pin: true,
            snap: 1 / (sliderItems.length - 1),
            start: 'top',
            end: '+=' + sliderSection.offsetWidth
        }
    }
)

//------


const zoomOutSection = document.getElementById('zoom-out');
const zoomInSection = document.getElementById('zoom-in');

gsap.from('#zoom-out h2', {
    scale: 50,
    stager: 0.25,
    duration: 3,
    scrollTrigger: {
        trigger: '#zoom-out',
        pin: true,
        end: `+=${window.innerHeight * 1.3}`,
        scrub: 3
    }
})

gsap.to('#zoom-in h2', {
    scale: 50,
    stager: 0.25,
    duration: 3,
    scrollTrigger: {
        trigger: '#zoom-in',
        pin: true,
        end: `+=${window.innerHeight * 1.3}`,
        scrub: 3,
    }
})


//------------------------------------------

const videoInfo = {
    totalFrames: 440,
    totalTime: 7,
    images: [],
    currentFrame: 0,
    currentImage: (index) => 
    `./dognuts/Dognut${index.toString().padStart(3, '0')}.jpg`,
}

const canvas = document.querySelector('#canvas')

if (canvas) {
    const canvasContext = canvas.getContext('2d');

    canvas.height = screen.height;
    canvas.width = screen.width;
    
    for (let i = 0; i <= videoInfo.totalFrames; i++) {
        const img = new Image();
        img.src = videoInfo.currentImage(i)
        videoInfo.images.push(img);
    }
    
    gsap.to(videoInfo, {
        currentFrame: videoInfo.totalFrames,
        snap: 'currentFrame',
        ease: 'none',
        scrollTrigger: {
            trigger: canvas,
            start: 'top',
            end: `bottom+=${videoInfo.totalFrames * videoInfo.totalTime}`,
            pin: true,
            scrub: 2
        },
        onUpdate: render
    });
    
    videoInfo.images[0].onload = () => {
        canvasContext.drawImage(videoInfo.images[0], 0, 0)
    }
    
    function render() {
        console.log('render ', videoInfo.currentFrame);
     canvasContext.drawImage(videoInfo.images[videoInfo.currentFrame], 0, 0)
    }
    
}
//----------------------

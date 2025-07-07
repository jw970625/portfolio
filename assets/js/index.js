/* 디지털 시계 */
function updateClock() {
  const now = new Date();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  let ampm = 'AM';
  let displayHours = hours;
  
  if (hours >= 12) {
    ampm = 'PM';
    displayHours = hours % 12;
    if (displayHours === 0) {
    displayHours = 12;
    }
  }
  const timeString = `${displayHours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('clock').textContent = timeString;
}

// 매 초마다 시계 업데이트
setInterval(updateClock, 1000);

// 페이지 로드 시에도 시계 업데이트
updateClock();

/* gsap 화면 겹치는 이벤트 */

//(3) splitting
$(function(){Splitting();});

//(4) scrollTrigger
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

gsap.utils.toArray('.sec').forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    pin: true,
    pinSpacing: false,
    scrub: true,
    invalidateOnRefresh: true,
  });
});

//(5)스냅기능
ScrollTrigger.create({
  snap: {
      snapTo: (progress, self) => {
          let panelStarts = tops.map(st => st.start),
          snapScroll = gsap.utils.snap(panelStarts, self.scroll());
          return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
      },
      duration: 0.5
  }
});

/* gsap 마우스포인트 이벤트 */
gsap.registerPlugin(ScrollTrigger);

let activeImage;

gsap.utils.toArray('.list').forEach((elem) => {
  let image = elem.querySelector('img.fade');

  let align = e => {
    gsap.set(image, {
      x: e.clientX,
      y: e.clientY
    });
  };

  const startPoint = () => document.addEventListener('mousemove', align),
        stopPoint = () => document.removeEventListener('mousemove', align);

  let fade = gsap.to(image, {autoAlpha: 0.8, ease: 'none', paused: true});

  elem.addEventListener('mouseenter', (e) => {
    fade.play();

    if (activeImage) {
      gsap.set(image, {
        x: gsap.getProperty(activeImage, "x"),
        y: gsap.getProperty(activeImage, "y")
      });
    }

    activeImage = image;
    gsap.quickTo(image, "x", {duration: 0.5, ease: "elastic"});
    gsap.quickTo(image, "y", {duration: 0.5, ease: "elastic"});

    align(e);
    startPoint();
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    stopPoint();
  });
});

$(document).on('click', 'a[href="#"]', function(e){
  e.preventDefault();
});


const scrollElements = document.querySelectorAll(".js-scroll");

const appearElements = document.querySelectorAll(".js-appear");

scrollElements.forEach((el) => {
  el.style.left = "-1700px";
  el.style.opacity = 0;
});

appearElements.forEach((el) => {
  el.style.opacity = 0;
});

var delay = 0;

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/120))
  );
};

const displayScrollElement = (element) => {
  element.style.left = 0;
  element.style.opacity = 1;
  }

const displayAppearElement = (element) => {
  element.style.opacity = 1;
  }  
  
const handleAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
        setTimeout(() => {
            displayScrollElement(el);
        }, delay);      
      if (delay < 1000) {delay += 500;}
  }});
  appearElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayAppearElement(el);
    }
  });
}

//Función throttle para optimizar rendimiento
//initialize throttleTimer as false
let throttleTimer = false;
const throttle = (callback, time) => {

    //don't run the function while throttle timer is true
    if (throttleTimer) return;

    //first set throttle timer to true so the function doesn't run
    throttleTimer = true;
    setTimeout(() => {

        //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
        callback();
        throttleTimer = false;
	}, time);

}

window.addEventListener('scroll', () => {
  throttle(handleAnimation, 250);
})


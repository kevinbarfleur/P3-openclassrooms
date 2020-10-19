import "normalize.css";

// Declatations
const imgContent = document.querySelectorAll(".img-content-hover");
const reserveButton = document.querySelector(".reserve-button");
const aboutPopup = document.querySelector(".content-popup");
const closeAboutPopup = document.querySelector(".close-about-popup");
// Hover effect for images
const showImgContent = (event) => {
  let x;
  let y;

  for (let i = 0; i < imgContent.length; i++) {
    x = event.pageX;
    y = event.pageY;
    imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
};

document.addEventListener("mousemove", showImgContent);

// Popup navigation animation
const handleReserveButton = (event) => {
  event.preventDefault();

  aboutPopup.classList.add("active");
  console.log("test");
};

const handleClosingPopup = (event) => {
  event.preventDefault();
  aboutPopup.classList.remove("active");
};

reserveButton.addEventListener("click", handleReserveButton);
closeAboutPopup.addEventListener("click", handleClosingPopup);

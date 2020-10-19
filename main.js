import "normalize.css";

const imgContent = document.querySelectorAll(".img-content-hover");

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

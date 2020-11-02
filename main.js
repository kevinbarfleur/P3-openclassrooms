import "normalize.css";

// Declatations
const imgContent = document.querySelectorAll(".img-content-hover");
const reserveButton = document.querySelector(".reserve-button");
const aboutPopup = document.querySelector(".content-popup");
const closeAboutPopup = document.querySelector(".close-about-popup");
const filmsList = document.querySelector(".filmslist");
const popupsContainer = document.querySelector(".popups-container");

let films;
let filmsPopups;
let closePupups;
let filmsPopupsContent;
let filmsReserveButtons;

// Films request
const baseURL = "https://sampleapis.com/movies/api/classic";
const filmImageTemplate = (film) => `
              <div class="film">
                <img class="film-image" src="${film.posterURL}" alt="${film.title} poster" />
              </div>
`;

const filmPopupsTemplate = (film) => `
                <div class="film-popup">
                  <div class="film-popup-content">
                    <div class="close-pupups">
                    &#8592; Fermer
                    </div>
                    <div class="left">
                      <img class="popup-film-image" src="${film.posterURL}" alt="${film.posterURL} poster" />
                    </div>
                    <div class="right">
                      <h3 class="film-title">${film.title}</h3>
                      <p class="description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                      reiciendis nulla! Hic nemo repudiandae ullam architecto ratione
                      numquam distinctio a, suscipit quam eius modi voluptate cumque
                      iste cupiditate ex dolor.
                      </p>
                      <button class="film-reserve-button">Reserver</button>
                    </div>
                  </div>
                </div>
`;

const filmReservationTemplate = (film) => `
  <div class="film-content-reserve">
    <h3>Je reserve ma place !</h3>
    <select name="" id="">
      <option value="">Date 1</option>
      <option value="">Date 2</option>
      <option value="">Date 3</option>
    </select>
  </div>
`;

fetch(baseURL)
  .then((resp) => resp.json())
  .then((data) => {
    handleFilms(data);
  });

const handleFilms = (data) => {
  // Get only 12
  for (let i = 9; i < 21; i++) {
    // Start at 9 because of some missing API images between 1 and 9
    filmsList.innerHTML += filmImageTemplate(data[i]);
    popupsContainer.innerHTML += filmPopupsTemplate(data[i]);
  }

  films = document.querySelectorAll(".film");
  filmsPopups = document.querySelectorAll(".film-popup");
  filmsPopupsContent = document.querySelectorAll(".film-popup-content");
  closePupups = document.querySelectorAll(".close-pupups");
  filmsReserveButtons = document.querySelectorAll(".film-reserve-button");

  films.forEach((film, index) => {
    film.addEventListener("click", () => {
      filmsPopups[index].classList.add("active");

      setTimeout(() => {
        filmsPopups[index].style.opacity = 1;
        filmsPopupsContent[index].classList.add("active");
      }, 100);
    });
  });

  //filmsReserveButtons.forEach("click", () => {});

  filmsPopups.forEach((sideOfPopup, index) => {
    sideOfPopup.addEventListener("click", (event) => {
      console.log(event.target);
      if (event.target.classList.contains("film-popup")) {
        filmsPopupsContent[index].classList.remove("active");

        setTimeout(() => {
          filmsPopups[index].style.opacity = 0;
        }, 20);
        setTimeout(() => {
          filmsPopups[index].classList.remove("active");
        }, 400);
      }
    });
  });

  closePupups.forEach((closeButton, index) => {
    closeButton.addEventListener("click", () => {
      filmsPopupsContent[index].classList.remove("active");

      setTimeout(() => {
        filmsPopups[index].style.opacity = 0;
      }, 20);
      setTimeout(() => {
        filmsPopups[index].classList.remove("active");
      }, 400);
    });
  });
};

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
};

const handleClosingPopup = (event) => {
  event.preventDefault();
  aboutPopup.classList.remove("active");
};

reserveButton.addEventListener("click", handleReserveButton);
closeAboutPopup.addEventListener("click", handleClosingPopup);

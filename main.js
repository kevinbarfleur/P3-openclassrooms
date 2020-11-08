import "normalize.css";

// Declatations
const container = document.querySelector(".container");
const imgContent = document.querySelectorAll(".img-content-hover");
const reserveButton = document.querySelector(".reserve-button");
const aboutPopup = document.querySelector(".content-popup");
const closeAboutPopup = document.querySelector(".close-about-popup");
const filmsList = document.querySelector(".filmslist");
const popupsContainer = document.querySelector(".popups-container");
const aboutButton = document.querySelector(".about-button");
const contactPopup = document.querySelector(".contact");
const closeContactPopup = document.querySelector(".close-contact-popup");

let films;
let filmsPopups;
let closePupups;
let filmsPopupsContent;
let filmReserveContent;
let filmsReserveButtons;
let filmInfoContent;
let reserveForm;

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
                    &#8592; Retour
                    </div>
                    <div class="film-content-info">
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
                      <button class="classic-button film-reserve-button">Reserver</button>
                    </div>
                    </div>
                    <div class="film-content-reserve">
                      <h3 class="film-title">${film.title}</h3>
                      <h4>Je reserve ma place !</h4>
                      <form class="reserveForm">
                        <label for="date-select">Entrez votre adresse email:</label></br>
                        <input required type="email" id="email" placeholder='email@gmail.com'></input></br>
                        <label for="date-select">Choisisez une date:</label></br>
                        <select required value='6 Aout 2021' name="dates" id="date-select">
                          <option value="6 Aout 2021">6 Aout 2021</option>
                          <option value="7 Aout 2021">7 Aout 2021</option>
                          <option value="8 Aout 2021">8 Aout 2021</option>
                        </select></br>
                        <label for="peoples-select">Nombre de personnes:</label></br>
                        <select required value='1' name="peoples" id="peoples-select">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select></br>
                        <button type="submit" class="classic-button confirm-reserve">
                          Confirmer
                        </button>
                      </form>
                  </div>
                  </div>
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
  filmReserveContent = document.querySelectorAll(".film-content-reserve");
  filmInfoContent = document.querySelectorAll(".film-content-info");
  reserveForm = document.querySelectorAll(".reserveForm");

  films.forEach((film, index) => {
    film.addEventListener("click", () => {
      filmsPopups[index].classList.add("active");

      setTimeout(() => {
        filmsPopups[index].style.opacity = 1;
        filmsPopupsContent[index].classList.add("active");
      }, 100);
    });
  });

  filmsReserveButtons.forEach((film, index) => {
    film.addEventListener("click", () => {
      filmReserveContent[index].style.display = "flex";
      filmReserveContent[index].classList.add("active");
      filmInfoContent[index].classList.add("hidden");

      setTimeout(() => {
        filmReserveContent[index].style.opacity = 1;
      }, 20);
    });
  });

  filmsPopups.forEach((sideOfPopup, index) => {
    sideOfPopup.addEventListener("click", (event) => {
      console.log(event.target);
      if (event.target.classList.contains("film-popup")) {
        filmsPopupsContent[index].classList.remove("active");
        filmReserveContent[index].classList.remove("active");
        filmInfoContent[index].classList.remove("hidden");

        setTimeout(() => {
          filmsPopups[index].style.opacity = 0;
          filmReserveContent[index].style.opacity = 0;
        }, 20);
        setTimeout(() => {
          filmsPopups[index].classList.remove("active");
          filmReserveContent[index].style.display = "none";
        }, 400);
      }
    });
  });

  closePupups.forEach((closeButton, index) => {
    closeButton.addEventListener("click", () => {
      filmReserveContent[index].classList.remove("active");
      filmInfoContent[index].classList.remove("hidden");

      setTimeout(() => {
        filmReserveContent[index].style.opacity = 0;
      }, 20);
      setTimeout(() => {
        filmReserveContent[index].style.display = "none";
      }, 400);
    });
  });

  reserveForm.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      displayConfirmNotification(event.target);
    });
  });
};

// Confirm reserve Notification
const displayConfirmNotification = (data) => {
  const confirmationTemplate = `
    <div class="notificationPopup">
      Merci d'avoir réservé le <b>${data[1].value}</b> pour <b>${data[2].value}</b> personne(s) ! Un mail de confirmation va vous
      être envoyé.
    </div>
  `;

  container.innerHTML += confirmationTemplate;
  const el = document.querySelector(".notificationPopup");

  setTimeout(() => {
    el.classList.add("active");
    setTimeout(() => {
      el.classList.remove("active");
      setTimeout(() => {
        document.location.reload(true);
      }, 2000);
    }, 5000);
  }, 200);
};

// About popup
aboutButton.addEventListener("click", () => {
  contactPopup.style.display = "block";

  setTimeout(() => {
    contactPopup.classList.add("active");
  }, 20);
});

closeContactPopup.addEventListener("click", () => {
  contactPopup.classList.remove("active");
  contactPopup.style.display = "block";

  setTimeout(() => {
    contactPopup.style.display = "none";
  }, 500);
});

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

// check if there is localStorage color option

const mainColors = localStorage.getItem("color-option");
if (mainColors != null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // check for active class
  //remove active class from all colors list itemmainColors
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data-color == local Storage item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// random background option
let BackgroundOption = true;

// variable to control the intervel
let theInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");
// check if random background localStorage is not empty
if (backgroundLocalItem != null) {
  if (backgroundLocalItem == "true") {
    BackgroundOption = true;
  } else {
    BackgroundOption = false;
  }

  // remove active class from all button
  document.querySelectorAll(".button button").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem == "true") {
    document.querySelector(".button .yes").classList.add("active");
  } else {
    document.querySelector(".button .no").classList.add("active");
  }
}
// open and close nav

function openCloseNav() {
  let nav = document.getElementById("nav");
  let menu = document.getElementById("menu");

  document.addEventListener("scroll", function () {
    nav.classList.remove("active");
    menu.classList.remove("active");
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".clock").style.visibility = "visible";
    document.querySelector(".setting-box").style.visibility = "visible";
  });
  menu.addEventListener("click", function (e) {
    // stop propagation
    e.stopPropagation();

    nav.classList.toggle("active");
    this.classList.toggle("active");

    if (nav.classList.contains("active")) {
      document.querySelector(".clock").style.visibility = "hidden";
      document.querySelector(".setting-box").style.visibility = "hidden";
      document.querySelector(".overlay").style.display = "block";
    } else {
      document.querySelector(".clock").style.visibility = "visible";
      document.querySelector(".setting-box").style.visibility = "visible";
      document.querySelector(".overlay").style.display = "none";
    }
  });
}
openCloseNav();

// click anywhere outside nav and toggle menu

document.addEventListener("click", (e) => {
  if (e.target !== menu && e.target !== nav) {
    nav.classList.remove("active");
    menu.classList.remove("active");
    document.querySelector(".clock").style.visibility = "visible";
    document.querySelector(".setting-box").style.visibility = "visible";
    document.querySelector(".overlay").style.display = "none";
  } else {
    document.querySelector(".overlay").style.display = "block";
  }
});

// stop propagation on nav
nav.onclick = function (e) {
  e.stopPropagation();
};

// open and close setting

function openCloseGear() {
  let setting = document.getElementById("setting");

  setting.classList.toggle("active");

  if (setting.classList.contains("active")) {
    document.querySelector(".overlay").style.display = "block";
  } else {
    document.querySelector(".overlay").style.display = "none";
  }
}

// switch colors

let colorsList = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsList.forEach((li) => {
  // click on every list item
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on localStorage
    localStorage.setItem("color-option", e.target.dataset.color);

    //remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // add active class on self
    e.target.classList.add("active");
  });
});

// switch random background option

let randomBackGroundEl = document.querySelectorAll(".button button");
// loop on all list buttons
randomBackGroundEl.forEach((button) => {
  // click on every button
  button.addEventListener("click", (e) => {
    //remove active class from all buttons
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // add active class on self
    e.target.classList.add("active");
    if (e.target.dataset.background == "yes") {
      BackgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background-option", true);
    } else {
      BackgroundOption = false;
      clearInterval(theInterval);

      localStorage.setItem("background-option", false);
    }
  });
});

// random background option
function randomizeImgs() {
  if (BackgroundOption == true) {
    // random background color
    // select landing page element
    let landingPage = document.querySelector(".home");

    // get array of images
    let imgArray = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.jpg",
      "12.jpg",
      "13.jpg",
    ];

    // get random number
    theInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length + 1);

      // change background-image url
      landingPage.style.backgroundImage = `url("images/${randomNumber}.jpg")`;
    }, 10000);
  }
}
randomizeImgs();

// digital clock

function clock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let flag = "AM";

  if (hours == 0) {
    hours = 12;
  }
  if (hours > 12) {
    hours = hours - 12;
    flag = "PM";
  }
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  document.querySelector(
    ".clock"
  ).innerHTML = `${hours}:${minutes}:${seconds}:${flag}`;

  setTimeout(function () {
    clock();
  }, 1000);
}
clock();

// skills progress
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer hight
  let skillsOuterHight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  //window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/////// hide

let box = document.querySelectorAll(".box .card");
let skill = document.querySelectorAll(".skills .skill-box");

document.addEventListener("scroll", function () {
  box.forEach((card) => {
    if (isINView(card)) {
      card.classList.add("visible");
    }
  });

  skill.forEach((box) => {
    if (isINView(box)) {
      box.classList.add("visible");
    }
  });
});

function isINView(element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight - 100;
}

const name_of = document.querySelector(".name");
const input = document.querySelector("input");
const foto = document.querySelector(".foto");
const derece = document.querySelector(".derece");
const hata_onscreen = document.querySelector(".hata");
const info = document.querySelector(".info");
const konum = document.querySelector(".konum");
const nem = document.querySelector(".nem");
const hissedilen = document.querySelector(".hissedilen");
const bilgikismi = document.querySelector(".bilgikismi");
let my = "c2b0789a8769eeada582f16b23432816";
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    requestApi(input.value);
  }
});
var hata;

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${my}`;

  fetch(api)
    .then((info) => info.json())
    .then((response) => {
      hata = response.cod;
      if (hata == "404") {
        console.log(hata);
        hata_onscreen.classList.remove("hide");
        input.value = "";

        setTimeout(() => {
          hata_onscreen.classList.add("hide");
          bilgikismi.style.display = "none";
        }, 1000);
      } else {
        bilgikismi.style.display = "block";

        name_of.innerText = response.name;

        getMain(response.weather[0].main);
        info.innerText = response.weather[0].main;
        derece.innerText = (response.main.temp - 273).toFixed(1);
        nem.innerText = `Humidity ${response.main.humidity} %`;
        hissedilen.innerText = `Feels like ${(
          response.main.feels_like - 273
        ).toFixed(1)}`;
      }
    })
    .catch((hata) => {});
}

function getMain(main) {
  console.log(main);
  var img;
  if (main == "Rain") {
    img = "icons/clear.svg";
    foto.src = img;
  } else if (main == "Clouds") {
    img = "icons/cloud.svg";
    foto.src = img;
  } else if (main == "Sunny") {
    img = "icons/clear.svg";
    foto.src = img;
  } else {
    img = "icons/clear.svg";
    foto.src = img;
  }
}

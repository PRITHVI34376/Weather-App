const startbtn = document.querySelector("#start");
const search_box = document.querySelector("#searchbox");
const search_icon = document.querySelector("#search_icon");
const weather_icon = document.querySelector("#weather_icon");
const desc = document.querySelector("#description");
const temp = document.querySelector("#temperature");
const cityname = document.querySelector("#city_name");
const haze_content = document.querySelector("#haze_content");
const mist_content = document.querySelector("#mist_content");
const haze = document.querySelector("#haze");
const mist = document.querySelector("#mist");
const homebtn = document.querySelector("#go_home");
const mainbox1 = document.querySelector(".mainbox1");
const mainbox2 = document.querySelector(".mainbox2");
const mainbox3 = document.querySelector(".mainbox3");

function change_icon(weathermain){

    let icons = {
        Clouds: "images/clouds.png",
        Rain: "images/rain.png",
        Clear: "images/clear.png",
        Drizzle: "images/drizzle.png",
        Haze: "images/haze.png",
        Humidity: "images/humidity.png",
        Mist: "images/mist.png",
        Snow: "images/snow.png"
    };

    weather_icon.src = icons[weathermain] || "images/clouds.png";
}

startbtn.addEventListener("click",()=>{
  mainbox1.classList.add("inactive");
  mainbox2.classList.remove("inactive");
})

homebtn.addEventListener("click",()=>{
  mainbox3.classList.add("inactive");
  mainbox1.classList.remove("inactive");
})

search_icon.addEventListener("click", () => {
    get_weather_data(search_box.value);
});

search_box.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        get_weather_data(search_box.value);
        search_box.value = "";
    }
});

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "bfe67a2109720985cf10c21109696a6e";

async function get_weather_data(city) {
  let final_url=`${url}q=${city}&appid=${apikey}&units=metric`;
  let weatherdata=await fetch(final_url).then(res=>res.json());

  console.log(weatherdata)

  if (weatherdata.cod !== 200) {
    console.log("404 page");
    mainbox2.classList.add("inactive");
    mainbox3.classList.remove("inactive");
    return;
}

  desc.innerHTML=weatherdata.weather[0].description;
  temp.innerHTML=Math.round(weatherdata.main.temp)+"°C";
  cityname.innerHTML=weatherdata.name;
  document.querySelector("#id_haze").innerHTML= weatherdata.wind.speed+" km/h";
  document.querySelector("#id_mist").innerHTML=weatherdata.main.humidity+"%";
  change_icon(weatherdata.weather[0].main);

}
//날씨 정보를 넣는 공간을 지정해줌
const weather = document.querySelector(".js-weather");

//날씨정보 사이트에서 API 키르 가져왔음
const API_KEY = "5e93467f04d9a1aa42173251351d7b4a";
const COORDS = "coords";

//api를 사용해서 위도, 경도 정보를 입력함으로써 해당좌표의 날씨 정보를 객체형태로 가져옴
function getWeather(lat, lng) {
  //fetch 기능 ;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;

      weather.innerHTML = `${temperature}<i class="em em-mostly_sunny"></i> @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  // 위치정보가 담기 객체 정보를 매개변수로 해서 로컬스토리지에 스트링 형태로 데이터를 저장! 자바스크립트는 로컬스토리지에 데이터를 항상 스트링으로 저장하려고 함
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
  //현재 위도 경도 데이터를 각각의 변수에 담아줌
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  //각 데이터를 객체 형태로 만들어줌, 여기서 (이름: 변수) 형태로 저장하는데 이름과 변수가 같을 경우에는 아래와 같이 이름 하나만 적어주면 됨
  const coordsObj = {
    latitude,
    longitude
  };
  //생성한 객체를 아래 함수를 이용해서 로컬 스토리지에 저장!
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

//getCurrentPosition객체의 매개변수 중 하나로, 위처정보를 가져오지 못 했을때 현재 상태를 콘솔에 표시해줌!
function handleGeoError() {
  console.log("Cant access geo location");
}

//로컬 스토리지에 위치 정보가 없을때, 현재위치정보를 요청하기 위해 작동함!
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

//현재 위치 정보 유/무를 확인하고, 그에 따라 정보를 요청하거나, 해당 위치정보의 날씨정보를 요청함!
function loadCoords() {
  //로컬스토리지의 위치정보를 변수에 담아줌!
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();

const citySelect = document.getElementById("city-select");
const weatherBox = document.getElementById("weather-box");
const weatherMap = document.getElementById("weather-map");
const weatherMapLoading = document.getElementById("weather-map-loading");
const weatherLayers = ["temp", "rh", "wind"];
let selectedWeatherLayer = "temp";
let weatherLayerTimer;

// console.log("weather.js 연결 성공");

citySelect.addEventListener("change", function () {
    showCityInfo();
    resetWeatherLayerTimer();
});
weatherBox.addEventListener("click", function (event) {
    const trigger = event.target.closest(".weather-map-trigger");

    if (!trigger) {
        return;
    }

    selectedWeatherLayer = trigger.dataset.layer;
    updateWeatherLayerButtons();
    updateWeatherMap();
    resetWeatherLayerTimer();
});
weatherMap.addEventListener("load", function () {
    weatherMapLoading.classList.add("is-hidden");
});
showCityInfo(); // 페이지 열리자 마자 실행
resetWeatherLayerTimer();

function updateWeatherLayerButtons() {
    weatherBox.querySelectorAll(".weather-map-trigger").forEach(function (button) {
        const isActive = button.dataset.layer === selectedWeatherLayer;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });
}

function resetWeatherLayerTimer() {
    clearTimeout(weatherLayerTimer);

    weatherLayerTimer = setTimeout(function changeWeatherLayer() {
        const currentIndex = weatherLayers.indexOf(selectedWeatherLayer);
        const nextIndex = (currentIndex + 1) % weatherLayers.length;

        selectedWeatherLayer = weatherLayers[nextIndex];
        updateWeatherLayerButtons();
        updateWeatherMap();

        weatherLayerTimer = setTimeout(changeWeatherLayer, 12000);
    }, 12000);
}

function updateWeatherMap() {
    const selectedOption =
        citySelect.options[citySelect.selectedIndex];

    const latitude = selectedOption.dataset.latitude;
    const longitude = selectedOption.dataset.longitude;

    const params = new URLSearchParams({
        type: "map",
        location: "coordinates",
        metricRain: "mm",
        metricTemp: "°C",
        metricWind: "km/h",
        zoom: "5",
        overlay: selectedWeatherLayer,
        product: "ecmwf",
        level: "surface",
        lat: latitude,
        lon: longitude,
        detailLat: latitude,
        detailLon: longitude,
        // marker: "true",
        detail: "false",
        calendar: "now"
    });

    weatherMapLoading.classList.remove("is-hidden");
    weatherMap.src = `https://embed.windy.com/embed.html?${params.toString()}`;
}

async function showCityInfo() {
    const selectedOption =
        citySelect.options[citySelect.selectedIndex];

    const cityName = selectedOption.text;
    const latitude = selectedOption.dataset.latitude;
    const longitude = selectedOption.dataset.longitude;


    weatherBox.innerHTML = `<p>🌍 ${cityName} 날씨를 불러오는 중...</p>`;
    updateWeatherMap();


    try {
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
            `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("날씨 요청에 실패했습니다.");
        }

        const data = await response.json();
        const current = data.current;

        weatherBox.innerHTML = `
      <h4>📍 ${cityName} 날씨</h4>
      <p>↔️ 위도 (Latitude): ${latitude}</p>
      <p>↕️ 경도 (Longitude): ${longitude}</p>
      <button class="weather-map-trigger ${selectedWeatherLayer === "temp" ? "is-active" : ""}"
              type="button" data-layer="temp"
              aria-pressed="${selectedWeatherLayer === "temp"}">
        🌡️ 현재 기온: ${current.temperature_2m}℃
      </button>
      <button class="weather-map-trigger ${selectedWeatherLayer === "rh" ? "is-active" : ""}"
              type="button" data-layer="rh"
              aria-pressed="${selectedWeatherLayer === "rh"}">
        💧 습도: ${current.relative_humidity_2m}%
      </button>
      <button class="weather-map-trigger ${selectedWeatherLayer === "wind" ? "is-active" : ""}"
              type="button" data-layer="wind"
              aria-pressed="${selectedWeatherLayer === "wind"}">
        💨 풍속: ${current.wind_speed_10m} km/h
      </button>
    `;
    } catch (error) {
        weatherBox.innerHTML = `
      <p>⚠️ 날씨 정보를 가져오지 못했습니다.</p>
      <p>${error.message}</p>
    `;

        console.error(error);


    }
}

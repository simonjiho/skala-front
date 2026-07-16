const citySelect = document.getElementById("city-select");
const weatherBox = document.getElementById("weather-box");
const currentLocation = document.getElementById("current-location");

// console.log("weather.js 연결 성공");

citySelect.addEventListener("change", showCityInfo);
showCityInfo(); // 페이지 열리자 마자 실행

async function showCityInfo() {
    const selectedOption =
        citySelect.options[citySelect.selectedIndex];

    const cityName = selectedOption.text;
    const latitude = selectedOption.dataset.latitude;
    const longitude = selectedOption.dataset.longitude;


    weatherBox.innerHTML = `<p>🌍 ${cityName} 날씨를 불러오는 중...</p>`;


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
      <p>🌡️ 현재 기온: ${current.temperature_2m}℃</p>
      <p>💧 습도: ${current.relative_humidity_2m}%</p>
      <p>💨 풍속: ${current.wind_speed_10m} km/h</p>
    `;
    } catch (error) {
        weatherBox.innerHTML = `
      <p>⚠️ 날씨 정보를 가져오지 못했습니다.</p>
      <p>${error.message}</p>
    `;

        console.error(error);


    }
}

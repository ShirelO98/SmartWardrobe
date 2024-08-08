function setupWeatherForm() {
    document.getElementById('weatherForm').addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const cityNameInput = document.getElementById('cityName');
      const cityName = cityNameInput.value.trim();
      const weatherResult = document.getElementById('weatherResult');
      const errorDiv = document.getElementById('error');
  
      function isTitleCase(str) {
        return str === str.replace(/\b\w/g, char => char.toUpperCase());
      }
  
      if (!isTitleCase(cityName)) {
        alert('Please enter the city name in Title Case (e.g., "Tel Aviv").');
        return;
      }
  
      try {
        const response = await fetch(`https://smartwardrobe-server.onrender.com/weather/${cityName}`); 
        if (!response.ok) throw new Error('City not found');
  
        const data = await response.json();
        document.getElementById('cityTitle').textContent = cityName;
        document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
        document.getElementById('description').textContent = `Weather: ${data.weather_description}`;
  
        const iconMap = {
          "Clear sky": "☀️",
          "Mainly clear": "🌤️",
          "Partly cloudy": "⛅",
          "Overcast": "☁️",
          "Fog": "🌫️",
          "Depositing rime fog": "🌁",
          "Light rain": "🌦️",
          "Moderate rain": "🌧️",
          "Heavy rain": "🌧️",
          "Light freezing rain": "🌨️",
          "Heavy freezing rain": "🌨️",
          "Showers of rain": "🌦️",
          "Moderate showers of rain": "🌦️",
          "Heavy showers of rain": "🌧️",
          "Light snow showers": "🌨️",
          "Heavy snow showers": "🌨️",
          "Light snow fall": "❄️",
          "Moderate snow fall": "❄️",
          "Heavy snow fall": "❄️",
          "Snow grains": "🌨️",
          "Light rain showers": "🌦️",
          "Moderate rain showers": "🌦️",
          "Heavy rain showers": "🌧️"
        };
  
        document.getElementById('weatherIcon').textContent = iconMap[data.weather_description] || "ℹ️";
        weatherResult.classList.remove('hidden');
        errorDiv.classList.add('hidden');
      } catch (error) {
        weatherResult.classList.add('hidden');
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove('hidden');
      }
    });
  
    document.getElementById('weatherResultClose').addEventListener('click', () => {
      document.getElementById('weatherResult').classList.add('hidden');
    });
  }
  
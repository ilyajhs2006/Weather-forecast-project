function getWeather() {
    let city = document.getElementById("city").value;

    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1")
    .then(response => response.json())
    .then(data => {
        if (!data.results) {
            alert("City not found!");
            return;
        }

        let lat = data.results[0].latitude;
        let lon = data.results[0].longitude;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`)
        .then(response => response.json())
        .then(weather => {
            document.getElementById("name").innerText = city;
            document.getElementById("temp").innerText =
                weather.current.temperature_2m + " °C";

            document.getElementById("humidity").innerText =
                "Humidity: " + weather.current.relative_humidity_2m + "%";
        });
    })
    .catch(() => alert("Check your internet connection!"));
}
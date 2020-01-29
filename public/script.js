const searchElement = document.querySelector('[data-city-search')
const searchBox = new google.maps.places.SearchBox(searchElement)
const currentdate = new Date();


searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
            //console.log(data);
    })
})

const icon = new Skycons({ color: '#222' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const precepitationType = document.querySelector('[data-precip-type')
const windElement = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.hourly.summary
    temperatureElement.textContent = data.currently.temperature
    precipitationElement.textContent = `${data.currently.precipProbability * 100}%`
    windElement.textContent = data.currently.windSpeed
    if (data.precipType != undefined) {
        precepitationType.textContent = data.currently.precipType
    } else precepitationType.textContent = "0%"
    icon.set('icon', data.currently.icon)
    icon.play()
}
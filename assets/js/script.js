document.addEventListener('DOMContentLoaded', (event) => {
	var unit = 'C';

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, {
				'method': 'GET'
			})
			.then((response) => {
				if (response['ok']) {
					return response.json();
				} else {
					throw 'Error';
				}
			})
			.then((data) => {
				document.querySelector('#location').textContent = data.name + ', ' + data.sys.country;
				document.querySelector('#temperature').textContent = Math.round(parseInt(data.main.temp, 10));
				document.querySelector('#temperature').insertAdjacentText('afterend', ' °');
				document.querySelector('#unit').textContent = unit;
				document.querySelector('#description').innerHTML = '<img src="' + data.weather[0].icon + '">' + data.weather[0].main;
			})
			.catch((error) => {
				console.log(error);
			});
		});
	}

	document.querySelector('#unit').addEventListener('click', (event2) => {
		event2.preventDefault();

		let temperature = document.querySelector('#temperature').textContent;

		if (unit == 'C') {
			unit = 'F';
			document.querySelector('#temperature').textContent = Math.round(parseInt(temperature, 10) * (9 / 5) + 32);
			document.querySelector('#unit').textContent = unit;
		} else if (unit == 'F') {
			unit = 'C';
			document.querySelector('#temperature').textContent = Math.round((parseInt(temperature, 10) - 32) * (5 / 9));
			document.querySelector('#unit').textContent = unit;
		}
	});
});
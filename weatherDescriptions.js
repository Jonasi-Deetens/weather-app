const weatherDescriptions = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png",
            "background":"./images/sky-day.jpg"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png",
            "background":"./images/sky-night.jpg"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png",
            "background":"./images/sky-day.jpg"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png",
            "background":"./images/sky-night.jpg"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png",
            "background":"./images/sky-day.jpg"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png",
            "background":"./images/sky-night.jpg"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png",
            "background":"./images/sky-day.jpg"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png",
            "background":"./images/sky-night.jpg"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png",
            "background":"./images/sky-foggy-day.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png",
            "background":"./images/sky-foggy-night.jpg"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png",
            "background":"./images/sky-foggy-day.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png",
            "background":"./images/sky-foggy-night.jpg"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png",
            "background":"./images/sky-rainy-day.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png",
            "background":"./images/sky-rainy-night.jpg"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
}

export { weatherDescriptions };
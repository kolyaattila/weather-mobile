/**
 * API RESPONSE
Running application on SM-G970F.
Kiev
Object {
  "city": Object {
    "coord": Object {
      "lat": 50.4333,
      "lon": 30.5167,
    },
    "country": "UA",
    "id": 703448,
    "name": "Kiev",
    "population": 2514227,
    "timezone": 7200,
  },
  "cnt": 7,
  "cod": "200",
  "list": Array [
    Object {
      "clouds": 0,
      "deg": 215,
      "dt": 1575622800,
      "humidity": 42,
      "pressure": 1019,
      "speed": 7.96,
      "sunrise": 1575610948,
      "sunset": 1575640525,
      "temp": Object {
        "day": 40.44,
        "eve": 37.15,
        "max": 40.44,
        "min": 33.6,
        "morn": 40.44,
        "night": 33.6,
      },
      "weather": Array [
        Object {
          "description": "sky is clear",
          "icon": "01d",
          "id": 800,
          "main": "Clear",
        },
      ],
    },
    Object {
      "clouds": 100,
      "deg": 214,
      "dt": 1575709200,
      "humidity": 53,
      "pressure": 1013,
      "speed": 6.62,
      "sunrise": 1575697418,
      "sunset": 1575726905,
      "temp": Object {
        "day": 34.21,
        "eve": 33.66,
        "max": 35.83,
        "min": 31.55,
        "morn": 31.69,
        "night": 33.85,
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds",
        },
      ],
    },
    Object {
      "clouds": 58,
      "deg": 255,
      "dt": 1575795600,
      "humidity": 82,
      "pressure": 1012,
      "speed": 9.8,
      "sunrise": 1575783887,
      "sunset": 1575813287,
      "temp": Object {
        "day": 40.46,
        "eve": 37.69,
        "max": 41.25,
        "min": 34.79,
        "morn": 34.79,
        "night": 35.92,
      },
      "weather": Array [
        Object {
          "description": "broken clouds",
          "icon": "04d",
          "id": 803,
          "main": "Clouds",
        },
      ],
    },
    Object {
      "clouds": 100,
      "deg": 204,
      "dt": 1575882000,
      "humidity": 65,
      "pressure": 1010,
      "speed": 12.86,
      "sunrise": 1575870353,
      "sunset": 1575899673,
      "temp": Object {
        "day": 40.82,
        "eve": 41.07,
        "max": 42.53,
        "min": 37.06,
        "morn": 37.13,
        "night": 38.98,
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds",
        },
      ],
    },
    Object {
      "clouds": 86,
      "deg": 193,
      "dt": 1575968400,
      "humidity": 78,
      "pressure": 1007,
      "speed": 8.63,
      "sunrise": 1575956817,
      "sunset": 1575986061,
      "temp": Object {
        "day": 39.11,
        "eve": 40.46,
        "max": 42.89,
        "min": 35.47,
        "morn": 35.58,
        "night": 39.49,
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds",
        },
      ],
    },
    Object {
      "clouds": 53,
      "deg": 291,
      "dt": 1576054800,
      "humidity": 77,
      "pressure": 1017,
      "speed": 6.35,
      "sunrise": 1576043278,
      "sunset": 1576072453,
      "temp": Object {
        "day": 39.31,
        "eve": 38.34,
        "max": 40.15,
        "min": 33.91,
        "morn": 35.15,
        "night": 37.98,
      },
      "weather": Array [
        Object {
          "description": "broken clouds",
          "icon": "04d",
          "id": 803,
          "main": "Clouds",
        },
      ],
    },
    Object {
      "clouds": 48,
      "deg": 133,
      "dt": 1576141200,
      "humidity": 75,
      "pressure": 1017,
      "rain": 2.5,
      "speed": 8.01,
      "sunrise": 1576129737,
      "sunset": 1576158848,
      "temp": Object {
        "day": 36.72,
        "eve": 36.9,
        "max": 37.35,
        "min": 35.04,
        "morn": 35.04,
        "night": 36.97,
      },
      "weather": Array [
        Object {
          "description": "light rain",
          "icon": "10d",
          "id": 500,
          "main": "Rain",
        },
      ],
    },
  ],
  "message": 1.3400222,
}
 * @param {*} city 
 */

export const getWeather = async city => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast/daily?&units=imperial&appId=2f700b156c75ca2109da827f99465c40&q=" + city
  );

    let forecastModel = await response.json();

    forecastModel.list.map(item =>{
      item.weather[0].id = '' + Math.floor(Math.random() * 10000) + 1 ;
    })
  return {
    location: forecastModel.city.name,
    icon: forecastModel.list[0].weather[0].icon,
    temperature: getCelsius(forecastModel.list[0].temp.day),
    weather: forecastModel.list[0].weather[0].main,
    DATA:  forecastModel.list
  };
};

export function getCelsius (temp) {
  return Math.round((temp - 32) * 5 / 9);
}

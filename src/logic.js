import { ref } from "vue";

import Cloudy from './assets/videos/Cloudy.mp4';
import Stormy from './assets/videos/Storm.mp4';
import Rainy from './assets/videos/Rain.mp4';
import Foggy from './assets/videos/Foggy.mp4';
import Snow from './assets/videos/Snow.mp4';
import Sunny from './assets/videos/Sunny.mp4';
import Clear from './assets/videos/Clear.mp4';
import Overcast from './assets/videos/Overcast.mp4';
import Night from './assets/videos/Night.mp4';

let latitude = ref();
let longitude = ref();
export let setinput = ref('');
export let CuttentTemp = ref('');
export let CuttentPressure = ref('');
export let CuttentHumidity = ref('');
export let CuttentVisibility = ref('');
export let CuttentFeelsLike = ref('');
export let CuttentWindSpeed = ref('');
export let CuttentConditionMessage = ref('');
export let hourlyTempArray = ref([]);
export let WeekyDaysTempArray = ref([]);
export let LocationNameKey = ref();
export let currenDate = ref('');
export let currenWeekDay = ref('');
export let currenMonth = ref('');
export let CityLocation = ref('');
export let Province = ref('');
export let Country = ref('');
export let SunRise = ref('');
export let SunSet = ref('');
export let AirQuality = ref({});
let WeatherConditionCheckArray = ref([]);
let PerDayTempAverage = ref(0);
let ObjForWeeklyTempArray = ref({});
export let MultipleCountries = ref([]);
let SRSSCT = ref({});




// for get things time related things.
function gettingCurrentDTMY(string, date, week, month, time, Hours) {
    try {
        let rawdate = new Date(string * 1000);
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        let currenDate = rawdate.getDate();
        let currenWeekDay = weekdays[rawdate.getDay()];
        let currenMonth = monthFormatter.format(rawdate);
        // SunSR
        let hours = rawdate.getHours();
        let minutes = rawdate.getMinutes();
        let period = hours >= 12 ? 'PM' : 'AM';
        let formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        if (date == 1) {
            return currenDate;
        }
        if (week == 1) {
            return currenWeekDay;
        }
        if (month == 1) {
            return currenMonth;
        }
        if (Hours == 1) {
            let dayminutes = hours * 60 + minutes;
            return dayminutes;
        }
        if (time == 1) {
            return `${formattedHours}:${formattedMinutes} ${period}`;
        }
    } catch (error) {
        console.log(error.message);
    }
}




// for checking conditions from array and return on priority.
function determineDayWeatherCondition(weatherConditionsArray) {
    try {
        const weatherConditionsOrder = [
            'Rainy',
            'Rain',
            'Raining',
            'Rainy shower',
            'Showers',
            'Shower',
            'Drizzle',
            'Hurricane',
            'Stormy',
            'Storm',
            'Thunderstorm',
            'Thunder storm',
            'Tropical Storm',
            'Tropical storm',
            'Sand storm',
            'Haze',
            'Fog',
            'Mist',
            'Smoke',
            'Overcast',
            'Cloudy',
            'Clouds',
            'Cloud',
            'Mostly cloudy',
            'Mostly clouds',
            'Partly cloudy',
            'Partly clouds',
            'Sunny',
            'Mostly Sunny',
            'Partly Sunny',
            'Hot',
            'Cold',
            'Snow',
            'Snowing',
            'Snow fall',
            'Snow falling',
            'Sleet',
            'Hail',
            'Blizzard',
            'Clear',
            'Mostly clear',
            'Partly clear',
        ];

        for (const condition of weatherConditionsOrder) {
            if (weatherConditionsArray.some(weather => weather === condition)) {
                return condition;
            }
        }
        return 'Cloudy'; // If no match is found        
    } catch (error) {
        console.log(error.message);
    }
}




// function to change background video based on current conditon not whole day condition.
export function ChangeBackgroundVideo() {
    try {
        let CheckingCondition = CuttentConditionMessage.value;
        if ((gettingCurrentDTMY(SRSSCT.value.cT, 0, 0, 0, 0, 1) >= gettingCurrentDTMY(SRSSCT.value.ss, 0, 0, 0, 0, 1) || gettingCurrentDTMY(SRSSCT.value.cT, 0, 0, 0, 0, 1) <= gettingCurrentDTMY(SRSSCT.value.sr, 0, 0, 0, 0, 1)) && (CuttentConditionMessage.value == 'Clear' || CuttentConditionMessage.value == 'Mostly clear' || CuttentConditionMessage.value == 'clear' || CuttentConditionMessage.value == 'Sunny' || CuttentConditionMessage.value == 'Mostly sunny')) {
            return Night;
        }
        else {
            switch (CheckingCondition) {
                case 'Clear':
                case 'clear':
                case 'Mostly clear':
                    return Clear;
                case 'Sunny':
                case 'Mostly sunny':
                    return Sunny;
                case 'Partly clear':
                case 'Cloudy':
                case 'Cloud':
                case 'Clouds':
                case 'Mostly cloudy':
                case 'Mostly clouds':
                case 'Partly cloudy':
                case 'Partly sunny':
                    return Cloudy;
                case 'Thunderstorm':
                case 'Thunder storm':
                case 'Thunder Storm':
                case 'Thunderstorm':
                case 'Sandstorm':
                case 'Tropical storm':
                case 'Storm':
                case 'Stormy':
                    return Stormy;
                case 'Rain shower':
                case 'Rain':
                case 'Rainy':
                case 'Rainy shower':
                case 'Raining':
                case 'Drizzle':
                case 'Showers':
                case 'Shower':
                case 'Hurricane':
                    return Rainy;
                case 'Haze':
                case 'Mist':
                case 'Fog':
                case 'Smoke':
                    return Foggy;
                case 'Overcast':
                    return Overcast;
                case 'Snow':
                case 'Snowing':
                case 'Snow fall':
                case 'Snow falling':
                case 'Sleet':
                case 'Hail':
                case 'Blizzard':
                    return Snow;
                default:
                    return Cloudy;
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}




// return image based on conditions and time to show it.
export function ChangeImage(summary, time) {
    try {
        if ((gettingCurrentDTMY(time, 0, 0, 0, 0, 1) >= gettingCurrentDTMY(SRSSCT.value.ss, 0, 0, 0, 0, 1) || gettingCurrentDTMY(time, 0, 0, 0, 0, 1) <= gettingCurrentDTMY(SRSSCT.value.sr, 0, 0, 0, 0, 1)) && (summary == 'Clear' || summary == 'Mostly clear' || summary == 'clear' || summary == 'Sunny' || summary == 'Mostly sunny')) {
            return 'https://cdn-icons-png.flaticon.com/128/3982/3982176.png';
        }

        else {
            switch (summary) {
                case 'Clear':
                case 'clear':
                case 'Mostly clear':
                case 'Sunny':
                case 'Mostly sunny':
                    return "https://cdn-icons-png.flaticon.com/128/1163/1163662.png";
                case 'Partly clear':
                case 'Partly cloudy':
                case 'Partly clouds':
                case 'Partly sunny':
                case 'Cloudy':
                case 'Cloud':
                case 'Clouds':
                    return "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";
                case 'Thunderstorm':
                case 'Thunder Storm':
                case 'Thunder storm':
                case 'Storm':
                case 'Stormy':
                case 'Sandstorm':
                case 'Tropical storm':
                    return "https://cdn-icons-png.flaticon.com/128/1146/1146860.png";
                case 'Rain shower':
                case 'Rain':
                case 'Raining':
                case 'Rainy':
                case 'Rainy shower':
                case 'Drizzle':
                case 'Showers':
                case 'Shower':
                case 'Hurricane':
                    return "https://cdn-icons-png.flaticon.com/128/4088/4088981.png";
                case 'Overcast':
                    return 'https://cdn-icons-png.flaticon.com/128/10960/10960998.png'
                case 'Mostly cloudy':
                case 'Mostly clouds':
                    return "https://cdn-icons-png.flaticon.com/128/10531/10531674.png";
                case 'Partly sunny':
                    return "https://cdn-icons-png.flaticon.com/128/1163/1163763.png";
                case 'Haze':
                case 'Mist':
                case 'Fog':
                case 'Smoke':
                    return "https://cdn-icons-png.flaticon.com/128/5243/5243833.png";
                case 'Snow':
                case 'Snowing':
                case 'Snow fall':
                case 'Snow falling':
                case 'Sleet':
                case 'Hail':
                case 'Blizzard':
                    return "https://cdn-icons-png.flaticon.com/128/7334/7334205.png";
                case 'Cold':
                    return "https://cdn-icons-png.flaticon.com/128/642/642000.png";
                default:
                    return "https://cdn-icons-png.flaticon.com/128/7016/7016059.png";
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}




// return air quality text.
export function AirQualityIndex() {
    let AQI = AirQuality.value.AQI;
    try {
        switch (AQI) {
            case 1:
                return 'Great';
            case 2:
                return 'Good';
            case 3:
                return 'Moderate';
            case 4:
                return 'Sensitive';
            case 5:
                return 'Unhealthy';
            default: if (AQI > 5)
                return 'Dangerous'
            else
                return 'Checking';
        }
    } catch (error) {
        console.log(error.message);
    }
}




// return class name so color get applied.
export function AirQualityIndexColor() {
    let AQI = AirQuality.value.AQI;
    try {
        switch (AQI) {
            case 1:
                return 'Great';
            case 2:
                return 'Good';
            case 3:
                return 'Moderate';
            case 4:
                return 'Sensitive';
            case 5:
                return 'Unhealthy';
            default: if (AQI > 5)
                return 'Dangerous'
            else
                return 'Checking';
        }
    } catch (error) {
        console.log(error.message);
    }
}




// main function to fetch Hourly  and weekly of 5 days data.
async function GettingHourlyAndWeeklyWeather() {
    try {
        const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude.value}&lon=${longitude.value}&appid=ca69ed71e3e9415e36b49cc4683189f6`;
        let rawdata = await fetch(url1);
        let data = await rawdata.json();
        for (let i = 1; i <= 8; i++) {
            let hourlyData = {
                temp: (data.list[i].main.temp - 273.15).toFixed(0),
                time: gettingCurrentDTMY(data.list[i].dt, 0, 0, 0, 1, 0),
                unixtime: data.list[i].dt,
                summary: data.list[i].weather[0].main,
            }
            hourlyTempArray.value.push(hourlyData);
        }
        // Weekly data
        for (let j = 0; j <= 39; j++) {
            PerDayTempAverage.value += data.list[j].main.temp - 273.15;
            WeatherConditionCheckArray.value.push(data.list[j].weather[0].main);

            if (j == 7 || j == 15 || j == 23 || j == 31 || j == 39) {

                if (j == 7) {
                    ObjForWeeklyTempArray.value = {
                        temp: (PerDayTempAverage.value / 8).toFixed(0),
                        Condition: determineDayWeatherCondition(WeatherConditionCheckArray.value),
                        Day: gettingCurrentDTMY(data.list[j - 3].dt, 0, 1, 0, 0, 0),
                        Date: gettingCurrentDTMY(data.list[j - 3].dt, 1, 0, 0, 0, 0),
                        Month: gettingCurrentDTMY(data.list[j - 3].dt, 0, 0, 1, 0, 0),
                        Wind: data.list[j - 3].wind.speed
                    }
                    WeekyDaysTempArray.value.push(ObjForWeeklyTempArray.value);
                    PerDayTempAverage.value = 0;
                    WeatherConditionCheckArray.value.splice(0, WeatherConditionCheckArray.value.length);
                }

                if (j == 15) {
                    ObjForWeeklyTempArray.value = {
                        temp: (PerDayTempAverage.value / 8).toFixed(0),
                        Condition: determineDayWeatherCondition(WeatherConditionCheckArray.value),
                        Day: gettingCurrentDTMY(data.list[j - 3].dt, 0, 1, 0, 0, 0),
                        Date: gettingCurrentDTMY(data.list[j - 3].dt, 1, 0, 0, 0, 0),
                        Month: gettingCurrentDTMY(data.list[j - 3].dt, 0, 0, 1, 0, 0),
                        Wind: data.list[j - 3].wind.speed
                    }
                    WeekyDaysTempArray.value.push(ObjForWeeklyTempArray.value);
                    PerDayTempAverage.value = 0;
                    WeatherConditionCheckArray.value.splice(0, WeatherConditionCheckArray.value.length);
                }

                if (j == 23) {
                    ObjForWeeklyTempArray.value = {
                        temp: (PerDayTempAverage.value / 8).toFixed(0),
                        Condition: determineDayWeatherCondition(WeatherConditionCheckArray.value),
                        Day: gettingCurrentDTMY(data.list[j - 3].dt, 0, 1, 0, 0, 0),
                        Date: gettingCurrentDTMY(data.list[j - 3].dt, 1, 0, 0, 0, 0),
                        Month: gettingCurrentDTMY(data.list[j - 3].dt, 0, 0, 1, 0, 0),
                        Wind: data.list[j - 3].wind.speed
                    }
                    WeekyDaysTempArray.value.push(ObjForWeeklyTempArray.value);
                    PerDayTempAverage.value = 0;
                    WeatherConditionCheckArray.value.splice(0, WeatherConditionCheckArray.value.length);
                }

                if (j == 31) {
                    ObjForWeeklyTempArray.value = {
                        temp: (PerDayTempAverage.value / 8).toFixed(0),
                        Condition: determineDayWeatherCondition(WeatherConditionCheckArray.value),
                        Day: gettingCurrentDTMY(data.list[j - 3].dt, 0, 1, 0, 0, 0),
                        Date: gettingCurrentDTMY(data.list[j - 3].dt, 1, 0, 0, 0, 0),
                        Month: gettingCurrentDTMY(data.list[j - 3].dt, 0, 0, 1, 0, 0),
                        Wind: data.list[j - 3].wind.speed
                    }
                    WeekyDaysTempArray.value.push(ObjForWeeklyTempArray.value);
                    PerDayTempAverage.value = 0;
                    WeatherConditionCheckArray.value.splice(0, WeatherConditionCheckArray.value.length);
                }

                if (j == 39) {
                    ObjForWeeklyTempArray.value = {
                        temp: (PerDayTempAverage.value / 8).toFixed(0),
                        Condition: determineDayWeatherCondition(WeatherConditionCheckArray.value),
                        Day: gettingCurrentDTMY(data.list[j - 3].dt, 0, 1, 0, 0, 0),
                        Date: gettingCurrentDTMY(data.list[j - 3].dt, 1, 0, 0, 0, 0),
                        Month: gettingCurrentDTMY(data.list[j - 3].dt, 0, 0, 1, 0, 0),
                        Wind: data.list[j - 3].wind.speed
                    }
                    WeekyDaysTempArray.value.push(ObjForWeeklyTempArray.value);
                    PerDayTempAverage.value = 0;
                    WeatherConditionCheckArray.value.splice(0, WeatherConditionCheckArray.value.length);
                }
            }
        }
        document.querySelector('.loading').classList.remove('LoadingCompleted');
    } catch (error) {
        console.log(error.message);
    }
}




// return air quality.
export async function GettingCurrentWeatherAirDetails() {
    try {
        const url3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude.value}&lon=${latitude.value}&appid=ca69ed71e3e9415e36b49cc4683189f6`;
        let rawdata = await fetch(url3);
        let data = await rawdata.json();
        AirQuality.value = {
            SO2: data.list[0].components.so2,
            NO2: data.list[0].components.no2,
            O3: data.list[0].components.o3,
            AQI: data.list[0].main.aqi,
        }
    } catch (error) {
        console.log(error.message);
    }
};




// main function to fetching all current data.
async function GettingCurrentFullWeather() {
    try {
        let url4 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=ca69ed71e3e9415e36b49cc4683189f6`;
        let rawdata = await fetch(url4);
        let data = await rawdata.json();
        SRSSCT.value = {
            ss: data.sys.sunset,
            sr: data.sys.sunrise,
            cT: data.dt
        }
        SunSet.value = gettingCurrentDTMY(data.sys.sunset, 0, 0, 0, 1, 0);
        SunRise.value = gettingCurrentDTMY(data.sys.sunrise, 0, 0, 0, 1, 0);
        CuttentConditionMessage.value = data.weather[0].main;
        CuttentTemp.value = ((data.main.temp - 273.15).toFixed(0));
        CuttentPressure.value = data.main.pressure;
        CuttentHumidity.value = data.main.humidity;
        CuttentFeelsLike.value = (data.main.feels_like - 273.15).toFixed(0);
        CuttentWindSpeed.value = data.wind.speed;
        CuttentVisibility.value = (data.visibility / 1000).toFixed(0);
        let unixdate = data.dt;
        currenDate.value = gettingCurrentDTMY(unixdate, 1, 0, 0, 0, 0);
        currenWeekDay.value = gettingCurrentDTMY(unixdate, 0, 1, 0, 0, 0);
        currenMonth.value = gettingCurrentDTMY(unixdate, 0, 0, 1, 0, 0);
    } catch (error) {
        console.log(error.message);
    }
};




// function attached with location btn.
export function GettingCurrentLocation() {
    try {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitude.value = position.coords.latitude;
                    longitude.value = position.coords.longitude;
                    if (latitude.value !== '' && longitude.value !== '') {
                        console.log('Current Location\n\n', 'latitude = ', latitude.value, 'longitude = ', longitude.value);
                        RunAllFUnctions();
                        ReverseGeoCoding_NamesFromCordLatLon();
                    }
                });
        }
    } catch (error) {
        console.log(error.message)
    }
}




// function attached execute with above one.
async function ReverseGeoCoding_NamesFromCordLatLon() {
    try {
        let url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude.value}&lon=${longitude.value}&limit=1&appid=ca69ed71e3e9415e36b49cc4683189f6`;
        let rawdata = await fetch(url);
        let data = await rawdata.json();;
        CityLocation.value = data[0].name;
        Province.value = data[0].state;
        Country.value = data[0].country;
    } catch (error) {
        console.log(error.message);
    }
}




// function attach with returned multiple locations and get parameters from choosed one.
export function GettingCoordFromLocations(lat, lon, CountryName, ProvinceName, CityName, Index) {
    try {
        latitude.value = lat;
        longitude.value = lon;
        CityLocation.value = CityName;
        Country.value = CountryName;
        Province.value = ProvinceName;
        RunAllFUnctions();
        MultipleCountries.value.splice(0, MultipleCountries.value.length);
    } catch (error) {
        console.log(error.message);
    }
}




// function attached with search btn and enter key. 
export async function GetName() {
    try {
        MultipleCountries.value.splice(0, MultipleCountries.value.length);
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${setinput.value}&limit=5&appid=ca69ed71e3e9415e36b49cc4683189f6`;
        if (setinput.value.trim() !== '') {
            let rawdata = await fetch(url);
            let data = await rawdata.json();
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(element => {
                    let SingleCountryObject = {
                        CityName: element.name,
                        ProviceName: element.state,
                        CountryName: element.country,
                        lat: element.lat,
                        lon: element.lon
                    }
                    MultipleCountries.value.push(SingleCountryObject);
                });
            }
            else {
                setinput.value = 'Not a Valid City Name.'
                setTimeout(() => {
                    setinput.value = '';
                }, 1500);
            }
        }
    }
    catch (error) {
        console.log("Error: ", error.message);
    }
}




// main functoin to execute functions.
let justRunOneTime = false;
function RunAllFUnctions() {
    try {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('.loading').classList.add('LoadingCompleted');
        });
        if (justRunOneTime) {
            document.querySelector('.loading').classList.add('LoadingCompleted');
        }
        hourlyTempArray.value.splice(0, hourlyTempArray.value.length);
        WeekyDaysTempArray.value.splice(0, WeekyDaysTempArray.value.length);
        //// functions
        GettingCurrentFullWeather();
        GettingHourlyAndWeeklyWeather();
        GettingCurrentWeatherAirDetails();
        justRunOneTime = true;
    } catch (error) {
        console.log(error.message);
    }
}




// for set a default location when page load.
function defaultLocation() {
    GettingCoordFromLocations(30.15, 72.67, 'Pakistan', 'Punjab', 'Burewala', 0);
}
defaultLocation();




window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        GetName();
    }
    else if (e.key == 'Delete') {
        setinput.value = '';
    }
});

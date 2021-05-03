// DOM Elements
const time = document.querySelector('.time'),
    currentDay = document.querySelector('.day'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    changeBg = document.getElementById('change_bg'),
    quoteContent = document.querySelector('blockquote'),
    quoteAuthor = document.querySelector('figcaption'),
    nextQuote = document.getElementById('change_quote'),
    city = document.getElementById('city'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.getElementById('temperature'),
    humidity = document.getElementById('humidity'),
    wind = document.getElementById('wind');

// Options
const showAmPm = false;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.getDate(),
        month = new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(today),
        dayName = new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(today);

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    //hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
    currentDay.innerHTML = `${dayName}<span>, </span>${day}<span> </span>${month}`;
    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Backgrounds
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour >= 6 && hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            nextBg();
        greeting.textContent = 'Доброе утро, ';
        document.body.style.color = 'white';
    } else if (hour >= 12 && hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            nextBg();
        greeting.textContent = 'Добрый день, ';
    } else if (hour >= 18 && hour < 24) {
        // Evening
        document.body.style.backgroundImage =
            nextBg();
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
    } else {
        // Night
        document.body.style.backgroundImage =
            nextBg();
        greeting.textContent = 'Доброй ночи, ';
        document.body.style.color = 'white';
    }
    setTimeout(setBgGreet, ((59 - today.getMinutes()) * 60 + (59 - today.getSeconds())) * 1000 + (1000 - today.getMilliseconds()));
}

const morningBgs = [];

const dayBgs = [];

const eveningBgs = [];

const nightBgs = [];

function addBgs() {
    for (let i = 1; i <= 20; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        morningBgs.push('url(img/morning/' + i + '.jpg)');
        dayBgs.push('url(img/day/' + i + '.jpg)');
        eveningBgs.push('url(img/evening/' + i + '.jpg)');
        nightBgs.push('url(img/night/' + i + '.jpg)');
    }
}

function addMorningBgs() {
    for (let i = 1; i <= 20; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        morningBgs.push('url(img/morning/' + i + '.jpg)');
    }
}

function addDayBgs() {
    for (let i = 1; i <= 20; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        dayBgs.push('url(img/morning/' + i + '.jpg)');
    }
}

function addEveningBgs() {
    for (let i = 1; i <= 20; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        eveningBgs.push('url(img/morning/' + i + '.jpg)');
    }
}

function addNightBgs() {
    for (let i = 1; i <= 20; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        nightBgs.push('url(img/morning/' + i + '.jpg)');
    }
}

function nextBg() {

    if (morningBgs.length === 0) {
        addMorningBgs();
    }
    if (dayBgs.length === 0) {
        addDayBgs();
    }
    if (eveningBgs.length === 0) {
        addEveningBgs();
    }
    if (nightBgs.length === 0) {
        addNightBgs();
    }

    let today = new Date(),
        hour = today.getHours();

    if (hour >= 6 && hour < 12) {
        return morningBgs.shift();
    } else if (hour >= 12 && hour < 18) {
        return dayBgs.shift();
    } else if (hour >= 18 && hour < 24) {
        return eveningBgs.shift();
    } else {
        return nightBgs.shift();
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    let oldValue = localStorage.getItem('name');
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                name.textContent = oldValue;
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else {
        if (e.target.innerText === '') {
            name.textContent = oldValue;
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

function clearName(e) {
    name.textContent = '';
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    let oldValue = localStorage.getItem('focus');
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                focus.textContent = oldValue;
            } else {
                localStorage.setItem('focus', e.target.innerText);
            }
            focus.blur();
        }
    } else {
        if (e.target.innerText === '') {
            focus.textContent = oldValue;
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    }
}

function clearFocus(e) {
    focus.textContent = '';
}

//Quotes
async function getQuote() {
    const url = `https://favqs.com/api/qotd`;
    const res = await fetch(url);
    const data = await res.json();
    quoteContent.textContent = data.quote.body;
    quoteAuthor.textContent = data.quote.author;
}


//Weather
async function getWeather() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=25a8adffc39ba101ae15bfb1a76915cc&units=metric`);
    const data = await res.json();
    if (res.ok === false) {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = data.message;
        humidity.textContent = '';
        wind.textContent = '';
        return false;
    }
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed}m/s`
    return true;
}

function getCity() {
    let localCity = localStorage.getItem('city');
    if (localCity === null || localCity === '') {
        city.textContent = 'Минск';
    } else {
        city.textContent = localCity;
    }
}

async function setCity(e) {
    let oldValue = localStorage.getItem('city');
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '') {
                city.textContent = oldValue;
            } else {
                localStorage.setItem('city', e.target.innerText);
            }
            city.blur();
        }
    } else {
        if (e.target.innerText === '') {
            getCity();
            await getWeather();
        } else {
            if (await getWeather() === true) {
                localStorage.setItem('city', e.target.innerText);
            }
        }
    }
}

function clearCity() {
    city.textContent = '';
}

// EventListeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearFocus);
changeBg.addEventListener('click', setBgGreet);
document.addEventListener('DOMContentLoaded', getQuote);
nextQuote.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', clearCity);

// Run
showTime();
addBgs();
setBgGreet();
getName();
getFocus();
getCity()
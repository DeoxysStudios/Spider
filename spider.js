let blocksTag = document.getElementById("blocks-indicator");
let annualTag = document.getElementById("annual-indicator");
let kmTag = document.getElementById("km-indicator");
let milesTag = document.getElementById("miles-indicator");
let earthTag = document.getElementById("earth-indicator");
let timeTag = document.getElementById("time-indicator");
let hoursTag = document.getElementById("hours-indicator");
let minutesTag = document.getElementById("minutes-indicator");
let secondsTag = document.getElementById("seconds-indicator");
let dateTag = document.getElementById("date-indicator");
let todayTag = document.getElementById("today-indicator");
let startDate = new Date("Tuesday, August 2, 2016 5:48:32 PM");
let currDate = new Date();
let currDay = new Date();
currDay.setHours(0, 0, 0, 0);
let currYear = new Date(new Date().getFullYear(), 0, 1);
let blocksFallen = 0;
let timeout = null;
let HOURMS = 3600000;
let METERMILE = 1609.34;
let EARTHRADIUS = 6371000;

let DARKEST = 0.4;

var Timer = function(callback, delay) {
    var timerId, start, remaining = delay;
    this.pause = function() {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };
    this.resume = function() {
        if (timerId) {
            return;
        }
        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };
    this.resume();
};

function update_site() {
    currDate = new Date();
    currDay = new Date();
    currDay.setHours(0, 0, 0, 0);
    currYear = new Date(new Date().getFullYear(), 0, 1);
    time_fallen = currDate - startDate;
    time_annual = currDate - currYear;
    time_today = currDate - currDay;
    blocksFallen = Math.floor(time_fallen / 10);
    blocksAnnual = Math.floor(time_annual / 10);
    blocksToday = Math.floor(time_today / 10);
    blocksTag.textContent = add_commas(blocksFallen);
    kmTag.textContent = decimal_round(Math.floor(blocksFallen / 10) / 100);
    milesTag.textContent = decimal_round(Math.floor(blocksFallen / METERMILE * 100) / 100);
    earthTag.textContent = decimal_round(Math.floor(1000 * blocksFallen / (2 * EARTHRADIUS)) / 1000, 3);
    timeTag.textContent = time_tag(time_fallen);
    hoursTag.textContent = add_commas(Math.floor(time_fallen / 3600000));
    minutesTag.textContent = add_commas(Math.floor(time_fallen / 60000));
    secondsTag.textContent = add_commas(Math.floor(time_fallen / 1000));
    annualTag.textContent = add_commas(blocksAnnual);
    todayTag.textContent = add_commas(blocksToday);
    monthstr = set_digits(currDate.getMonth() + 1, 2);
    daystr = set_digits(currDate.getDate(), 2);
    yearstr = set_digits(currDate.getFullYear(), 4);
    currHour = currDate.getHours() % 12;
    if (currHour == 0) {
        currHour = 12;
    }
    hrstr = set_digits(currHour, 2);
    ampmstr = "pm";
    if (currDate.getHours() < 12) {
        ampmstr = "am";
    }
    minstr = set_digits(currDate.getMinutes(), 2);
    secstr = set_digits(currDate.getSeconds(), 2);
    dateTag.textContent = yearstr + `-` + monthstr + `-` + daystr + ` ` + hrstr + `:` + minstr + `:` + secstr + ` ` + ampmstr;
    Timer(update_site, 10);
}

function add_commas(x, num_decimals = 2) {
    let outstr = ``;
    let instr = `${x}`;
    let n = instr.length;
    if (x % 1 != 0) {
        return add_commas(Math.floor(x)) + `.` + set_decimal_digits(x, num_decimals);
    }
    for (let i = 1; i <= n; i++) {
        outstr = instr[n - i] + outstr;
        if (((i % 3) == 0) && (i != n)) {
            outstr = `,` + outstr;
        }
    }
    return outstr;
}

function decimal_round(x, num_digits = 2) {
    if (x % 1 == 0) {
        return add_commas(x) + `.` + `0`.repeat(num_digits);
    }
    return add_commas(x, num_digits);
}

function set_digits(x, num_digits) {
    let outstr = `${x}`;
    while (outstr.length < num_digits) {
        outstr = `0` + outstr;
    }
    return outstr;
}

function set_decimal_digits(x, num_digits) {
    let outstr = `${x}`;
    outstr = outstr.split(`.`)[1];
    while (outstr.length < num_digits) {
        outstr = outstr + `0`;
    }
    return outstr;
}

function time_tag(x) {
    let seconds = Math.floor(x / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds -= 60 * minutes;
    minutes -= 60 * hours;
    hours -= 24 * days;
    if (hours == 1) {
        return `${add_commas(days)} days ${hours} hr ${minutes} min ${seconds} sec`;
    }
    return `${add_commas(days)} days ${hours} hrs ${minutes} min ${seconds} sec`;
}

update_site();

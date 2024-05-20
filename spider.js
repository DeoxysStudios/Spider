let blocksTag = document.getElementById("blocks-indicator");
let annualTag = document.getElementById("annual-indicator");
let timeTag = document.getElementById("time-indicator");
let startDate = new Date("Tuesday, August 2, 2016 5:48:32 PM");
let currDate = new Date();
let currYear = new Date(new Date().getFullYear(), 0, 1);
let blocksFallen = 0;
let timeout = null;

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
    time_fallen = currDate - startDate;
    time_annual = currDate - currYear;
    blocksFallen = Math.floor(time_fallen / 10);
    blocksAnnual = Math.floor(time_annual / 10);
    blocksTag.textContent = add_commas(blocksFallen);
    timeTag.textContent = time_tag(time_fallen);
    annualTag.textContent = add_commas(blocksAnnual);
    Timer(update_site, 10);
}

function add_commas(x) {
    let outstr = ``;
    let instr = `${x}`;
    let n = instr.length;
    for (let i = 1; i <= n; i++) {
        outstr = instr[n - i] + outstr;
        if (((i % 3) == 0) && (i != n)) {
            outstr = `,` + outstr;
        }
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
    return `${add_commas(days)} days ${hours} hrs ${minutes} min ${seconds} sec`;
}

update_site();
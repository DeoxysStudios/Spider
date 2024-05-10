let blocksTag = document.getElementById("blocks-indicator");
let startDate = new Date("Tuesday, August 2, 2016 5:00:00 PM");
let currDate = new Date();
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
    blocksFallen = Math.round((currDate - startDate) / 10);
    blocksTag.textContent = add_commas(blocksFallen);
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

update_site();
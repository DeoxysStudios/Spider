let blocksTag = document.getElementById("blocks-indicator");
let startDate = new Date("Tuesday, August 2, 2016 5:00:00 PM")
let currDate = new Date()

blocksTag.textContent = `${(currDate - startDate) / 10}`;
// Global variables:
let dif_future_days = 0;
let dif_past_days = 0;
let dif_past_weeks = 0;
let dif_future_weeks = 0;

// Run these functions on load:
calcDays(120);
createPerspective(1);
startLabelAnimation();
// pulse_heartrate(60);  // This is distracting - find a better way

// Calling buttons to set lifespan age
function setLifespan120() {
  calcDays(120);
  createPerspective(2);
}

function setLifespan88() {
  calcDays(88);
  createPerspective(0);
}

// ---------------------------------
// Function to create the Perspective map
// ---------------------------------

function calcDays(intLifespan) {
  // Calculate the number of weeks in the past and future
  const date_birthday = new Date("10/01/1983");
  const date_deathday = new Date(date_birthday.getTime());
  date_deathday.setFullYear(date_birthday.getFullYear() + intLifespan);
  const date_today = new Date();

  const dif_past_ms = date_today.getTime() - date_birthday.getTime();
  dif_past_days = Math.ceil(dif_past_ms / (1000 * 3600 * 24));
  dif_past_weeks = dif_past_days / 7;

  const dif_future_ms = date_deathday.getTime() - date_today.getTime();
  dif_future_days = Math.ceil(dif_future_ms / (1000 * 3600 * 24));
  dif_future_weeks = dif_future_days / 7;
}

function createPerspective(intPeriod) {
  // ---------------------------------
  // Generate the text strings
  // ---------------------------------
  var str_past = "-";
  var str_future = "-";
  var int_pastPeriods = 1;
  var int_futurePeriods = 1;
  var lbl_Period = "";

  if (intPeriod == 0) {
    int_pastPeriods = dif_past_days;
    int_futurePeriods = dif_future_days;
    lbl_Period = "days";
  } else if (intPeriod == 1) {
    int_pastPeriods = dif_past_days / 7;
    int_futurePeriods = dif_future_days / 7;
    lbl_Period = "weeks";
  } else {
    int_pastPeriods = dif_past_days / 365;
    int_futurePeriods = dif_future_days / 365;
    lbl_Period = "years";
  }
  var str_future_repeated = str_future.repeat(dif_future_weeks);

  // Add in length of time to the strings:
  var str_past_label =
    " " +
    int_pastPeriods.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    " " +
    lbl_Period +
    " ";
  var dif_past_weeks_half = (dif_past_weeks - str_past_label.length) / 2;
  var str_past_labeled =
    str_past.repeat(dif_past_weeks_half) +
    str_past_label +
    str_past.repeat(dif_past_weeks_half);

  var str_future_label =
    " " +
    int_futurePeriods.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    " " +
    lbl_Period +
    " ";
  var dif_future_weeks_half = (dif_future_weeks - str_future_label.length) / 2;
  var str_future_labeled =
    str_future.repeat(dif_future_weeks_half) +
    str_future_label +
    str_future.repeat(dif_future_weeks_half);

  // Combine the strings together:
  var str_combined =
    '<span style="background-color:#5B6C5D;">' + str_past_labeled + "</span>" + '<span style="background-color:#E06D06;">' + str_future_labeled + "</span>";

  // Send to HTML:
  document.getElementById("output_generated_combined").innerHTML = str_combined;
}

// Animate the label with a timed loop
function startLabelAnimation() {
  const refreshRate = 200000 / 60;
  let lbl_typenum = 1;

  window.setInterval(() => {
    if (lbl_typenum == 2) {
      lbl_typenum = 0;
    } else {
      lbl_typenum = lbl_typenum + 1;
    }
    createPerspective(lbl_typenum);
  }, refreshRate);
}

function pulse_heartrate(intBPM) {
  const milliseconds_between_beats = 1 / (intBPM / 60) * 1000;
  window.setInterval(() => {
    pulse_heartbeat();
  }, milliseconds_between_beats);
  pulse_heartbeat;
}


async function pulse_heartbeat() {
  colourpulse();
  await new Promise(resolve => setTimeout(resolve, 300));
  colourpulse();

}

// Pulse the colours
async function colourpulse() {
  let colourPast = [
    "#5B6C5D",
    "#657967",
    //"#BCC7BE",
    //"#E9ECE9",
    //"#BCC7BE",
    "#657967",
    "#5B6C5D"
  ];
  let colourFuture = [
    "#E06D06",
    "#F37506",
    //"#FCBE88",
    //"#FEE9D7",
    //"#FCBE88",
    "#F37506",
    "#E06D06"
  ];

  // Get the combined string to change:
  let strCombined = document.getElementById("output_generated_combined").innerHTML;

  for (let i = 0; i < colourPast.length - 1; i++) {

    await new Promise(resolve => setTimeout(resolve, 25));

    // Replace values:
    strCombined = strCombined.replace(colourPast[i], colourPast[i + 1]);
    strCombined = strCombined.replace(colourFuture[i], colourFuture[i + 1]);

    // Send to HTML:
    document.getElementById("output_generated_combined").innerHTML = strCombined;

  }
}

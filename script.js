// Global variables:
let dif_past_days = 0;
let dif_toavg_days = 0;
let dif_toend_days = 0;
let dif_past_weeks = 0;
let dif_toavg_weeks = 0;
let dif_toend_weeks = 0;
let bolExplain = 0;

// Run these functions on load:
calcDays(120);
createPerspective(1);
animateLabels();
fit_to_height();
window.onresize = fit_to_height;
colourEnd();

//pulse_heartrate(60);

// Calling buttons to set lifespan age

// TODO map slowly unfolds and folds as years are changed

function setLifespan120() {
  calcDays(120);
  createPerspective(2);
  fit_to_height();
}

function setLifespan88() {
  calcDays(88);
  createPerspective(0);
  fit_to_height();
}

// --------------------------------------
// Function to create the Perspective map
// --------------------------------------

function calcDays(intLifespan) {
  // Calculate the number of weeks in the past and future
  const date_birthday = new Date("10/01/1983");
  const date_deathday = new Date(date_birthday.getTime());
  date_deathday.setFullYear(date_birthday.getFullYear() + intLifespan);
  const date_today = new Date();

  const avglifeyears = 88
  const date_avgdeathday = new Date(date_birthday.getTime());
  date_avgdeathday.setFullYear(date_birthday.getFullYear() + avglifeyears);

  const dif_past_ms = date_today.getTime() - date_birthday.getTime();
  dif_past_days = Math.ceil(dif_past_ms / (1000 * 3600 * 24));
  dif_past_weeks = dif_past_days / 7;

  const dif_toavg_ms = date_avgdeathday.getTime() - date_today.getTime();
  dif_toavg_days = Math.ceil(dif_toavg_ms / (1000 * 3600 * 24));
  dif_toavg_weeks = dif_toavg_days / 7;

  const dif_toend_ms = date_deathday.getTime() - date_avgdeathday.getTime();
  dif_toend_days = Math.ceil(dif_toend_ms / (1000 * 3600 * 24));
  dif_toend_weeks = dif_toend_days / 7;
  
}

function createPerspective(intPeriod) {
  // Generate the text strings
  var str_past = "-";
  var str_toavg = "-";
  var str_toend = "-";
  var int_pastPeriods = 1;
  var int_toavgPeriods = 1;
  var int_toendPeriods = 1;
  var lbl_Period = "";

  if (intPeriod == 0) {
    int_pastPeriods = dif_past_days;
    int_toavgPeriods = dif_toavg_days;
    int_toendPeriods = dif_toend_days;
    lbl_Period = "days";
  } else if (intPeriod == 1) {
    int_pastPeriods = dif_past_days / 7;
    int_toavgPeriods = dif_toavg_days / 7;
    int_toendPeriods = dif_toend_days / 7;
    lbl_Period = "weeks";
  } else {
    int_pastPeriods = dif_past_days / 365;
    int_toavgPeriods = dif_toavg_days / 365;
    int_toendPeriods = dif_toend_days / 365;
    lbl_Period = "years";
  }
  //var str_future_repeated = str_toavg.repeat(dif_toavg_weeks);

  // Add in length of time to the strings:
  var str_past_label =
    " " +
    int_pastPeriods.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    " " +
    lbl_Period +
    " ";
  if (bolExplain==1){str_past_label="The time that have passed"}; // Explanation override
  var dif_past_weeks_half = (dif_past_weeks - str_past_label.length) / 2;
  var str_past_labeled =
    str_past.repeat(dif_past_weeks_half) +
    str_past_label +
    str_past.repeat(dif_past_weeks_half);

  var str_toavg_label =
    " " +
    int_toavgPeriods.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    " " +
    lbl_Period +
    " ";
  if (bolExplain==1){str_toavg_label="The time remaining until reaching an average life span"}; // Explanation override
  var dif_toavg_weeks_half = (dif_toavg_weeks - str_toavg_label.length) / 2;
  var str_toavg_labeled =
    str_toavg.repeat(dif_toavg_weeks_half) +
    str_toavg_label +
    str_toavg.repeat(dif_toavg_weeks_half);

  var str_toend_label =
    " " +
    int_toendPeriods.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    " " +
    lbl_Period +
    " ";
  if (bolExplain==1){str_toend_label="The time remaining beyond an average life span"}; // Explanation override
  var dif_toend_weeks_half = (dif_toend_weeks - str_toend_label.length) / 2;
  var str_toend_labeled =
    str_toend.repeat(dif_toend_weeks_half) +
    str_toend_label +
    str_toend.repeat(dif_toend_weeks_half);
  
  //Add end to the labels
  //str_toend_labeled = str_toend_labeled.split(0,-3)+"END";

  // Combine the strings together:
  var str_combined =
    '<span style="background-color:#5B6C5D;">' + str_past_labeled + "</span>" 
    + '<span style="background-color:#FF3F00;">' + str_toavg_labeled + "</span>"
    + '<span style="background-color:#FF7F11;">' + str_toend_labeled + "</span>";
  //var str_past_combined = '<span style="background-color:#5B6C5D;">' + str_past_labeled + "</span>"
  //var str_toavg_combined = '<span style="background-color:#E06D06;">' + str_toavg_labeled + "</span>";
  //TODO fade the end of the string

  // Send to HTML:
  document.getElementById("output_generated_combined").innerHTML = str_combined;
}

function colourEnd(stageLen = 20){

  let colourToEnd = [
    "#FF871F",
    "#FF9233",
    "#FF9D47",
    "#FFA85C",
    "#FFB370",
    "#FFBE85",
    "#FFC999",
    "#FFD3AD",
    "#FFDEC2"
  ];

  let strCombined = document.getElementById("output_generated_combined").innerHTML;
  let strCombinedNew = "";
  let intStrLen = strCombined.length;
  let strEndSpan = "</span>";
  let strEnding = strCombinedNew.slice(0,intStrLen-stageLen-strEndSpan);
  let intGradientCounter = colourToEnd.length;
  let slicePos = 0;
  let j = 0;
  //console.log(strCombined);

  for (let i = 1; i <= colourToEnd.length; i++){
    j = intGradientCounter - i;
    slicePos=intStrLen-strEndSpan.length-i*stageLen;
    //console.log(slicePos);
    strCombinedNew = [strCombined.slice(0,slicePos),
    '</span><span style="background-color:',
    colourToEnd[j],';">',
    "-".repeat(stageLen),
    strEnding].join('');
    //console.log(strCombinedNew);
    strEnding = strCombinedNew.slice(slicePos,);
  }
  
  console.log("Original length: ",(strCombined.match(/-/g) || []).length);
  console.log("Altered  length: ",(strCombinedNew.match(/-/g) || []).length);
  
  // Send to HTML:
  document.getElementById("output_generated_combined").innerHTML = strCombinedNew;

}

// ------------------------------------
// Animations
// ------------------------------------

// Animate the label with a timed loop
function animateLabels() {
  const refreshRate = 300000 / 60;
  let lbl_typenum = 1;

  window.setInterval(() => {
    if (lbl_typenum == 2) {
      lbl_typenum = 0;
    } else {
      lbl_typenum = lbl_typenum + 1;
    }
    createPerspective(lbl_typenum);
    colourEnd();
  }, refreshRate);
}

// Pulse the main perspective map like a heartbeat
async function pulse_heartbeat() {
  colourpulse();
  //await new Promise(resolve => setTimeout(resolve, 300));
  //colourpulse();

}

// Pulse the colours
async function colourpulse() {
  let colourPast = [
    "#5B6C5D",
    "#657967",
    "#657967",
    "#5B6C5D"
  ];
  let colourFuture = [
    "#E06D06",
    "#F37506",
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

// Unused test function - to get something on the site pulsing like a heartrate

function pulse_heartrate(intBPM) {
  const milliseconds_between_beats = 1 / (intBPM / 60) * 1000;
  window.setInterval(() => {
    pulse_heartbeat();
  }, milliseconds_between_beats);
  //pulse_heartbeat;
}

// FUNCTION:  To toggle explanations or counters
async function toggle_labels(){
  let butToggle = document.getElementById("but_toggle_labels");
  const ToggleStates = ["explain", "time"];

  if (butToggle.innerHTML==ToggleStates[0]){
    butToggle.innerHTML=ToggleStates[1];
    bolExplain=1;
    createPerspective(0);
  } else {
    butToggle.innerHTML=ToggleStates[0];
    bolExplain=0;
    createPerspective(0);
  }
}


function fit_to_height(){

  // get dimensions of vietport:
  let viewportHeight = window.innerHeight;
  let viewportWidth = window.innerWidth;
  // let viewportSum = viewportHeight + viewportWidth;
  let vietportArea = viewportHeight * viewportWidth;
  // console.log(viewportWidth + "x" + viewportHeight );

  // get perspective string:
  let output = document.getElementById("output_generated_combined");
  let firstline = document.getElementById("firstline");
  let butToggle = document.getElementById("but_toggle_labels");
  let strCombined = output.innerHTML;

  // calculate dimensions for new font size:
  let intStringLength = strCombined.length;
  let numX_prescale = intStringLength * (viewportWidth/vietportArea);
  let numY_prescale = intStringLength * (viewportHeight/vietportArea);
  let num_scaler = (intStringLength / (numX_prescale * numY_prescale))**(0.5); // scaler used to scale up X and Y

  let numX = Math.floor(numX_prescale * num_scaler)
  let numY = Math.floor(numY_prescale * num_scaler)
  let fontWidthPX = viewportWidth / numX;
  const fontScaler = 1.18; // Adjustment by this scaler as height of font greater than width and we want to fill the space
   
  output.style.fontSize=(fontWidthPX * fontScaler) +"px";  // Adjust by scaler as fontheight is larger than fontwidth in monospace
  firstline.style.fontSize=(fontWidthPX * fontScaler) +"px";  // Adjust by scaler as fontheight is larger than fontwidth in monospace
  butToggle.style.fontSize=(fontWidthPX * fontScaler) +"px";  // Adjust by scaler as fontheight is larger than fontwidth in monospace
}
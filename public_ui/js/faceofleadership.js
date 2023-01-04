var sticky = [
    document.getElementById("header1"),
    document.getElementById("header2"),
    document.getElementById("header3"),
    document.getElementById("header4")
];

let startPos = [sticky[0].offsetTop, sticky[1].offsetTop, sticky[2].offsetTop, sticky[3].offsetTop];
let maxBackgroundHeight = document.getElementById("bg_collage").offsetHeight

$(document).on({
    scroll: function () {
        refreshVariables();
        scrollAndStick();
        scrollParallax();
    },
    ready: function () {
        refreshVariables();
        scrollAndStick();
        scrollParallax();
    }
});

function refreshVariables(){
    
    intBuffer = 150

    stickyHeight = [
        sticky[0].offsetHeight,
        sticky[1].offsetHeight,
        sticky[2].offsetHeight,
        sticky[3].offsetHeight
    ];
    
    stickyPos = [intBuffer, stickyHeight[0] + intBuffer, stickyHeight[1] + stickyHeight[0] + intBuffer, 
                    stickyHeight[2] + stickyHeight[1] + stickyHeight[0] + intBuffer];

    maxScroll = [
        startPos[0] - stickyPos[0],
        startPos[1] - stickyPos[1],
        startPos[2] - stickyPos[2],
        startPos[3] - stickyPos[3]
    ];

}

function scrollAndStick() {

    var scroll = window.pageYOffset;

    let intDisappearPoint = maxBackgroundHeight - stickyPos[3] - stickyHeight[3]

    for (let i = 0; i < sticky.length; i++) {
        if (scroll > (intDisappearPoint)) {
            sticky[i].style.top = (stickyPos[i] - (scroll - intDisappearPoint)) + "px";
            sticky[i].style.position = "fixed";
        } else if (scroll > maxScroll[i]) {
            sticky[i].style.top = stickyPos[i] + "px";
            sticky[i].style.position = "fixed";
        } else {
            sticky[i].style.position = "absolute";
            sticky[i].style.top = startPos[i] + "px";
        }
    }
}


function scrollParallax(){

    var scroll = window.pageYOffset;
    var speed = 0.5;

    images = document.getElementsByClassName("img-parallax");

    for (let img of images){
        img.style.top = scroll * speed + "px";
    }
}

function populateStats() {

    console.log("getting statsJSON")

    // Calculate benchmark white percentage:
    let dblCompany_PercentWhite = 0;
    const PercentWhite_London = 0.528;
    const PercentWhite_OutsideLondon = 0.863;


    fetch('./js/faceofleadership_stats.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('numberOfPeopleComplete_A').textContent = data.numberOfPeopleCompleted.toLocaleString();
            document.getElementById('numberOfPeopleComplete_B').textContent = data.numberOfPeopleCompleted.toLocaleString();
            document.getElementById('date_last_update').textContent = data.date_last_updated;
            // document.getElementById('total_people_counter').textContent = data.countTotalPeople.toLocaleString();
            document.getElementById('numberOfCompanies').textContent = data.numberOfCompanies.toLocaleString();
            document.getElementById('percentMale').textContent = Math.round(data.percentMale);
            document.getElementById('percentWhite').textContent = Math.round(data.percentWhite);
            document.getElementById('companyList').textContent = data.companyList;
            
            dblCompany_PercentWhite = PercentWhite_London*data.Company_PercentInLondon + PercentWhite_OutsideLondon * (1-data.Company_PercentInLondon)
            dblCompany_PercentWhite = Math.round((dblCompany_PercentWhite * 100))
            document.getElementById('weightedAvgBenchmarkWhite').textContent = Math.round(dblCompany_PercentWhite);
            document.getElementById('weightedAvgBenchmarkWhite_detail').textContent = Math.round(dblCompany_PercentWhite);

            document.getElementById('Company_PercentInLondon').textContent = (data.Company_PercentInLondon * 100).toFixed(1);
            document.getElementById('Company_PercentNotInLondon').textContent = ((1-data.Company_PercentInLondon) * 100).toFixed(1);
            document.getElementById('PercentWhite_London').textContent = (PercentWhite_London * 100).toFixed(1);
            document.getElementById('PercentWhite_OutsideLondon').textContent = (PercentWhite_OutsideLondon * 100).toFixed(1);
        });
}
// Run these on load:
populateStats();


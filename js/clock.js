"use strict";

const info = $('#info'); // declare selector as const for optimization
let errormessage = $('#errormessage'); // declare selector to show error
const api_key = 'K94T6QNCY3IC'; //  declare fetch key as const
const timeText =  'changetimer'; // declare any class name you want
//declare an arrow async function to wait for fetch and response and after return data
const getLocation = async ()=>{ 
    const response = await fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=${api_key}&format=json`)
    const data = await response.json();
    return data;   
}

//resusable function to return any html with some variables
// copy paste any html and change the values on function call
const showtext = (a,b,c,d,e)=>{
    return `
    <div class="list-group shadow">
            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
            <div class="d-flex flex-row w-100 justify-content-between align-items-center backgreen">
            <div class="w-50">  
                <h5 class=" align-middle mb-1"><img src="https://www.countryflags.io/${a}/flat/64.png"> ${b}</h5>
                <p>${c}</p>
            </div>  
            <div class="w-50 backyellowgreen">
                <small class="${timeText} align-middle" data-${d}="${e}"></small>
                </div>   
            </div>
            </a> 
    </div>
    `;
}

//function to show data
const displayData = (data) => {
  for (let key in data.zones){
    const countryname = data.zones[key].countryName;//||||||
    const countrycode = data.zones[key].countryCode;//||||||
    const zonename = data.zones[key].zoneName;      //||||||--->data variables
    const unixtimestamp = data.zones[key].timestamp; //|||||
    const countrytime = new Date(unixtimestamp*1000);//|||||
    const dataText = showtext(countrycode,countryname,zonename,'countrytime',countrytime); //return data html
    info.append(`${dataText}`); //append html
}
}

//function to update time 
const updateTime = () => {
    const $el = $(`.${timeText}`); // declare to a const for optimization
    let startTime = Date.now(); // The Date.now() method returns the number of milliseconds since January 1, 1970 00:00:00 UTC.
    setInterval(function() { // start interval
      let elapsedTime = Date.now() - startTime; // time passed is time after interval minus time before interval (100ms) 
      $el.each(function() { // for each element
        const datakey = Object.keys($(this).data())[0]; // get data attribute name
        let countrytime = $(this).data(datakey); // get time from data attribute and set it to countrytime variable
        let finaltime = new Date(countrytime); // creates a new date object with the date and time of countrytime variable
        finaltime.setMilliseconds(finaltime.getMilliseconds() + elapsedTime); // add ms from elapsedtime variable to finaltime
        $(this).html(finaltime.toISOString().split('G')[0].split('T')[1].split('.')[0]); //show time with only time value
      });
    }, 100); //end interval
}


window.addEventListener("load",()=> { //execute when the page is fully loaded
    getLocation().then(data => { Promise.all([displayData(data) ,updateTime()])}).catch( err => {errormessage.innerHTML = `${err}`;}); // executes main function with an array of functions as promise
})




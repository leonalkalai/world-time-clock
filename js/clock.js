"use strict";

const info = $('#info'); // declare selector as const for optimization
const errormessage = $('#errormessage'); // declare selector to show error
const api_key = 'K94T6QNCY3IC'; //  declare fetch key as const

//declare an arrow async function to wait for fetch and response and after return data
const getTimezone = async ()=>{ 
    const response = await fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=${api_key}&format=json`);
    const data = await response.json();
    if (response.ok) return data;   
    throw new Error(response.status)
}

//function to show data
const displayData = (data) => { 
  for (let key in data.zones){
    data.zones[key].countryName.indexOf("Macedonia") >= 0 ? data.zones[key].countryName = 'Skopje' : data.zones[key].countryName;
    const countryname = data.zones[key].countryName;//||||||
    const countrycode = data.zones[key].countryCode;//||||||
    const zonename = data.zones[key].zoneName;      //||||||--->data variables
    const unixtimestamp = data.zones[key].timestamp; //|||||
    const countrytime = new Date(unixtimestamp*1000);//|||||
    let randomCountryName = data.zones[Math.floor(Math.random()*data.zones.length)]; // create random countryname for mixUp search
    const dataText = `
    <div class="list-group shadow mix ${randomCountryName.countryName}"> 
            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
            <div class="d-flex flex-row w-100 justify-content-between align-items-center backgreen">
            <div class="w-50 countryname">  
                <h5 class="align-middle mb-1"><img src="./images/svg/${countrycode}.svg">${countryname}</h5>
                <p>${zonename}</p>
            </div>  
            <div class="w-50 backyellowgreen">
                <small class="changetimer align-middle" data-countrytime="${countrytime}"></small>
                </div>   
            </div>
            </a> 
    </div>
    `;
     //return data html
    info.append(dataText); //append html
    }
}

//function to update time 
const updateTime = () => {
    const $el = $(".changetimer"); // declare to a const for optimization
    let startTime = Date.now(); // The Date.now() method returns the number of milliseconds since January 1, 1970 00:00:00 UTC.
    setInterval(function() { // start interval
      let elapsedTime = Date.now() - startTime; // time passed is time after interval minus time before interval 
      $el.each( function() { // for each element 
        const datakey = Object.keys($(this).data())[0];
        let countrytime = $(this).data(datakey); // get time from data attribute and set it to countrytime variable
        let finaltime = new Date(countrytime); // creates a new date object with the date and time of countrytime variable
        finaltime.setMilliseconds(finaltime.getMilliseconds() + elapsedTime); // add ms from elapsedtime variable to finaltime
        $(this).html(finaltime.toISOString().split('G')[0].split('T')[1].split('.')[0]); //show time with only time value
      });
    }, 100); //end interval
}


window.addEventListener("load",()=> { //execute when the page is fully loaded
    getTimezone()
    .then(data => {
        displayData(data);
    })
    .then(updateTime)
    .catch( error => {errormessage.html(`${error}`);}); // executes main function with an array of functions as promise 
})



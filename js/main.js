"use strict";

window.addEventListener("load",()=> {
  getLocation()
})

let info = $('#info');
let errormessage = $('#errormessage');
const api_key = 'K94T6QNCY3IC';
let countrytime, finaltime, countryname, zonename, countrycode, unixtimestamp;
function getLocation(){
    fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=${api_key}&format=json`)
    .then( res => {
        if (!res.ok) { throw res }
        return res.json() 
      })
    .then(data => { 
      displayData(data)
    })
   .then(updateTime)
    .catch( err => {
      errormessage.innerHTML = `${err}`;
  });
}

function displayData(data) {
  for (let key in data.zones){
    countryname = data.zones[key].countryName;
    countrycode = data.zones[key].countryCode;
    zonename = data.zones[key].zoneName;
    unixtimestamp = data.zones[key].timestamp;
    countrytime = new Date(unixtimestamp*1000);
    $('#info').append(`
        <div class="list-group shadow">
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
          <div class="d-flex flex-row w-100 justify-content-between align-items-center backgreen">
          <div class="w-50">  
            <h5 class=" align-middle mb-1"><img src="https://www.countryflags.io/${countrycode}/flat/64.png"> ${countryname}</h5>
            <p>${zonename}</p>
          </div>  
          <div class="w-50 backyellowgreen">
            <small class="changetimer align-middle" data-countrytime="${countrytime}"></small>
            </div>   
          </div>
        </a> 
      </div>
    `); 
}
}


function updateTime() {
    $(".changetimer").each(function(i,el){
    let datakey = Object.keys($(el).data())[0];
    setInterval(function() {
            countrytime = $(el).data(datakey);
            finaltime = new Date(countrytime);
            finaltime.setSeconds(finaltime.getSeconds() + 1);
            $(el).data('countrytime',finaltime);
            $(el).html(finaltime.toISOString().split('G')[0].split('T')[1].split('.')[0])
    }, 1000); 
})
}





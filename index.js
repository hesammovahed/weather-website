
const getLocation = async ()=>{
    const urlLocation ="http://ip-api.com/json/?fields=country,city,lat,lon,timezone";
    const response = await fetch(urlLocation);
    const data = await response.json();

    return data;
}

const getWeather = async (lat,lon) =>{
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d9eb3f2227256720905ab383fd50379`;
    const response = await fetch(urlWeather);
    const data = await response.json();

    return data;
}

const getNightOrDay =()=>{
    let data = new Date()
    let nightOrday;
    // data.getHours() > 7 && data.getHours() <= 19
    //   ? (nightOrday = "Day")
    //   : (nightOrday = "Night");
    if(data.getHours()>7 && data.getHours()<=19){
        nightOrday="Day"
    }else{
        nightOrday="Night"
    }
    return nightOrday;
}



function getIcon(weMain){
    let icon;
    switch (weMain) {
      case "Thunderstorm":
        icon = `${weMain}.svg`;
        break;
      case "Drizzle":
        icon = `${weMaion}.svg`;
        break;
      case "Rain":
        icon = `${weMain}.svg`;
        break;
      case "Snow":
        icon = `${weMain}.svg`;
        break;
      case "Clear":
        const data = getNightOrDay();
        icon = `${weMain}-${data}.svg`;
        break;
      case "Clouds":
        icon = `${weMain}.svg`;
        break;
      case "Atmosphere":
        icon = `${weMain}.svg`;
        break;
    }
    return icon;
}

function getTemp(weTemp){
    const K = weTemp;
    const F = (K-273.15)*9/5+32;
    const C = K -273.15;
    return temp ={kel:Math.floor(K),far:Math.floor(F),can:Math.floor(C)};
}
const locationTimezoon =document.querySelector('#timezone')
const degree = document.querySelector(".degree");
const degreeN =document.querySelector('#one')
const degreeT =document.querySelector('#two')
const degreeText=document.querySelector(".degree-text")
const img =document.querySelector('.icon')



getLocation().then((locData)=>{
    const timezone = locData.timezone;
    locationTimezoon.textContent=timezone
        return getWeather(locData.lat,locData.lon);
}).then(weData=>{
   const weTemp=weData.main.temp
   const weMain=weData.weather[0].main;
   const weDec = weData.weather[0].description;

   const iconName=getIcon(weMain);
   img.innerHTML = `<img src="icon/${iconName}"/>`;
   degreeN.textContent=Math.floor(weTemp);
   degreeT.textContent="K"

   degreeText.textContent=weDec

degree.addEventListener('click',(e)=>{
    if(degreeT.textContent=="K"){
        degreeN.textContent=getTemp(weTemp).far
        degreeT.textContent="F"
    }else if (degreeT.textContent == "F") {
          degreeN.textContent = getTemp(weTemp).can;
          degreeT.textContent = "C";
    } else {
              degreeN.textContent = getTemp(weTemp).kel;
              degreeT.textContent = "K";
    }
})

})
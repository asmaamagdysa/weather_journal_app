/* Global Variables */
let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let myKey = '&appid=e593d2f86f222101cfc02d8ce08b62b9';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let btnGenerate = document.getElementById('generate');
btnGenerate.addEventListener('click',dataFun);


async function dataFun() {
    let Zipcode  = document.getElementById('zip').value;
    let userFeeling= document.getElementById('feelings').value;
    console.log(Zipcode );
    //  return data from the external API.
    async function getData (){
      
          const res = await fetch(weatherURL+Zipcode+myKey)
       
         
          try {
           
            const data = await res.json();
            console.log(data);
           return data
          }  catch(error) {
           
            console.log("error", error);
          }
        }
        console.log(getData());
        getData().then(
            (res) => {return res},
            (rej) => console.log("error " + rej)
          ).then(
            (res) => {
            postData('http://localhost:8080/addData',{date:newDate,temp:res.main.temp,feeling:userFeeling})
            .then((res) => {
              updatesUI()
            });
          }
          )

       
          
  }
  
// POST request to add the API data
  async function postData(url = '', data = {}) {
    console.log("data");
    console.log(data);
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
        
      body: JSON.stringify(data), 
    });
    
      try {
        return res.json(); 
      }catch(error) {
      console.log("error", error);
      }
      
  }
// updates the UI
  async function updatesUI() {
    const res = await fetch('http://localhost:8080/getData')
      try{
        const resJson = await res.json();
        console.log( resJson);
        document.getElementById('date').innerHTML = ` Date : ${ resJson[0].date }`;
        document.getElementById('temp').innerHTML = ` Temperature : ${ Math.round(resJson[0].temp) } degrees`;
        document.getElementById('content').innerHTML = `  You feeling : ${ resJson[0].feeling }`;
    
      }catch(error){
        console.log("error", error);
      }
    
   

  }
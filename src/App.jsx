import axios from 'axios'
import { useState , useEffect} from 'react'
import './App.css'

function App() {

  const [Cargado, setCargado] = useState(false)
  const [Clima, setClima] = useState()
  const [IsCelsius, setIsCelsius] = useState(false)
  
  
  const APIkey = `1c91f7550d0182a129c5f9708a5a48bf`
  let lat
  let lon
 

  useEffect(() => {
   
    function success(pos) {
      let crd = pos.coords;
    
      console.log('Your position is:');
      lat = crd.latitude;
      lon = crd.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      console.log(lat);
      console.log(url);
      axios.get(url)
      .then(resp => {
        setClima(resp)
        setCargado(true)
        console.log(resp.data)
        })
    };
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  function Celsius() {
    setIsCelsius(!IsCelsius)
    console.log(IsCelsius)
  }
  
  if(Cargado){
    return (
      <div className="App">
        <h1>Weather App</h1>
        <div className="App_first">
        <img src={`http://openweathermap.org/img/wn/${Clima.data.weather[0].icon}@2x.png`} alt="" />
        <div>
          <p>{IsCelsius? 
            Math.round((Clima.data.main.temp - 273.15) * 9/5 + 32).toFixed(1) + ' °F.':
            Math.round(Clima.data.main.temp- 273.15).toFixed(1) + ' °C.'}</p>
          <p>Temp</p></div>
        </div>
        
        <h2>{Clima.data.name+" , "+Clima.data.sys.country}</h2>

        <div className="App_second">
        <div className='App_second_card'><p className='Mediano'>{
          IsCelsius? 
            Math.round((Clima.data.main.feels_like - 273.15) * 9/5 + 32).toFixed(1) + ' °F.':
            Math.round(Clima.data.main.feels_like- 273.15).toFixed(1) + ' °C.'}
        </p><p>Feels Like</p></div>
        <div className='App_second_card'><p className='Mediano'>{Clima.data.main.humidity + ' %'}</p><p>Humidity</p></div>
        <div className='App_second_card'><p className='Mediano'>{Clima.data.main.pressure + ' hPa'}</p><p>Pressure</p></div>
        
        </div>
        <br />
        <button onClick={Celsius}>
        {IsCelsius? 'Change to Celsius': 'Change to Fahrenheit'} </button>
      </div>
    )}
      else
  return (
    <div className="App">
      <p>no cargado</p>
    </div>
  )
}

export default App

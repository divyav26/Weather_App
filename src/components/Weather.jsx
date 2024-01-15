import React, { useEffect, useState } from 'react'
import Search from './Search'
import '../App.css';

const Weather = () => {
    const [search, setSearch] = useState('')
    const [loading , setLoading] = useState(false)
    const [weatherDate, setWeatherDate]= useState(null)
    
    async function fetchApi(param){
        setLoading(true)
        try{
            const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=4f0e043cd2f546f3f184bb2ce26585ba`)
            const data =await response.json();
            console.log(data)
            if(data){
                setLoading(false)
                setWeatherDate(data)
            }
        }catch(e)
        {
            setLoading(false)
            console.log(e)
        }
    }

    function getCurrentDate(){
        return new Date().toLocaleDateString('en-us',{
            weekday:'long',
            month:'long',
            day:'numeric',
            year:'numeric'
        })
    }
    // call api 
    async function handleSearch(){
        fetchApi(search)
    }

    useEffect(()=>{
        fetchApi('mumbai')
    },[])
    // console.log(fetchApi)

  return (
    <div>
      <Search search={search} setSearch = {setSearch}  handleSearch={handleSearch}/>
        {
            loading ? (<div className='loading'>Loading...</div>):
            (<div>
                <div className='city-name'>
                    <h2>{weatherDate?.name},  <span>{weatherDate?.sys?.country}</span></h2>
                </div>
                <div className='data'>
                    <span>{getCurrentDate()}</span>
                </div>
                <div className='temp'>
                    {weatherDate?.main?.temp}
                    <p className='description'>
                        {weatherDate && weatherDate.weather[0]? weatherDate.weather[0].description:''}
                    </p>
                </div>

                <div className='weather-info'>
                    <div className='speed'>
                        <p>{weatherDate?.wind?.speed}</p>
                        <p>Wind Speed</p>
                     </div>

                     <div className='humidity'>
                        <p>{weatherDate?.main?.humidity}%</p>
                        <p>Humidity</p>
                     </div>
                </div>
            </div>)
        }
    </div>
  )
}

export default Weather

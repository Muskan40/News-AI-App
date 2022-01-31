import React,{useEffect,useState} from 'react'

import "./styles.css"
const Weathercard = ({Articles}) => {
    
    const [datas,setdatas]=useState([]);
    useEffect(() => {
       
                console.log(Articles);
                const {temp,humidity,pressure}=Articles.main;
                const{main:weathermood}=Articles.weather[0];
                const{name}=Articles;
                const{speed}=Articles.wind;
                const{country,sunset}=Articles.sys;
                console.log(temp);
                const tempdata=[temp,humidity,pressure,weathermood,name,speed,country,sunset]
                setdatas(tempdata);
                
    },[datas])



    const Images=["images/cloudy.gif","images/haze.gif",'images/clear.gif',"images/rainy.gif","images/mist3.gif","images/thunder.gif"];
     let z=Images[0];
    
        if(datas[3]==='Clouds')
        {
            z=Images[0];
        }
        else if(datas[3]==='Haze')
        {
            z=Images[1];
        }
        else if(datas[3]==='Clear')
        {
            z=Images[2];
        }
        else if(datas[3]==='Mist')
        {
            z=Images[4];
        }
        else if(datas[3]==='Rain')
        {
            z=Images[3];
        }
        else if(datas[3]==='Thunder')
        {
            z=Images[5];
        }
    console.log(z);
    
    let sec=datas[7];
    let date=new Date(sec*1000);
    let time=`${date.getHours()}:${date.getMinutes()}`;
    // console.log(arr);
    

    return (
        <>
            <article className="widget29">
               <div className='weatherIcon29'>
                <div className='weatherIcon229'>
               <img src={z} alt="Not Available" className="gif29" />
                  {/* <i className={`wi ${weatherState}`}></i>  */}
                  </div>
                </div>
                    <div className="weatherInfo29">
                        <div className='temperature29'><span>{datas[0]}</span><span>C</span></div>
                        <div className="description29">
                            <div className="weatherCondition29">{datas[3]}</div>
                            <div className="place29">{datas[4]},{datas[6]}</div>
                        </div>
                    </div>
                    <div className="date29">{new Date().toLocaleString()}</div>
                    
                    <div className="extra-temp29">
                        <div className='temp-info-minmax29'>
                            <div className="two-sided-section29">
                            <p>
                                <i className={"wi wi-sunset"}></i></p>
                            <p className="extra-info-leftside29">Sunset<br/><br/><span style={{color:'white'}}>{time}</span></p>
                        </div>

                        <div className="two-sided-section29">
                            <p>
                                <i className={"wi wi-humidity"}></i></p>
                            <p className="extra-info-leftside29">Humidity<br/><br /><span style={{color:'white'}}>{datas[1]}</span></p>
                        </div>
                        </div>
                        <div className="weather-extra-info29">
                        <div className="two-sided-section29">
                            <p>
                                <i className={"wi wi-rain"}></i></p>
                            <p className="extra-info-leftside29">pressure<br/><br/><span style={{color:'white'}}>{datas[2]}MM</span></p>
                        </div> 
                        <div className="two-sided-section29">
                            <p>
                                <i className={"wi wi-strong-wind"}></i></p>
                            <p className="extra-info-leftside29">speed<br/><br/><span style={{color:'white'}}>{datas[5]}</span></p>
                        </div>
                        </div>
                     
                    </div>
           </article>
        </>
    )
}

export default Weathercard;

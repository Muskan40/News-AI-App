
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import React,{useEffect,useState} from 'react';
import NewsCards from './component/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './style.js';
import Weathercard from './component/weather/Weather';
const alankey="25954a1b245e5db0fbe33b07d62fc9a02e956eca572e1d8b807a3e2338fdd0dc/stage";
const  App=()=> {
const[newsArticles,setnewsArticles]=useState({});
const[activearticle,setActiveArticle]=useState(-1);
const [check,ischeck]=useState(true);
const classes=useStyles()

  useEffect(()=>{
    alanBtn({
      key:alankey,
      onCommand:({command,articles,number})=>{
        if(command==='newHeadlines')
        {
          ischeck(true)
          setnewsArticles(articles);
          setActiveArticle(-1);
          console.log(articles);
          console.log(newsArticles);
          
          
          
        }
        else if(command==='highlight')
        {
          
          setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
          
        }
        else if(command==='open')
        {
          console.log(number);
          const parsenumber=number.length>2 ? wordsToNumbers(number,{fuzzy:true}):number;
          const article=articles[parsenumber-1];
          if(parsenumber>20)
          {
            alanBtn().playText('please try that again!!,sorry');
          }
          else if(article)
          {
            window.open(article.url,'_blank');
            alanBtn().playText('opening!!');

        }
      }
        else if(command === 'weather')
        {
          
         console.log(articles)
         
            alanBtn().playText('opening weather interface');
           
             
            
            setnewsArticles(articles);
            ischeck(false);
           
          }
          
          
          
          
          
          



        }
          
        
      

    })
  },[])
  return (
    <div className="App">
      <h1 className="colors">AI News Application</h1>
      {/* <div className={classes.logoContainer}>
        <img src="https://i.pinimg.com/originals/ae/d1/1d/aed11d6975231b91c8e992c02b8376da.gif"className={classes.alanLogo} alt="alan logo" />
      </div> */}
      
        {
        
         check===true ?  <NewsCards Articles={newsArticles} activearticle={activearticle}/>:<Weathercard Articles={newsArticles} />
        }
       
      
      
    </div>
  );
}

export default App;



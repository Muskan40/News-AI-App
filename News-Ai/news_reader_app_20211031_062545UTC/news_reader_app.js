// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});// Use this sample to create your own voice commands
intent('how are you?','are you fine?','hey alan!!',
      reply('hey,i m fine.'));

// intent('alert me',(p)=>{
//     p.play({command:'testcommand'})
// });

//news by source
const API_KEY='81435215e4744194a347203015650817';
let savedArticles=[];
let check=false;
intent(`(Give me news from | tell me news from )$(source* (.+))`, (p)=>{
    check=false;
    //let date = new Date().toISOString().split('T')[0];
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
//     console.log(p.source.value);
    if (p.source.value){
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
    }
//     console.log(NEWS_API_URL);
      //NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=81435215e4744194a347203015650817';
    api.request(NEWS_API_URL, (error, response, body)=>{
        console.log(body)
        const { articles } =JSON.parse(body);
//          console.log(body);
//          console.log(articles);
        
        
        if(!articles.length) {
//             console.log(articles.length)
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        savedArticles = articles;
        
        p.play({command : 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) ${p.source.value} news.`);
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});
//news by terms

intent(`what\'s up with $(term* (.+))`, (p)=>{
    check=false;
    //let date = new Date().toISOString().split('T')[0];
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&country=in`;
//     console.log(p.source.value);
    if (p.term.value){
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }
//     console.log(NEWS_API_URL);
      //NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=81435215e4744194a347203015650817';
    api.request(NEWS_API_URL, (error, response, body)=>{
        console.log(body)
        const { articles } =JSON.parse(body);
         console.log(body);
         console.log(articles);
        
        
        if(!articles.length) {
            console.log(articles.length)
            p.play('Sorry, please try searching for something else!!');
            return;
        }
        savedArticles = articles;
        
        p.play({command : 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) articles on  ${p.term.value}.`);
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});


// news by category
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    check=false;
   let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
//     console.log(p.source.value);
    if (p.C.value){
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.C.value}`;
    }
//     console.log(NEWS_API_URL);
      //NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=81435215e4744194a347203015650817';
    api.request(NEWS_API_URL, (error, response, body)=>{
        console.log(body)
        const { articles } =JSON.parse(body);
         console.log(body);
         console.log(articles);
        
        
        if(!articles.length) {
            console.log(articles.length)
            p.play('please try searching for diffrent category!!');
            return;
        }
        savedArticles = articles;
        
        p.play({command : 'newHeadlines', articles});
        if (p.C.value){
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.C.value}`;
        p.play(`Here are the (latest|recent) articles on  ${p.C.value}.`);
         }
        else{
          p.play(`Here are the (latest|recent) articles`);  
        }

        p.play('Would you like me to read the stuffs?');
        p.then(confirmation);
    });
});

const confirmation=context(()=>{
    
    intent('yes', async (p)=>{
        for(let i=0;i<savedArticles.length;i++)
        {
            p.play({command:'highlight',article:savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no',(p)=>{
        p.play('sure sounds good to me')
    })
})

//opening the news

intent('(please open page number|open page number|can you open page number) $(number* (.+))',(p)=>{
    check=false;
    if(p.number.value)
        {
          p.play({command:'open',number:p.number.value,articles:savedArticles});
        }
})
intent('go back',(p)=>{
    
    p.play('sure,going back');
    if(check==false)
        {
    p.play({command:'newHeadlines',articles:[]})
        }
    else{
        p.play({command:'weather',articles:[]});
        
    }
})
intent(`(please stop reading|stop|be quiet)`,(p)=>{
    p.play('sure turning off');
    p.deactivate();
})

//weather news
const API_KEY2='44185e228b4782338e87a603e786cfb2'
intent(`( tell me weather of|weather of|show weather of )$(source* (.+))`, (p)=>{
//     //let date = new Date().toISOString().split('T')[0];
    check=true;
        let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${p.source.value.toLowerCase().split(" ").join("-")}&appid=${API_KEY2}`;
//     
// //     if (p.source.value){
// //         NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
// //     }
// // //     console.log(NEWS_API_URL);
// //        NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=81435215e4744194a347203015650817';
    api.request(weather_url, (error, response, body)=>{
        
        const articles =JSON.parse(body);
         console.log(articles);
        
//         if(!articles.length) {
// //             console.log(articles.length)
//             p.play('Sorry, please try searching for diffrent places');
//             return;
//         }
// //         savedArticles = articles;
//         
        p.play({command : 'weather',articles});
    })
 
        
    
    
});
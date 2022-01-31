import React from 'react';
import {Grid,Grow,Typography} from '@material-ui/core';
import NewsCardss from '../NewsCard/NewsCardss';

import useStyles from './style.js';

const infoCards = [
    { color: '#050117', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#050117', title: 'weather information', text: 'Weather of Pune' },
    { color: '#050117', title: 'News by Categories', info: 'Business, General, Health, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#050117', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones', text: 'What\'s up with PlayStation 5' },
    { color: '#050117', title: 'News by Sources', info: 'NDTV News, Wired,The Times Of India,The Verge, IGN, News 18, Hindustan Times...', text: 'Give me  news from The Times Of India' },
    
  ];
const NewsCards = ({Articles,activearticle}) => {
    const classes=useStyles();
    if(!Articles.length)
    {
        return(
            <Grow in>
            < Grid className={classes.container} container alignItems="stretch" spacing={6}>
                {infoCards.map((infoCard)=>{
                    return(
                        <Grid item xs={12} sm={6} md={4} lg={6} className={classes.infoCard}>
                            <div className={classes.card}style={{backgroundColor:infoCard.color}}>
                                <Typography  variant="h5" style={{color:'#52057b'}}>{infoCard.title}</Typography>
                                {
                                infoCard.info?(<Typography variant="h6">
                                    <strong>
                                        {infoCard.title.split(' ')[2]};
                                        <br/>
                                        {infoCard.info}

                                    </strong>
                                    </Typography>):null
                                }<br/>
                                <Typography variant="h6">Try Saying:<br/><i>{infoCard.text}</i></Typography>

                            </div>

                        </Grid>
                    )
                })
    }
            </Grid>
            </Grow>
        )
    }
    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={10}>
            {Articles.map((article,i)=>{
                return (
                    <Grid item xs={12} sm={6} md={4} lg={6} style={{display:'flex'}}>
                    <NewsCardss article={article} activearticle={activearticle} i={i}/>
                    </Grid>
                )  
                
            })}

            </Grid>
        </Grow>
    );
}

export default NewsCards;

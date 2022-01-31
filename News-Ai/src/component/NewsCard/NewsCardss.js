import React, { createRef,useEffect,useState,useRef } from 'react'
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';
const NewsCardss = ({article:{description,publishedAt,source,title,url,urlToImage},i,activearticle}) => {
    const classes=useStyles();
    const [elRefs,setElRefs]=useState([]);
    const scrollToRef=(ref)=>window.scroll(0,ref.current.offsetTop-50);


    useEffect(() => {
        setElRefs((refs)=>Array(20).fill().map((_,j)=>refs[j] || createRef()));    
    }, []);
    useEffect(() => {
        if(i===activearticle && elRefs[activearticle])
        {
            scrollToRef(elRefs[activearticle]);
        }
        
    }, [i,activearticle,elRefs]);
    return (
        <Card ref={elRefs[i]}className={ classNames(classes.card,activearticle===i? classes.activeCard:null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media}image={urlToImage || 'https://static.toiimg.com/thumb/msid-80067386,width-1070,height-580,imgsize-127229,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'}/>
                <div className={classes.details}>
                    <Typography variant="body2" style={{color:'white'}} component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" style={{color:'white'}} component="h2">{source.name}</Typography>
                </div>
                <Typography style={{color:'white'}}className={classes.title} gutterBottom variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" style={{color:'white'}} component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Typography ref={elRefs[i]} className={ classNames(classes.colors,activearticle===i? classes.colorCard:null)} variant="h5">{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCardss;

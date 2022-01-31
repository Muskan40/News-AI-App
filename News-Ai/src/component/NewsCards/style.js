import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    container:{
        padding:'0 6%',
        width:'100%',
        margin:0,

    },
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:'100%',
        padding:'10%',
        borderRadius:10,
        color:'white',
        boxShadow:'2px 1px 2px 3px #52057b',

    },
    infoCard:{
        display:'flex',
        flexDirection:'column',
        textAlign:'center',
    }
});

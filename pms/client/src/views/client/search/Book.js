import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol'
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation'
import RoomIcon from '@material-ui/icons/Room'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderBottom: '1px solid grey',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
    pricing: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 111,
        height: 110,
        margin: 10
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    button: {
        backgroundColor: '#00a9e0'
    }
}))


export const Book = ({ id, image, city, price, valet, section, name, slots }) => {
    const classes = useStyles();

    const history = useHistory();

    const routeChange = () => {
        let path = `../checkout`;
        history.push(path, { id, section, name, city, price });
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={image}
                title={`${name} | ${section}`}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {city.length > 10 ? city.slice(0, 9) : city} | {section.length > 10 ? section.slice(0, 9) : section} <RoomIcon />
                    </Typography>
                </CardContent>
                <div className={classes.controls}>

                    {
                        slots > 1 ?

                            (<Button variant="contained" size="medium" color="primary" onClick={routeChange} >
                                Book now
                            </Button>)
                            :
                            (<Button variant="contained" size="medium" color="primary" onClick={routeChange} disabled >
                                Book now
                            </Button>)}

                </div>
            </div>
            <div className={classes.pricing}>
                <div className={classes.logo}>

                    {valet === true ? (
                        <EmojiTransportationIcon fontSize="large" style={{ marginTop: 10 }} />
                    )
                        : (<p>&nbsp;</p>)}
                </div>
                <Typography variant="h5" component="h5" gutterBottom style={{ color: '#a2a2a2' }} >
                    {price}
                    < EuroSymbolIcon fontSize="medium" style={{ color: '#a2a2a2' }} />
                </Typography>
            </div >
        </Card >
    )
}
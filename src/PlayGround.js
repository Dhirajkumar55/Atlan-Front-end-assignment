import {useRef,useState} from 'react'
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import DisplayTable from './DisplayTable';
import Dummy from './Dummy';
import { Button } from '@mui/material';
import { Snackbar,Alert } from '@mui/material';



export default function PlayGround(){

    
    const valueRef = useRef('');
    const [queryTable,setQueryTable] = useState(null);
    const [error,setError] = useState(false);

    function onlySpaces(str) {
        return !(/^\s*$/.test(str));
    }

    function handleClick(){
        if(valueRef.current.value !== '' && onlySpaces(valueRef.current.value)){
            const tables = ['customers','orders', 'products'];
            setQueryTable(tables[Math.floor(Math.random()*tables.length)]);
        }
        else{
            setError(true);
        }
    }

    function handleClose(){
        setError(false);
    }
    return (
        <div>
            <Grid
                container
                rowSpacing={3}
                columnSpacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ paddingTop:'25px'}}
            >
                <Grid item xs="auto">
                <TextField
                    id="outlined-multiline-static"
                    label="Type In Your Query"
                    multiline
                    maxRows={5}
                    inputRef={valueRef}
                    sx={{width:400}}
                />
                <Button 
                    sx={{marginLeft:'20px', marginTop:'7.5px'}}
                    variant="contained"
                    onClick={handleClick}
                >
                    Run
                </Button>
                </Grid>
                <Grid item xs='auto'>
                    {queryTable?<DisplayTable queryTable={queryTable}/>:<Dummy/>}
                </Grid>
            </Grid>
            <Snackbar 
                open={error}
                autoHideDuration={3000} 
                onClose={handleClose}
                anchorOrigin={{vertical:'top', horizontal:'right'}}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Enter a valid query
                </Alert>
            </Snackbar>
       </div>
    )
}
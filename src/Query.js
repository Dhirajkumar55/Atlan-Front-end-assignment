import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import DisplayTable from './DisplayTable';
import { Grid } from '@mui/material';
import Dummy from './Dummy';

const options=[ "SELECT * from CUSTOMERS", "SELECT * from ORDERS", "SELECT * from PRODUCTS"]


export default function Query(){
    const [queryTable,setQueryTable] = useState(null)

    return(
        <Grid
            container
            rowSpacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ paddingTop:'20px'}}
        >
            <Grid item xs='auto'>
            <Autocomplete
                disablePortal
                options={options}
                sx={{ width: 400 }}
                renderInput={(params) => {
                    return <TextField {...params} label="Query" />
                }}
                onInputChange={(event,value)=>{
                    if(value === 'SELECT * from CUSTOMERS')
                        setQueryTable('customers');
                    else if(value === 'SELECT * from ORDERS')
                        setQueryTable('orders');
                    else if(value === 'SELECT * from PRODUCTS')
                        setQueryTable('products')
                }}
            />
            </Grid>
            <Grid item xs='auto'>
                {queryTable?<DisplayTable queryTable={queryTable}/>:<Dummy/>}
            </Grid>
        </Grid>
    )
}


import { Box } from "@mui/material"

export default function Dummy(){
    return (
        <Box
            sx={{
                width: 1000,
                height: 600,
                borderRadius:'2px',
                backgroundColor: 'rgba(243, 243, 243, 1)',
                '&:hover': {
                    backgroundColor: 'rgba(243, 243, 243, 1)',
                    // opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
        <div style={{position:'relative', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color:'rgb(2, 136, 209)',
            fontFamily: 'Arial',
        }}>
            <h3>Your results will appear here ...</h3>
        </div>
           
        </Box>
    )
}
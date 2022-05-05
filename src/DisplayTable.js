import {useEffect,useState} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';


const customerHeaders = [
  {field:"customerID", width:150,headerClassName: 'super-app-theme--header',},
  {field:"companyName", width:250,headerClassName: 'super-app-theme--header'},
  {field:"contactName", width:250,headerClassName: 'super-app-theme--header'},
  {field:"contactTitle", width:200,headerClassName: 'super-app-theme--header'},
]

const orderHeaders = [
  {field:"orderID", width:150,headerClassName: 'super-app-theme--header'},
  {field:"customerID", width:150,headerClassName: 'super-app-theme--header',},
  {field:"employeeID", width:250,headerClassName: 'super-app-theme--header'},
  {field:"orderDate", width:250,headerClassName: 'super-app-theme--header'},
  {field:"requiredDate", width:200,headerClassName: 'super-app-theme--header'},
  {field:"shippedDate", width:200,headerClassName: 'super-app-theme--header'},
  {field:"shipVia", width:200,headerClassName: 'super-app-theme--header'},
  {field:"freight", width:200,headerClassName: 'super-app-theme--header'},
  {field:"shipName", width:200,headerClassName: 'super-app-theme--header'},
]

const productHeaders = [
  {field:"productID", width:50,headerClassName: 'super-app-theme--header'},
  {field:"name", width:300,headerClassName: 'super-app-theme--header'},
  {field:"supplierID", width:150,headerClassName: 'super-app-theme--header',},
  {field:"categoryID", width:250,headerClassName: 'super-app-theme--header'},
  {field:"quantityPerUnit", width:250,headerClassName: 'super-app-theme--header'},
  {field:"unitPrice", width:200,headerClassName: 'super-app-theme--header'},
  {field:"unitsInStock", width:200,headerClassName: 'super-app-theme--header'},
  {field:"unitsOnOrder", width:200,headerClassName: 'super-app-theme--header'},
  {field:"reorderLevel", width:200,headerClassName: 'super-app-theme--header'},
  
]

const useQuery = (page, pageSize,queryTable) => {
  const [rowCount, setRowCount] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
 

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setRowCount(undefined);
   
    async function getData(page,pageSize,queryTable){
      if (!active) {
        return;
      }
      const res = await axios.get(`https://querynator-backend.herokuapp.com/${queryTable}?_page=${page+1}&_limit=${pageSize}`);
      setData(res.data);
      setIsLoading(false);
      setRowCount(parseInt(res.headers["x-total-count"]));
    }
    getData(page,pageSize,queryTable);
    return () => {
      active = false;
    };
  }, [page, pageSize,queryTable]);

  return { isLoading, data, rowCount };
};


export default function DisplayTable({queryTable}) {

  let columns = []
  if(queryTable === 'customers') columns = customerHeaders;
  else if(queryTable === 'orders') columns = orderHeaders;
  else if(queryTable === 'products') columns = productHeaders;

  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,
  });

  const { isLoading, data, rowCount } = useQuery(
    rowsState.page,
    rowsState.pageSize,
    queryTable
  );

  
  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState]);

  if(queryTable===null)
    return null;
    
  return (
    <div >
      <Box
      sx={{
        height:600,
        width: 1000,
        '& .super-app-theme--header': {
          color:'rgba(255, 255, 255, 1)',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        columns={columns}
        autoWidth
        rows={data}
        getRowId= {(row)=>{
          if(queryTable === 'customers'){
            return row.customerID;
          }
          else if(queryTable === 'orders'){
            return row.orderID;
          }
          else if(queryTable === 'products'){
            return row.productID;
          }
        }}
        rowCount={rowCountState}
        loading={isLoading}
        rowsPerPageOptions={[5,10,25,50,100]}
        pagination
        {...rowsState}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        onPageSizeChange={(pageSize) =>
          setRowsState((prev) => ({ ...prev, pageSize }))
        }
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
    </div>
  );
}

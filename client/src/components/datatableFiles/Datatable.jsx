
import React, { useState, useEffect } from "react";
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns} from '../../datatablesroucefiles';
import {Link} from "react-router-dom"
import axios from "axios";



const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) =>{
        const file_id=params.row.file_id
        const handleDelete = async () => {
          try {
            await axios.delete(`/api/file/${file_id}`);
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        }
        return (
          <div className="cellAction">
             <div className="deleteButton" onClick={handleDelete} >Delete</div>
            <Link style={{ textDecoration: "none" }}>
              <div className="viewButton" >Processe</div>
            </Link>
           
          </div>
        );
      },
    },
  ];



const Datatable =()=>{

  const [fileData, setFileData] = useState([]);
  useEffect(() => {
    fetchfileData();
  }, []);
  const fetchfileData = async () => {
    try {
      const response = await axios.get("/api/files");
      setFileData(response.data);
      
    } catch (error) {
      console.error(error);
      
    }
  };
  const rowCountFile = fileData.length;
  localStorage.setItem('nbFile',rowCountFile)
    return(
        <div className='datatable'>
       <div className="datatableTitle">
        List of Files
      </div>  

        <DataGrid
        rows={fileData}
        columns={userColumns.concat(actionColumn)}
        options={{
            pagination: true,
            rowsPerPage: 5,
          }}
        getRowId={row=>row.file_id}
      />


        </div>
    )
}

export default Datatable
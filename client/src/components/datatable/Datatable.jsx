import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesrouce";
import { Link } from "react-router-dom";
import axios from "axios";

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      const employeeId = params.row.employe_id;
      const email = params.row.email;
      const firstname = params.row.firstname;
      const lastname = params.row.lastname;
      const id_ident = params.row.id_ident;

      const handleLinkClick = () => {
        localStorage.setItem("email", email);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("id_ident", id_ident);
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/employe/${employeeId}`);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };
     
      return (
        <div className="cellAction">
          <Link
            to={`/employe/${employeeId}`}
            style={{ textDecoration: "none" }}
          >
            <div className="viewButton" onClick={handleLinkClick}>
              Update
            </div>
          </Link>
          <div className="deleteButton" onClick={handleDelete}>
            Delete
          </div>
        </div>
      );
    },
  },
];

const Datatable = () => {
  const [employeData, setEmployeData] = useState([]);
  useEffect(() => {
    fetchEmployeData();
  }, []);
  const fetchEmployeData = async () => {
    try {
      const response = await axios.get("/api/employes");
      setEmployeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const rowCountEmploye = employeData.length;
  localStorage.setItem('nbEmploye',rowCountEmploye)
  return (
    <div className="datatable">
      <div className="datatableTitle">
        List of Employes
        <Link to="/new" className="linkNew">
          Add New
        </Link>
      </div>

      <DataGrid
        rows={employeData}
        columns={userColumns.concat(actionColumn)}
        getRowId={(row) => row.employe_id}
      />
    </div>
  );
};

export default Datatable;

import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  DataGrid,
  GridApi,
  GridCellValue,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

const Users: React.FC = () => {
  const { GetAllUsers, SelectedUser } = useActions();
  const { loading, users } = useTypedSelector((store) => store.UserReducer);
  const navigate = useNavigate();
  useEffect(() => {
    GetAllUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: "Name", headerName: "Name", width: 230 },
    { field: "Surname", headerName: "Surname", width: 230 },
    { field: "Email", headerName: "Email", width: 230 },
    { field: "Role", headerName: "Role", width: 130 },
    {
      field: "createdAt",

      headerName: "Created At",

      width: 130,

      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row.createdAt).format("ll"),
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          const userData = thisRow;
          SelectedUser(userData);
          navigate('/dashboard/userDetails')
        };

        return <Button onClick={onClick}>Edit</Button>;
      },
    },
  ];

  const rows = users;

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 2, textAlign: "right" }}>
          <Button variant="contained">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/dashboard/register"
            >
              Add new user
            </Link>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ height: "700px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;

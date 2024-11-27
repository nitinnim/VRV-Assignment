import { useEffect, useMemo, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-hot-toast";

import {
  Avatar,
  Box,
  Typography,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";;

const Users = ({ users }) => {

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

   // Delete function
   const handleDelete = (userId) => {
    console.log(`User with ID ${userId} is deleted`);
    toast.success("User Deleted Successfully (This is not a backend call)");

    // Add any additional delete logic here (e.g., call an API to delete)
  };

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "firstName", headerName: "First Name", width: 170 },
      { field: "lastName", headerName: "Last Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 100,
        type: "singleSelect",
        valueOptions: ["User", "Editor", "Manager"],
        editable: true,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <span>{params.value}</span>
            <span
              style={{
                display: "block",
                color: "white",
              }}
            >
              ▼
            </span>
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "permissions",
        headerName: "Permissions",
        width: 200,
        editable: true,
        renderCell: (params) => {
          const permissions = params.value;
          return permissions && permissions.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {permissions.map((perm) => (
                <Chip key={perm} label={perm} />
              ))}
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "white", // Default text color
                display: "flex", // Flexbox to center vertically
                alignItems: "center", // Vertically center
                height: "100%", // Ensure full height for vertical centering
                "&:hover": {
                  color: "black", // Change color to black on hover
                },
              }}
            >
              No permission
            </Typography>
          );
        },
        renderEditCell: (params) => <PermissionEditor {...params} />,
      },
      {
        field: "action", // New column for actions
        headerName: "Action",
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <IconButton
            onClick={() => handleDelete(params.row._id)} // Call delete function on click
            sx={{ color: "red" }} // Style the icon (red color for delete)
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
      // { field: '_id', headerName: 'Id', width: 220 },
      // {
      //   field: 'actions',
      //   headerName: 'Actions',
      //   type: 'actions',
      //   renderCell: (params) => (
      //     <UsersActions {...{ params, rowId, setRowId }} />
      //   ),
      // },
    ],
    [rowId]
  );

  const PermissionEditor = ({ id, value, field, api }) => {
    const options = ["read", "write", "update"];

    const handleChange = (event) => {
      const newValue = event.target.value;
      api.setEditCellValue({ id, field, value: newValue });
    };

    return (
      <Select
        multiple
        value={value || []}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((val) => (
              <Chip key={val} label={val} />
            ))}
          </Box>
        )}
        sx={{ width: "100%" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  };

  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: "black", // Background color for the rows
            color: "white", // Text color for rows
            "&:hover": {
              bgcolor: "gray", // Change background on hover
            },
            "&.Mui-selected": {
              bgcolor: "lightgray", // Background color for selected row
              color: "black", // Text color for selected row
              "&:hover": {
                bgcolor: "lightgray", // Prevent hover color change on selected row
              },
            },
          },
          "& .MuiDataGrid-footerContainer": {
            bgcolor: "white", // Footer background color
            color: "black", // Footer text color
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "white", // Header background color
            color: "black", // Header text color
          },
          // "& .MuiDataGrid-cell--editable": {
          //   "& .MuiSelect-icon": {
          //     visibility: "visible", // Ensure the dropdown icon is always visible
          //     color: "white", // Set dropdown icon color
          //   },
          // },
          // "& .MuiInputBase-input": {
          //   color: "white", // Ensure text in input fields is visible
          // },
        }}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        // sx={{
        //   [`& .${gridClasses.row}`]: {
        //     bgcolor: (theme) => theme.palette.mode === 'light' ? grey[50] : grey[50], // Default background
        //     color: 'black', // Text color
        //     borderBottom: '1px solid grey', // Adds border between rows
        //     '&:hover': {
        //       bgcolor: (theme) => theme.palette.mode === 'light' ? grey[50] : grey[50], // Prevent hover color change
        //     },
        //     '&.Mui-selected': {
        //       bgcolor: grey[300], // Custom color for selected row
        //       '&:hover': {
        //         bgcolor: grey[300], // Prevent hover color change on selected row
        //       },
        //     },
        //   },
        //   '& .MuiDataGrid-cell': {
        //     borderBottom: 'none', // Ensures no additional cell borders overlap with row borders
        //   },
        // }}

        // onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default Users;

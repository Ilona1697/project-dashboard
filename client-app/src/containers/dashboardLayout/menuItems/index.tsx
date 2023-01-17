import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

export const adminMenu = (
  <React.Fragment>
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="categories">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="posts">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const userMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: "none" }} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: "none" }} to="categories">
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: "none" }} to="posts">
        <ListItemText primary="Posts" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

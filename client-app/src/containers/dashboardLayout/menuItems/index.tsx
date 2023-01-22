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
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="allPosts">
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
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
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
    <Link style={{ textDecoration: "none", color: "#5A2F8B" }} to="allPosts">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

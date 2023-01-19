import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../../components/loader";
import { cutString } from "../../../helpers";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const GetAllPosts: React.FC = () => {
  const { GetAllPosts, SelectPost } = useActions();
  const { posts, loading } = useTypedSelector((store) => store.PostReducer);
  const [isRedirect, setIsRedirect] = useState(false);
  const [postId, setPostId] = useState('');
  useEffect(() => {
    GetAllPosts();
  }, []);

  const showPost = (post: any) => {
    SelectPost(post);
    setIsRedirect(true);
  }

  if (loading) {
    return <Loader />;
  }
  if (isRedirect) {
    return <Navigate to={"/dashboard/postDetails"} />;
  }
  const rows = posts.map((post: any) => {
    return (
      <Box sx={{ textAlign: "center", mb: 3, width: '45%' }} key={post.id} >
        <Card sx={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardMedia
            sx={{ height: 200 }}
            image={post.Image}
            title={post.Title}
          />
          <CardContent sx={{ height: 135 }}>
            <Typography gutterBottom variant="h5" component="div">
              {cutString(post.Title)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cutString(post.ShortDescription)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => showPost(post)}>Read More</Button>
          </CardActions>
        </Card>
      </Box >
    );
  });

  return (
    <Grid item container spacing={2} md={10} sx={{ margin: '0 auto' }}>
      <Grid item xs={12} sx={{ mb: 4, textAlign: "right", height: '100%' }}>
        <Button variant="contained">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/dashboard/newPost"
          >
            Add new post
          </Link>
        </Button>
      </Grid>
      <Grid container spacing={1} sx={{ gap: '3%' }}>
        {rows}
      </Grid>
    </Grid>
  );
};

export default GetAllPosts;

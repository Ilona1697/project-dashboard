import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import dateFormat from "dateformat";

import Typography from '@mui/material/Typography';
import { Box, Grid, Paper } from "@mui/material";

const initialValues = {
  title: '',
  shortDescription: '',
  description: '',
  image: '',
  categoryId: '',
  createdAt: '',
};

const PostDetails: React.FC = () => {
  const { selectedPost } = useTypedSelector(
    (store) => store.PostReducer
  );

  initialValues.title = selectedPost.Title;
  initialValues.shortDescription = selectedPost.ShortDescription;
  initialValues.description = selectedPost.Description;
  initialValues.image = selectedPost.Image;
  initialValues.categoryId = selectedPost.CategoryId;
  initialValues.createdAt = selectedPost.createdAt;

  const date = dateFormat(initialValues.createdAt, "mmmm dd, yyyy");

  const post = initialValues;
  console.log(selectedPost.Image);
  return (
    <Paper
      sx={{
        position: 'relative',
        color: '#fff',
        padding: '40px 0',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'block', width: '60%', margin: "0 auto", }} src={post.image} alt='post.imageText' />}
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              width: '60%',
              margin: "0 auto",
              p: { xs: 3, md: 3 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" style={{ fontSize: '32px' }} color="#000" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "10px", fontSize: '18px', fontStyle: 'italic' }} color="text.secondary">
              {date}
            </Typography>
            <Typography variant="h5" color="#000" paragraph dangerouslySetInnerHTML={{ __html: post.description }}>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PostDetails;


import React, { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import dateFormat from "dateformat";

import Typography from '@mui/material/Typography';
import { Box, Grid, Paper } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const initialValues = {
  title: '',
  shortDescription: '',
  description: '',
  image: '',
  categoryId: '',
  userId: '',
  createdAt: '',
};

const PostDetails: React.FC = () => {
  const { selectedPost } = useTypedSelector(
    (store) => store.PostReducer
  );
  const { GetAllUsers } = useActions();

  useEffect(() => {
    GetAllUsers();
  }, []);
  const { users } = useTypedSelector(
    (store) => store.UserReducer
  );

  initialValues.title = selectedPost.Title;
  initialValues.shortDescription = selectedPost.ShortDescription;
  initialValues.description = selectedPost.Description;
  initialValues.image = selectedPost.Image;
  initialValues.categoryId = selectedPost.CategoryId;
  initialValues.createdAt = selectedPost.createdAt;
  initialValues.userId = selectedPost.UserId;
  const date = dateFormat(initialValues.createdAt, "dddd dd mmmm yyyy HH:MM");
  const post = initialValues;
  const author = users.find((user: any) => user.id === post.userId);
  return (
    <Paper
      sx={{
        position: 'relative',
        color: '#fff',
        padding: '40px 0',
      }}
    >
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              textAlign: 'left',
              margin: "0 auto",
              fontFamily: "Sky Text,Sans-serif",
              p: { xs: 3, md: 3 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3"
              style={{
                fontSize: '45px',
                lineHeight: '53px',
                color: "#4A4A4A",

              }} sx={{ mb: 3 }} gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="#000" paragraph dangerouslySetInnerHTML={{ __html: post.shortDescription }} sx={{ mb: 5 }} style={{
              fontSize: '22px',
              lineHeight: '30px',
              color: "#4A4A4A",

            }}>
            </Typography>
            <Typography variant="h4" style={{ fontSize: '17px', color: '#3157a1', fontWeight: '700' }} sx={{ mb: 3 }}>
              {author ? `@${author['Name']} ${author['Surname']}` : ''}
            </Typography>
            <Typography variant="subtitle1" style={{ fontSize: '17px', display: "flex", alignItems: 'center', color: "#707070" }} sx={{ mb: 3 }}>
              <AccessTimeIcon style={{ marginRight: "5px", fontSize: "20px" }} />{date}
            </Typography>
            {<img style={{ display: 'block', width: '100%', marginBottom: "40px" }} src={post.image} alt='post.imageText' />}
            <Typography variant="h5" color="#000" paragraph dangerouslySetInnerHTML={{ __html: post.description }} style={{ width: '85%', fontSize: '22px', color: "#4a4a4a" }}>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PostDetails;
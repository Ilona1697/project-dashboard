import {
  Box,
  Button,
  Typography,
  Grid,
  Tab,
  Tabs,
  Divider
} from "@mui/material";

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";
import { a11yProps, TabPanel } from "../../../components/ui/TabPanel";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import PostCard from "../postCard";

const GetAllPosts: React.FC = () => {
  const { GetAllPosts, SelectPost } = useActions();
  const { posts, loading } = useTypedSelector((store) => store.PostReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/dashboard/allPosts')
    } else {
      navigate('/dashboard/myPosts')
    }
    setTab(newValue);
  };
  useEffect(() => {
    const arr = window.location.pathname.split('/');
    const activeTab = arr[arr.length - 1];

    GetAllPosts();
    if (activeTab === 'allPosts') {
      setTab(0);
    } else if (activeTab === 'myPosts') {
      setTab(1);
    }
  }, []);

  const allPosts = posts.map((post: any) => {
    const myPostsProps = {
      post,
      tabName: "allPosts"
    }
    return <PostCard key={post.id} {...myPostsProps} />;
  });
  const postsFiltered = posts.filter((post: any) => {
    return post.UserId === user.id;
  });

  const myPosts = postsFiltered?.map((post: any) => {
    const myPostsProps = {
      post,
      tabName: "myPosts"
    }
    return <PostCard key={post.id} {...myPostsProps} />;
  });
  if (loading) {
    return <Loader />;
  }
  return (<>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="All posts" {...a11yProps(0)} />
        <Tab label="My posts" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={tab} index={0}>
      <Grid container spacing={1} sx={{ gap: '3%' }}>
        {allPosts}
      </Grid>
    </TabPanel>
    <TabPanel value={tab} index={1}>
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
      </Grid>
      <Grid container spacing={1} sx={{ gap: '3%' }}>
        {myPosts.length ? myPosts : (<Typography variant="h5" component="h5"
          style={{ color: '#565656', fontFamily: "Sky Text,Sans-serif", textAlign: "center", width: "100%", lineHeight: '275px' }} sx={{ px: 5, pt: 4 }}>
          <span style={{ color: "#1976D2", fontWeight: '600' }}>Create</span> your first post!
        </Typography>)}
      </Grid>
    </TabPanel>
  </>
  );
};

export default GetAllPosts;

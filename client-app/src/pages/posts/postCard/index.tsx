import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cutString } from "../../../helpers";
import { useActions } from "../../../hooks/useActions";
interface PostCardI {
    post: any,
    tabName: string
}
const PostCard: React.FC<PostCardI> = ({ post, tabName }) => {
    const { SelectPost } = useActions();
    const navigate = useNavigate();

    const showPost = () => {
        SelectPost(post);
        navigate("/dashboard/postDetails")
    }
    const editPost = () => {
        SelectPost(post);
        navigate("/dashboard/editPost")
    }
    return (
        <Box sx={{ textAlign: "center", mb: 3, width: '45%' }} key={post.id} >
            <Card sx={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={`/static/assets/posts/${post.Image}`}
                    title={post.Title}
                />
                <CardContent sx={{ height: 130 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {cutString(post.Title)}
                    </Typography>
                    <Typography color="text.secondary">
                        {cutString(post.ShortDescription)}
                    </Typography>
                </CardContent>
                <Grid item container style={{ display: 'flex' }}>
                    <CardActions>
                        <Button size="small" onClick={showPost}>Read More</Button>
                    </CardActions>
                    {tabName === 'myPosts' ? (<CardActions>
                        <Button size="small" onClick={editPost}>Edit post</Button>
                    </CardActions>) : ''}
                </Grid>

            </Card>
        </Box >
    );
}

export default PostCard;
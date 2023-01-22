import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { Box } from "@mui/system";
import { Field, Formik } from "formik";
import React from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangePostSchema } from "../validation";
import FormikControl from "../../../components/ui/FileInput/TextareaControl/textArea";
import { useNavigate } from "react-router-dom";
import { lengthString } from "../../../helpers";
import Modal from "../../../components/modal";

const initialPostValues = {
  Title: "",
  ShortDescription: "",
  Description: "",
  Image: "",
  CategoryId: "",
  UserId: ""
};

const EditPost: React.FC = () => {
  const { GetAllUsers, GetAllCategories, EditPost, DeletePost } = useActions();
  const [imageName, setImageName] = useState(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const navigate = useNavigate();
  const { selectedPost } = useTypedSelector(
    (store) => store.PostReducer
  );
  useEffect(() => {
    GetAllUsers();
    GetAllCategories();
    setImageName(selectedPost.Image);
  }, []);


  const { categories } = useTypedSelector((store) => store.CategoryReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);
  initialPostValues.Title = selectedPost.Title;
  initialPostValues.ShortDescription = selectedPost.ShortDescription;
  initialPostValues.Description = selectedPost.Description;
  initialPostValues.Image = selectedPost.Image;
  initialPostValues.CategoryId = selectedPost.CategoryId;
  initialPostValues.UserId = selectedPost.UserId;




  const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);


    const newPost = {
      id: selectedPost.id,
      Title: data.get('Title'),
      ShortDescription: data.get('ShortDescription'),
      Description: data.get('Text'),
      Image: data.get('Image')?.toString(),
      CategoryId: data.get('CategoryId') || null,
      UserId: user.id
    };
    EditPost(newPost);

    navigate(-1);
  };

  const categoryItems = categories.map((category: any) => {
    return <MenuItem key={category.id} value={category.id}>{category.Name}</MenuItem>;
  });
  const handleDeletePost = () => {
    DeletePost(selectedPost);
    navigate(-1);
  };
  const modalProps = {
    name: 'post',
    cb: handleDeletePost,
    setOpen: setIsDelete,
  }
  if (isDelete) {
    return <Modal {...modalProps} />
  }
  return (
    <>
      <Formik
        validationSchema={ChangePostSchema}
        initialValues={initialPostValues}
        onSubmit={() => { }}
      >
        {({ errors, touched, isValid, dirty, setFieldValue, handleBlur, values }) => {
          return (<>
            <Card style={{ overflow: "hidden" }} >
              <Box
                component="form"
                noValidate
                style={{ width: "100%" }}
                sx={{ mt: 1 }}
                onChange={e => e.preventDefault()}
                onSubmit={editPost}
              >
                <CardHeader
                  subheader={"The information for editing"}
                  title="Edit post"
                ></CardHeader>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label={"Title"}
                        name="Title"
                        variant="outlined"
                      />
                      {errors.Title && touched.Title ? (
                        <div style={{ color: "red" }}>{errors.Title}</div>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label={"Short description"}
                        name="ShortDescription"
                        variant="outlined"
                      />
                      {errors.ShortDescription && touched.ShortDescription ? (
                        <div style={{ color: "red" }}>{errors.ShortDescription}</div>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12} >
                      <textarea
                        hidden
                        name="Text"
                        value={values.Description}
                        onChange={() => { }}
                      />
                      <Field
                        as={FormikControl}
                        label={"Description"}
                        name="Description"
                        control="tiny-mce"

                      />
                      {errors.Description && touched.Description ? (
                        <div style={{ color: "red" }}>{errors.Description}</div>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12} >
                      <Field
                        as={TextField}
                        fullWidth
                        label={"Image"}
                        name="Image"
                        variant="outlined"
                      />
                      {errors.Image && touched.Image ? (
                        <div style={{ color: "red" }}>{errors.Image}</div>
                      ) : null}
                    </Grid>
                    {/* <Grid item md={12} xs={12}>
                      <input
                        hidden
                        ref={fileRef}
                        type="file"
                        name="Image"
                        onChange={(event: any) => {
                          setFieldValue('Image', event.target.files[0])
                          setImageName(event.target.files[0].name);
                        }}
                        accept="images/*, .png, .jpg, .jpeg"
                      />
                      <Grid item md={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" style={{ height: '40px', minWidth: '120px' }}
                          onClick={() => {
                            fileRef.current?.click();
                          }}
                          onBlur={handleBlur('Image')}
                        >Select Image</Button>

                        {imageName ? (
                          <div style={{ color: "#1565C0", marginLeft: '15px' }}>{lengthString(imageName)}</div>
                        ) : null}

                      </Grid>
                      {errors.Image && touched.Image ? (
                        <div style={{ color: "red" }}>{errors.Image}</div>
                      ) : null}
                    </Grid> */}
                    <Grid item md={12} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Category</InputLabel>
                        <Field
                          as={Select}
                          fullWidth
                          label="Category"
                          name="CategoryId"
                          variant="outlined"
                        >
                          <MenuItem value='null'>Without category</MenuItem>;
                          {categoryItems}

                        </Field>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >Save Post</Button>
                </Box>
              </Box>
            </Card>
          </>);
        }
        }
      </Formik>
      <Card>
        <Divider />
        <Box style={{ width: "100%", margin: '0 auto' }} sx={{ p: 2, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
          <CardHeader
            style={{ color: "red" }}
            subheader={"Delete post"}
            title="Danger zone"
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} >
                <Button variant="contained" onClick={() => setIsDelete(true)} sx={{ background: "red" }}>Delete</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
export default EditPost;
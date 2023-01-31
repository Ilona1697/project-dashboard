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
import { convertToBase64, lengthString } from "../../../helpers";

const initialPostValues = {
  Title: "",
  ShortDescription: "",
  Description: "",
  Image: "",
  CategoryId: null,
  UserId: ""
};

const NewPost: React.FC = () => {
  const { CreatePost, GetAllCategories, GetAllPosts } = useActions();
  const [imageName, setImageName] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const fileRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    GetAllCategories();
  }, []);

  const { categories } = useTypedSelector((store) => store.CategoryReducer);
  const { user } = useTypedSelector((store) => store.UserReducer);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const newPost = {
      Title: data.get('Title'),
      ShortDescription: data.get('ShortDescription'),
      Description: data.get('Text'),
      Image: image,
      CategoryId: data.get('CategoryId') || null,
      UserId: user.id
    };
    CreatePost(newPost);

    navigate(-1);
  };

  const categoryItems = categories.map((category: any) => {
    return <MenuItem key={category.id} value={category.id}>{category.Name}</MenuItem>;
  });
  const getImage = async (e: any) => {
    const img = e.target.files ? e.target.files[0] : null;
    if (img !== null) {
      const convertedImage: any = await convertToBase64(img);
      setImage(convertedImage);
    }
  };
  return (
    <>
      <Formik
        validationSchema={ChangePostSchema}
        initialValues={initialPostValues}
        onSubmit={() => { }}
      >
        {({ errors, touched, isValid, dirty, setFieldValue, handleBlur, values, handleChange }) => {
          return (<>
            <Card style={{ overflow: "hidden" }} >
              <Box
                component="form"
                noValidate
                style={{ width: "100%" }}
                sx={{ mt: 1 }}
                onChange={e => e.preventDefault()}
                onSubmit={createPost}
              >
                <CardHeader
                  subheader={"The information for creating"}
                  title="Create post"
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
                        onChange={handleChange}
                        value={values.Title}
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
                        onChange={handleChange}
                        value={values.ShortDescription}
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
                        onChange={handleChange}
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
                    <Grid item md={12} xs={12}>
                      <input
                        hidden
                        ref={fileRef}
                        type="file"
                        name="Image"
                        onChange={(event: any) => {
                          setFieldValue('Image', event.target.files[0])
                          setImageName(event.target.files[0].name);
                          getImage(event)
                        }}
                        accept="images/*, .png, .jpg, .jpeg"
                      />
                      <Grid item md={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" style={{ height: '40px', minWidth: '120px' }}
                          onClick={() => {
                            fileRef.current?.click();
                          }}
                          name="Image"
                          onBlur={handleBlur('Image')}

                        >Select Image</Button>

                        {imageName ? (
                          <div style={{ color: "#1565C0", marginLeft: '15px' }}>{lengthString(imageName)}</div>
                        ) : null}

                      </Grid>
                      {errors.Image && touched.Image ? (
                        <div style={{ color: "red" }}>{errors.Image}</div>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Category</InputLabel>
                        <Field
                          as={Select}
                          fullWidth
                          label="Category"
                          name="CategoryId"
                          variant="outlined"
                          onChange={handleChange}
                          value={values.CategoryId || ""}
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
                  >Add Post</Button>
                </Box>
              </Box>
            </Card>
          </>);
        }
        }
      </Formik>
    </>
  );
};
export default NewPost;
import {
  Box,
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
import { Field, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangeCategorySchema } from "../validation";

const initialValues = {
  name: "",
  id: "",
};

const CategoryDetails: React.FC = () => {
  const { selectedCategory } = useTypedSelector(
    (store) => store.CategoryReducer
  );
  const navigate = useNavigate();
  const { UpdateCategory, DeleteCategory } = useActions();

  initialValues.name = selectedCategory.Name;
  const changeCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: any = data.get("name");
    const updatedCategory: any = {
      id: selectedCategory.id,
      name,
      createdAt: selectedCategory.createdAt,
    };
    UpdateCategory(updatedCategory);
    navigate(-1);
  };

  const deletePost = () => {
    DeleteCategory(selectedCategory.id);
    // navigate(-1);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ChangeCategorySchema}
        onSubmit={() => { }}
      >
        {({ errors, touched, isSubmitting, isValid, dirty }) => (
          <Card sx={{ p: 4, mb: 2 }}>
            <Box
              onSubmit={changeCategory}
              component="form"
              noValidate
              style={{ width: "60%", margin: '0 auto' }}
              sx={{ mt: 1 }}
            >
              <CardHeader
                subheader={"The information for editing"}
                title="Category details"
              ></CardHeader>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      label={"Category"}
                      name="name"
                      variant="outlined"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    ) : null}
                  </Grid>
                </Grid>
              </CardContent>

              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button
                  disabled={!(isValid && dirty)}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Save details
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Formik>
      <Card>
        <Divider />
        <Box style={{ width: "60%", margin: '0 auto' }} sx={{ p: 2, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
          <CardHeader
            style={{ color: "red" }}
            subheader={"Delete category"}
            title="Danger zone"
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} >
                <Button variant="contained" onClick={deletePost} sx={{ background: "red" }}>Delete</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
export default CategoryDetails;

import { Box, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { ChangeCategorySchema } from "../validation";

const NewCategory: React.FC = () => {
  const { CreateCategory, GetAllCategories } = useActions();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCategory = {
      Name: data.get("name"),
    };
    CreateCategory(newCategory);
    // GetAllCategories();
    navigate(-1);
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
              sx={{ mt: 1 }}
              component="form"
              noValidate
              style={{ width: "60%", margin: '0 auto' }}
              onSubmit={handleSubmit}
            >
              <CardHeader
                subheader={"The information for creating"}
                title="Create category"
              ></CardHeader>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Category Name"
                      margin="normal"
                      name="name"
                    />{" "}
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
                  {isSubmitting ? "Loading..." : " Save category"}
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default NewCategory;
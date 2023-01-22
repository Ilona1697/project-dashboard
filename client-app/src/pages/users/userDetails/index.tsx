import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangeProfileSchema } from "../validation";

const initialProfileValues = {
  name: "",
  surname: "",
  email: "",
  role: "",
};

const UserDetails: React.FC = () => {
  const [isDelete, setIsDelete] = React.useState(false);
  const navigate = useNavigate();
  const { selectedUser } = useTypedSelector((store) => store.UserReducer);


  const { UpdateUser, DeleteUser, BlockUser } = useActions();


  initialProfileValues.name = selectedUser.Name;
  initialProfileValues.surname = selectedUser.Surname;
  initialProfileValues.email = selectedUser.Email;
  initialProfileValues.role = selectedUser.Role;

  const changeProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const updatedUser = {
      id: selectedUser.id,
      name: data.get("name"),
      surname: data.get("surname"),
      email: data.get("email"),
      role: data.get("role"),
      isBlocked: selectedUser.IsBlocked
    };
    UpdateUser(updatedUser);
    navigate('/dashboard/users');
  };
  const handleBlockUser = () => {
    const updatedUser = {
      ...selectedUser,
      isBlocked: !selectedUser.IsBlocked
    }
    BlockUser(updatedUser);
    navigate(-1);
  }
  const handleDeleteUser = () => {
    DeleteUser(selectedUser);
    navigate(-1);
  }

  if (isDelete) {
    const modalProps = {
      name: 'user',
      cb: handleDeleteUser,
      setOpen: setIsDelete,
    }
    return <Modal {...modalProps} />
  }
  return (
    <>
      <Formik
        validationSchema={ChangeProfileSchema}
        initialValues={initialProfileValues}
        onSubmit={() => { }}
      >
        {({ errors, touched, isSubmitting, isValid, dirty }) => (
          <Card sx={{ mb: 3 }}>
            <Box
              onSubmit={changeProfile}
              component="form"
              noValidate
              style={{ width: "100%" }}
              sx={{ mt: 1 }}
            >
              <CardHeader
                subheader={"The information for editing"}
                title="User details"
              ></CardHeader>
              <CardContent>
                <Grid container spacing={3} style={{ flexWrap: 'wrap' }}>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      label={"First name"}
                      name="name"
                      variant="outlined"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      label={"Second name"}
                      name="surname"
                      variant="outlined"
                    />{" "}
                    {errors.surname && touched.surname ? (
                      <div style={{ color: "red" }}>{errors.surname}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      label={"Email"}
                      name="email"
                      variant="outlined"
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel>Role</InputLabel>
                      <Field
                        as={Select}
                        fullWidth
                        label="Role"
                        name="role"
                        variant="outlined"
                      >
                        <MenuItem value={"User"}>User</MenuItem>
                        <MenuItem value={"Administrator"}>
                          Administrator
                        </MenuItem>
                      </Field>
                    </FormControl>
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
        <Box style={{ width: "100%" }} sx={{ p: 2, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
          <CardHeader
            style={{ color: "red" }}
            subheader={"Delete user"}
            title="Danger zone"
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3} style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
              {/* <Grid item md={12} xs={12} >
                <Button variant="contained" style={{ minWidth: '83px' }} onClick={() => { setIsBlock(true) }}>Block</Button>
              </Grid> */}
              <Grid item md={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={selectedUser.IsBlocked} onChange={handleBlockUser} name="isBlocked" />
                    }
                    label="Block user"
                  />
                  {/* <Switch
                  checked={isBlock}
                  onChange={handleBlockUser}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                </FormGroup>
              </Grid>

              <Grid item md={12} xs={12} >
                <Button variant="contained" style={{ minWidth: '83px' }} onClick={() => { setIsDelete(true) }} sx={{ background: "red" }}>Delete</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
      <Card>

      </Card>
    </>
  );
};
export default UserDetails;

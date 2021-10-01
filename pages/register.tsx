/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// === Components === //
import { Box, colors, Container, Grid, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import Page from '../src/components/layout/Page';
import PageHeader from '../src/components/common/PageHeader';
import DividerText from '../src/components/common/DividerText';
import DatePicker from '../src/components/common/form/DatePicker';
import Radio from '../src/components/common/form/Radio';
import ImageCropper from '../src/components/common/form/ImageCropper';
import { useFormik } from 'formik';

// === Helpers === //
import dateFormat from 'dateformat';
import getCroppedImg from '../src/utils/image-cropper';
import * as utils from '../src/utils';
import * as yup from 'yup';

// === Types === //
import { CroppedAreaData } from '../src/types/images';

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę użytkownika!'),
  email: yup.string().email('Niepoprawny format email!').required('Musisz podać email!'),
  password: yup
    .string()
    .min(8, 'Hasło powinno zawierać przynajmniej 8 znaków!')
    .required('Musisz podać hasło!'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Niepoprawne hasło!'),
});

const Register = () => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [imageSrc, setImageSrc]: Array<any> = useState('');
  const [zoom, handleChangeZoom] = useState(1);
  const [rotation, handleChangeRotation] = useState(0);
  const [croppedAreaPixels, handleChangeCroppedAreaPixels]: Array<
    CroppedAreaData | null | Function
  > = useState(null);
  const [formError, setFormError] = useState({ error: false, message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
      town: '',
      birthday: null,
      gender: 0,
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        city: values.town,
        birthday:
          values.birthday && utils.isValidDate(values.birthday)
            ? dateFormat(values.birthday, 'yyyy-mm-dd')
            : null,
        description: values.description,
        image: null,
      };

      if (imageSrc && imageSrc !== '') {
        try {
          getCroppedImg(imageSrc, croppedAreaPixels, rotation).then((image) => {
            input.image = image;

            fetch(`/api/register`, {
              headers: {
                'Content-type': 'application/json',
              },
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ ...input }),
            })
              .then((response) => response.json())
              .then((json) => {
                toggleButtonLoading(false);

                if (json.emailDuplicated || json.nameDuplicated) {
                  setFormError({
                    error: true,
                    message: json.errorMessage,
                  });
                } else {
                  resetForm();
                  setImageSrc('');
                  handleChangeZoom(1);
                  handleChangeRotation(0);
                  handleChangeCroppedAreaPixels(null);
                  setFormError({
                    error: false,
                    message: '',
                  });
                }
              })
              .catch((error) => {
                toggleButtonLoading(false);
                console.error(error);
              });
          });
        } catch (e) {
          toggleButtonLoading(false);
          console.error(e);
        }
      } else {
        fetch(`/api/register`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ ...input }),
        })
          .then((response) => response.json())
          .then((json) => {
            toggleButtonLoading(false);

            if (json.emailDuplicated || json.nameDuplicated) {
              setFormError({
                error: true,
                message: json.errorMessage,
              });
            } else {
              resetForm();
              setImageSrc('');
              handleChangeZoom(1);
              handleChangeRotation(0);
              handleChangeCroppedAreaPixels(null);
              setFormError({
                error: false,
                message: '',
              });
            }
          })
          .catch((error) => {
            toggleButtonLoading(false);
            console.error(error);
          });
      }
    },
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onZoomChange = (zoom: number) => handleChangeZoom(zoom);
  const onRotationChange = (rotation: number) => handleChangeRotation(rotation);
  const onPreviewUpdate = (croppedAreaPixels: CroppedAreaData) => {
    handleChangeCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Page seo={{ title: 'Rejestracja', description: '' }} pageType="register">
      <>
        <Container maxWidth="xl">
          <PageHeader title="Rejestracja" />
        </Container>
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
            <Box p={3}>
              <form onSubmit={formik.handleSubmit}>
                <DividerText text="Pola obowiązkowe" />
                <Grid container>
                  <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Nazwa"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} pl={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      variant="filled"
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Hasło"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} pl={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="password2"
                      name="password2"
                      label="Powtórz hasło"
                      type="password"
                      value={formik.values.password2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password2 && Boolean(formik.errors.password2)}
                      helperText={formik.touched.password2 && formik.errors.password2}
                      variant="filled"
                    />
                  </Grid>
                </Grid>

                <DividerText text="Pola nieobowiązkowe" />
                <Grid container>
                  <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
                    <Radio
                      label="Płeć"
                      name="gender"
                      options={[
                        { value: 0, label: 'Nie chcę podawać' },
                        { value: 1, label: 'Mężczyzna' },
                        { value: 2, label: 'Kobieta' },
                        { value: 3, label: 'Inna' },
                      ]}
                      value={formik.values.gender}
                      handleChange={(value: number) =>
                        formik.setFieldValue('gender', Number(value))
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="town"
                      name="town"
                      label="Miejscowość"
                      value={formik.values.town}
                      onChange={formik.handleChange}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
                    <DatePicker
                      value={formik.values.birthday}
                      label="Data urodzenia"
                      handleChange={(value: Date | null) => formik.setFieldValue('birthday', value)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Opis"
                      multiline
                      rows={2}
                      variant="filled"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
                    <ImageCropper
                      label="Awatar"
                      width={200}
                      height={200}
                      imageSrc={imageSrc}
                      zoom={zoom}
                      rotation={rotation}
                      onZoomChange={(zoom: number) => onZoomChange(zoom)}
                      onRotationChange={(zoom: number) => onRotationChange(zoom)}
                      onPreviewUpdate={onPreviewUpdate}
                      onSelectFile={onSelectFile}
                    />
                  </Grid>
                </Grid>

                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loadingPosition="end"
                  loading={buttonLoading}
                  endIcon={<SendIcon />}
                >
                  Wyślij
                </LoadingButton>

                {formError.error && (
                  <Box mt={2}>
                    <Typography variant="body2" component="p" color={colors.red[500]} fontSize={12}>
                      {formError.message}
                    </Typography>
                  </Box>
                )}
              </form>
            </Box>
          </Paper>
        </Container>
      </>
    </Page>
  );
};

export default Register;

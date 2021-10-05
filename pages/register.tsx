/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// === Components === //
import { Box, colors, Container, Grid, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Page from '../src/components/layout/Page';
import PageHeader from '../src/components/common/PageHeader';
import ImageCropper from '../src/components/common/form/ImageCropper';
import RegisterMandatorySection from '../src/components/pages/register/RegisterMandatorySection';
import RegisterOptionalSection from '../src/components/pages/register/RegisterOptionalSection';
import Notification from '../src/components/common/Notification';
import Breadcrumbs from '../src/components/common/Breadcrumbs';

// === Helpers === //
import dateFormat from 'dateformat';
import getCroppedImg from '../src/utils/image-cropper';
import * as utils from '../src/utils';
import * as yup from 'yup';

// === Types === //
import { FormikProps, useFormik } from 'formik';
import { CroppedAreaData } from '../src/types/images';
import { NotificationType, RegisterInitialValuesData } from '../src/types/forms';

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
  const [notification, handleNotification] = React.useState({
    open: false,
    message: '',
    type: 'success' as NotificationType,
  });
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
                  handleNotification({
                    open: true,
                    message: `Nie udało się zarejestrować użytkownika!`,
                    type: 'error',
                  });
                } else {
                  handleNotification({
                    open: true,
                    message: `Poprawnie zarejestrowano użytkownika ${values.name}!`,
                    type: 'success',
                  });
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
              handleNotification({
                open: true,
                message: `Nie udało się zarejestrować użytkownika!`,
                type: 'error',
              });
            } else {
              handleNotification({
                open: true,
                message: `Poprawnie zarejestrowano użytkownika ${values.name}!`,
                type: 'success',
              });
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
        <Breadcrumbs
          options={[
            { current: false, label: 'Strona główna', href: '/' },
            { current: true, label: 'Rejestracja', href: '/register' },
          ]}
        />
        <Container maxWidth="xl">
          <PageHeader title="Rejestracja" />
        </Container>
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
            <Box px={3} pb={3} pt={1}>
              <form onSubmit={formik.handleSubmit}>
                <RegisterMandatorySection
                  formik={formik as FormikProps<RegisterInitialValuesData>}
                />
                <RegisterOptionalSection
                  formik={formik as FormikProps<RegisterInitialValuesData>}
                />

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
          <Notification
            open={notification.open}
            message={notification.message}
            type={notification.type}
            handleClose={() =>
              handleNotification({
                open: false,
                message: '',
                type: 'success',
              })
            }
          />
        </Container>
      </>
    </Page>
  );
};

export default Register;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Grid, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import Modal from '../../common/Modal';
import Wysiwig from '../../common/form/Wysiwig';
import Dropdown from '../../common/form/Dropdown';
import ImageCropper from '../../common/form/ImageCropper';
import Notification from '../../common/Notification';

// === Helper === //
import { useFormik } from 'formik';
import getCroppedImg from '../../../utils/image-cropper';
import * as yup from 'yup';

// === Types === //
import { CompanyData } from '../../../types/admin';
import { DropdownOptionsData, NotificationType } from '../../../types/forms';
import { CroppedAreaData } from '../../../types/images';
import { UserData } from '../../../types/users';

interface CompanyCreateEditProps {
  editItem: CompanyData | null;
  open: boolean;
  user: UserData | null;
  handleClose: Function;
  handleReloadData: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę!'),
});

const CompanyCreateEdit = ({
  editItem,
  open,
  user,
  handleClose,
  handleReloadData,
}: CompanyCreateEditProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: '' });
  const [notification, handleNotification] = React.useState({
    open: false,
    message: '',
    type: 'success' as NotificationType,
  });

  // image cropper
  const [imageSrc, setImageSrc]: Array<any> = useState('');
  const [zoom, handleChangeZoom] = useState(1);
  const [rotation, handleChangeRotation] = useState(0);
  const [croppedAreaPixels, handleChangeCroppedAreaPixels]: Array<
    CroppedAreaData | null | Function
  > = useState(null);

  const companyTypes: DropdownOptionsData[] = [
    { title: 'Producent', value: 'producer' },
    { title: 'Wydawca', value: 'distributor' },
    { title: 'Wydawca PL', value: 'distributor_pl' },
  ];

  const formik = useFormik({
    initialValues: {
      name: editItem ? editItem.name : '',
      www: editItem ? editItem.www : '',
      address: editItem ? editItem.address : '',
      type: editItem
        ? editItem.type.map((type: string) => {
            const companyType: DropdownOptionsData | undefined = companyTypes.find(
              (item) => item.value === type
            );

            return {
              title: companyType?.title,
              value: type,
            };
          })
        : undefined,
      description: editItem ? editItem.description : '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        id: editItem ? editItem.id : null,
        name: values.name,
        www: values.www,
        address: values.address,
        type: values.type,
        description: values.description,
        image: null,
        userId: user ? user.id : null,
      };

      if (imageSrc && imageSrc !== '') {
        try {
          getCroppedImg(imageSrc, croppedAreaPixels, rotation).then((image) => {
            input.image = image;

            fetch(`/api/${editItem ? 'company-edit' : 'company-create'}`, {
              headers: {
                'Content-type': 'application/json',
              },
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ ...input }),
            })
              .then((response) => response.json())
              .then((json) => {
                if (json.nameDuplicated) {
                  setFormError({
                    error: true,
                    message: json.errorMessage,
                  });
                  handleNotification({
                    open: true,
                    message: `Nie udało się dodać gry!`,
                    type: 'error',
                  });
                } else {
                  setFormError({
                    error: false,
                    message: '',
                  });
                  handleNotification({
                    open: true,
                    message: `Poprawnie ${editItem ? 'edytowano' : 'dodano'} firmę ${values.name}!`,
                    type: 'success',
                  });
                  resetForm();
                  setImageSrc('');
                  handleChangeZoom(1);
                  handleChangeRotation(0);
                  handleChangeCroppedAreaPixels(null);
                  handleClose();
                  handleReloadData();
                }
                toggleButtonLoading(false);
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
        fetch(`/api/${editItem ? 'company-edit' : 'company-create'}`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ ...input }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.nameDuplicated) {
              handleNotification({
                open: true,
                message: `Nie udało się dodać firmy!`,
                type: 'error',
              });
              setFormError({
                error: true,
                message: json.errorMessage,
              });
            } else {
              setFormError({
                error: false,
                message: '',
              });
              handleNotification({
                open: true,
                message: `Poprawnie ${editItem ? 'edytowano' : 'dodano'} firmę ${values.name}!`,
                type: 'success',
              });
              resetForm();

              handleClose();
              handleReloadData();
            }
            toggleButtonLoading(false);
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

  useEffect(() => {
    console.log(editItem);
    if (editItem && editItem.logo && editItem.logo !== '') {
      setImageSrc(`/img/companies/${editItem.logo}`);
    }
  }, [editItem]);

  return (
    <>
      <Modal
        title={editItem ? 'Edytuj firmę' : 'Dodaj firmę'}
        open={open}
        size="lg"
        handleClose={() => {
          setFormError({
            error: false,
            message: '',
          });
          handleClose();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container mt={2}>
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
            <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
              <TextField
                fullWidth
                id="www"
                name="www"
                label="Strona www"
                value={formik.values.www}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.www && Boolean(formik.errors.www)}
                helperText={formik.touched.www && formik.errors.www}
                variant="filled"
              />
            </Grid>
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Adres"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
              <Dropdown
                id="type"
                label="Typ"
                multiple={true}
                options={companyTypes}
                value={formik.values.type as any}
                handleChange={(value: DropdownOptionsData[] | null) =>
                  formik.setFieldValue('type', value)
                }
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
            </Grid>
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
              <ImageCropper
                label="Logo"
                width={150}
                height={150}
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

          <Box my={2}>
            <Wysiwig
              label="Opis"
              value={formik.values.description}
              onChange={(value: string) => formik.setFieldValue('description', value)}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              type="button"
              color="error"
              variant="contained"
              onClick={() => {
                setFormError({
                  error: false,
                  message: '',
                });
                handleClose();
              }}
              sx={{ marginRight: 2 }}
            >
              Zamknij
            </LoadingButton>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loadingPosition="end"
              loading={buttonLoading}
              endIcon={<Send />}
            >
              Wyślij
            </LoadingButton>
          </Box>

          {formError.error && (
            <Box mt={2}>
              <Typography variant="body2" component="p" color={colors.red[500]} fontSize={12}>
                {formError.message}
              </Typography>
            </Box>
          )}
        </form>
      </Modal>
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
    </>
  );
};

export default CompanyCreateEdit;

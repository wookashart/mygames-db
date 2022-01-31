import React, { useEffect, useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Grid, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import Modal from '../../common/Modal';
import Dropdown from '../../common/form/Dropdown';

// === Helper === //
import { useFormik } from 'formik';
import * as yup from 'yup';

// === Types === //
import { GameDistributionData, PlatformsData } from '../../../types/admin';
import { DropdownOptionsData } from '../../../types/forms';

interface GameDistributonCreateEditProps {
  editItem: GameDistributionData | null;
  open: boolean;
  handleClose: Function;
  handleReloadData: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę!'),
});

const GameDistributonCreateEdit = ({
  editItem,
  open,
  handleClose,
  handleReloadData,
}: GameDistributonCreateEditProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [formError, setFormError] = useState({ error: false, message: '' });

  const formik = useFormik({
    initialValues: {
      name: editItem ? editItem.name : '',
      platforms: editItem
        ? platforms.filter((p: DropdownOptionsData) =>
            editItem.platforms.find((item) => item.id === p.value)
          )
        : [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        id: editItem ? editItem.id : null,
        name: values.name,
        platforms: values.platforms,
      };

      fetch(`/api/${editItem ? 'game-distribution-edit' : 'game-distribution-create'}`, {
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
          } else {
            resetForm();
            setFormError({
              error: false,
              message: '',
            });
            handleClose();
            handleReloadData();
          }
          toggleButtonLoading(false);
        })
        .catch((error) => {
          toggleButtonLoading(false);
          console.error(error);
        });
    },
  });

  const getAllPlatforms = () => {
    fetch(`/api/platforms`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setPlatforms(
            json.items.map((item: PlatformsData) => ({
              title: `${item.platform_name} (${item.platform_code})`,
              value: item.platform_id,
            }))
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllPlatforms();
  }, []);

  return (
    <Modal
      title={editItem ? 'Edytuj rodzaj dystrybucji' : 'Dodaj rodzaj dystrybucji'}
      open={open}
      size="md"
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
          <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
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
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
            <Dropdown
              id="platforms"
              label="Platformy"
              options={platforms}
              multiple={true}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={formik.values.platforms as any}
              handleChange={(value: DropdownOptionsData[] | null) => {
                formik.setFieldValue('platforms', value);
              }}
              error={formik.touched.platforms && Boolean(formik.errors.platforms)}
            />
          </Grid>
        </Grid>

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
  );
};

export default GameDistributonCreateEdit;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Grid, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Add, Send as SendIcon } from '@mui/icons-material';
import Modal from '../../common/Modal';
import Dropdown from '../../common/form/Dropdown';
import DatePicker from '../../common/form/DatePicker';
import Wysiwig from '../../common/form/Wysiwig';
import PlatformProducerCreate from './PlatformProducerCreate';

// === Helper === //
import { useFormik } from 'formik';
import * as yup from 'yup';

// === Types === //
import { PlatformProducersData, PlatformsData } from '../../../types/admin';
import { DropdownOptionsData } from '../../../types/forms';

interface PlatformCreateEditProps {
  editItem: PlatformsData | null;
  open: boolean;
  handleClose: Function;
  handleReloadData: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę platformy!'),
  sortName: yup.string().required('Musisz podać nazwę do sortowania!'),
  code: yup.string().required('Musisz podać kod!'),
  producer: yup
    .object()
    .shape({
      title: yup.string().required(),
      value: yup.number().required(),
    })
    .nullable()
    .required('Musisz wybrać producenta!'),
});

const PlatformCreateEdit = ({
  editItem,
  open,
  handleClose,
  handleReloadData,
}: PlatformCreateEditProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [producers, setProducers] = useState([]);
  const [formError, setFormError] = useState({ error: false, message: '' });
  const [openNestedModal, toggleNestedModal] = useState(false);

  const getAllProducers = () => {
    fetch(`/api/platform-producers`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setProducers(
            json.items.map((item: PlatformProducersData) => ({
              title: item.pproducer_name,
              value: item.pproducer_id,
            }))
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllProducers();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: editItem ? editItem.platform_name : '',
      sortName: editItem ? editItem.platform_sort_name : '',
      code: editItem ? editItem.platform_code : '',
      producer: editItem
        ? producers.find((p: DropdownOptionsData) => p.value === editItem.platform_producer_id)
        : (null as DropdownOptionsData | null),
      date: editItem ? editItem.platform_date : null,
      description: editItem ? editItem.platform_description : '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        id: editItem ? editItem.platform_id : null,
        name: values.name,
        sortName: values.sortName,
        code: values.code,
        producer: values.producer?.value,
        date: values.date,
        description: values.description,
      };

      fetch(`/api/${editItem ? 'platform-edit' : 'platform-create'}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.nameDuplicated || json.sortNameDuplicated || json.codeDuplicated) {
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

  return (
    <Modal
      title={editItem ? 'Edytuj platformę' : 'Dodaj platformę'}
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
      <>
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
            <Grid item xs={12} md={6} pl={{ md: 1 }} mb={2}>
              <TextField
                fullWidth
                id="sortName"
                name="sortName"
                label="Nazwa do sortowania"
                value={formik.values.sortName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sortName && Boolean(formik.errors.sortName)}
                helperText={formik.touched.sortName && formik.errors.sortName}
                variant="filled"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
              <TextField
                fullWidth
                id="code"
                name="code"
                label="Kod"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6} pl={{ md: 1 }} mb={2}>
              <DatePicker
                label="Data premiery na rynku"
                value={formik.values.date as Date | null}
                handleChange={(value: Date | null) => formik.setFieldValue('date', value)}
              />
            </Grid>
          </Grid>

          <Box display="flex">
            <Dropdown
              id="producer"
              options={producers}
              value={formik.values.producer}
              handleChange={(value: DropdownOptionsData | null) =>
                formik.setFieldValue('producer', value)
              }
              error={formik.touched.producer && Boolean(formik.errors.producer)}
              helperText={formik.touched.producer && formik.errors.producer}
            />
            <Box ml={2} display="flex" alignItems="center">
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleNestedModal(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>

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
              endIcon={<SendIcon />}
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
        <PlatformProducerCreate
          open={openNestedModal}
          handleClose={() => toggleNestedModal(false)}
          getAllProducers={getAllProducers}
        />
      </>
    </Modal>
  );
};

export default PlatformCreateEdit;

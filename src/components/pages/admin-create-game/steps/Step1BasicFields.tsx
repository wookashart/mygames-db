/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import DatePicker from '../../../common/form/DatePicker';
import Dropdown from '../../../common/form/Dropdown';
import Checkbox from '../../../common/form/Checkbox';

// === Types === //
import { FormikProps } from 'formik';
import { CreateGameInitialValuesData, DropdownOptionsData } from '../../../../types/forms';

interface Step1BasicFieldsProps {
  formik: FormikProps<CreateGameInitialValuesData>;
  platforms: DropdownOptionsData[];
  tags: DropdownOptionsData[];
  producers: DropdownOptionsData[];
  distributors: DropdownOptionsData[];
  distributorsPl: DropdownOptionsData[];
  toggleStep1Failed: Function;
  toggleOpenCreatePlatform: Function;
  toggleOpenCreateTag: Function;
  toggleOpenCreateProducer: Function;
  toggleOpenCreateDistributor: Function;
  toggleOpenCreateDistributorPl: Function;
}

const Step1BasicFields = ({
  formik,
  platforms,
  tags,
  producers,
  distributors,
  distributorsPl,
  toggleStep1Failed,
  toggleOpenCreatePlatform,
  toggleOpenCreateTag,
  toggleOpenCreateProducer,
  toggleOpenCreateDistributor,
  toggleOpenCreateDistributorPl,
}: Step1BasicFieldsProps) => {
  const validateForm = () => {
    formik.validateForm().then((val: any) => {
      if (Object.keys(val).length === 0) {
        toggleStep1Failed(false);
      }
    });
  };

  return (
    <Box mt={4}>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nazwa Oryginalna/Globalna"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              validateForm();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              validateForm();
            }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <TextField
            fullWidth
            id="namePl"
            name="namePl"
            label="Nazwa PL"
            value={formik.values.namePl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.namePl && Boolean(formik.errors.namePl)}
            helperText={formik.touched.namePl && formik.errors.namePl}
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <TextField
            fullWidth
            id="nameSort"
            name="nameSort"
            label="Nazwa do sortowania"
            value={formik.values.nameSort}
            onChange={(e) => {
              formik.handleChange(e);
              validateForm();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              validateForm();
            }}
            error={formik.touched.nameSort && Boolean(formik.errors.nameSort)}
            helperText={formik.touched.nameSort && formik.errors.nameSort}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <TextField
            fullWidth
            id="groupName"
            name="groupName"
            label="Nazwa serii"
            value={formik.values.groupName}
            onChange={(e) => {
              formik.handleChange(e);
              validateForm();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              validateForm();
            }}
            error={formik.touched.groupName && Boolean(formik.errors.groupName)}
            helperText={formik.touched.groupName && formik.errors.groupName}
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <DatePicker
              label="Data pierwszej premiery"
              value={formik.values.firstDate as Date | null}
              disabled={formik.values.earlyAccess}
              handleChange={(value: Date | null) => formik.setFieldValue('firstDate', value)}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => {
                  const today = new Date();
                  formik.setFieldValue('firstDate', today);
                }}
              >
                Dzisiaj
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center" height="100%" pl={2}>
            <Checkbox
              id="earlyAccess"
              label="Gra we wczesnym dostępie"
              value={formik.values.earlyAccess}
              handleChange={(value: boolean) => formik.setFieldValue('earlyAccess', value)}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <Dropdown
              id="platforms"
              label="Platformy"
              options={platforms}
              multiple={true}
              value={formik.values.platforms as any}
              handleChange={(value: DropdownOptionsData[] | null) => {
                formik.setFieldValue('platforms', value);
                formik.setFieldValue(
                  'platformsDates',
                  value?.map((item) => ({
                    platformId: item.value,
                    platformName: item.title,
                    date: null,
                  }))
                );
              }}
              error={formik.touched.platforms && Boolean(formik.errors.platforms)}
              helperText={formik.touched.platforms && formik.errors.platforms}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleOpenCreatePlatform(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <Dropdown
              id="tags"
              label="Tagi"
              options={tags}
              multiple={true}
              value={formik.values.tags as any}
              handleChange={(value: DropdownOptionsData[] | null) =>
                formik.setFieldValue('tags', value)
              }
              error={formik.touched.tags && Boolean(formik.errors.tags)}
              helperText={formik.touched.tags && formik.errors.tags}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleOpenCreateTag(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <Dropdown
              id="producer"
              label="Producent"
              options={producers}
              value={formik.values.producer}
              handleChange={(value: DropdownOptionsData | null) =>
                formik.setFieldValue('producer', value)
              }
              error={formik.touched.producer && Boolean(formik.errors.producer)}
              helperText={formik.touched.producer && formik.errors.producer}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleOpenCreateProducer(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <Dropdown
              id="distributor"
              label="Wydawca globalny"
              options={distributors}
              value={formik.values.distributor}
              handleChange={(value: DropdownOptionsData | null) =>
                formik.setFieldValue('distributor', value)
              }
              error={formik.touched.distributor && Boolean(formik.errors.distributor)}
              helperText={formik.touched.distributor && formik.errors.distributor}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleOpenCreateDistributor(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
          <Box display="flex" alignItems="center">
            <Dropdown
              id="distributorPl"
              label="Wydawca w Polsce"
              options={distributorsPl}
              value={formik.values.distributorPl}
              handleChange={(value: DropdownOptionsData | null) =>
                formik.setFieldValue('distributorPl', value)
              }
              error={formik.touched.distributorPl && Boolean(formik.errors.distributorPl)}
              helperText={formik.touched.distributorPl && formik.errors.distributorPl}
            />
            <Box ml={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                onClick={() => toggleOpenCreateDistributorPl(true)}
              >
                <Add />
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Step1BasicFields;

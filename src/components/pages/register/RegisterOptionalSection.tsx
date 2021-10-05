import React from 'react';

// === Components === //
import { Grid, TextField } from '@mui/material';
import DividerText from '../../common/DividerText';
import Radio from '../../common/form/Radio';
import DatePicker from '../../common/form/DatePicker';
import Wysiwig from '../../common/form/Wysiwig';

// === Types === //
import { FormikProps } from 'formik';
import { RegisterInitialValuesData } from '../../../types/forms';

interface RegisterOptionalSectionProps {
  formik: FormikProps<RegisterInitialValuesData>;
}

const RegisterOptionalSection = ({ formik }: RegisterOptionalSectionProps) => {
  return (
    <>
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
            handleChange={(value: number) => formik.setFieldValue('gender', Number(value))}
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
            value={formik.values.birthday as Date | null}
            label="Data urodzenia"
            handleChange={(value: Date | null) => formik.setFieldValue('birthday', value)}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
          <Wysiwig
            label="Opis"
            value={formik.values.description}
            onChange={(value: string) => formik.setFieldValue('description', value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterOptionalSection;

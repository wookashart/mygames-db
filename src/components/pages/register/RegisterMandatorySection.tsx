import React from 'react';

// === Components === //
import { Grid, TextField } from '@mui/material';
import DividerText from '../../common/DividerText';

// === Types === //
import { FormikProps } from 'formik';
import { RegisterInitialValuesData } from '../../../types/forms';

interface RegisterMandatorySectionProps {
  formik: FormikProps<RegisterInitialValuesData>;
}

const RegisterMandatorySection = ({ formik }: RegisterMandatorySectionProps) => {
  return (
    <>
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
    </>
  );
};

export default RegisterMandatorySection;

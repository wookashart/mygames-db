import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import Wysiwig from '../../../common/form/Wysiwig';

// === Types === //
import { FormikProps } from 'formik';
import { CreateGameInitialValuesData } from '../../../../types/forms';

interface Step4DescriptionProps {
  formik: FormikProps<CreateGameInitialValuesData>;
}

const Step4Description = ({ formik }: Step4DescriptionProps) => {
  return (
    <Box mt={4}>
      <Wysiwig
        label="Opis"
        value={formik.values.description}
        onChange={(value: string) => formik.setFieldValue('description', value)}
      />
    </Box>
  );
};

export default Step4Description;

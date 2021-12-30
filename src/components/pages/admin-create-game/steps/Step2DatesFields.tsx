import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DatePicker from '../../../common/form/DatePicker';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { FormikProps } from 'formik';
import { CreateGameInitialValuesData, DropdownOptionsData } from '../../../../types/forms';

interface Step2DatesFieldsProps {
  formik: FormikProps<CreateGameInitialValuesData>;
}

const Step2DatesFields = ({ formik }: Step2DatesFieldsProps) => {
  const setPlatformsDate = (index: number, date: Date | null) => {
    const pDates = formik.values.platformsDates;
    pDates[index].date = date;
    return pDates;
  };

  return (
    <Box mt={4}>
      {!formik.values.platforms || formik.values.platforms.length === 0 ? (
        <Typography color={customColors.textLight}>
          Nie wybrano platform! Daty mozna tylko dodać do wybranych platform.
        </Typography>
      ) : (
        <Box>
          {formik.values.platforms.map((platform: DropdownOptionsData, index: number) => {
            return (
              <Grid container mt={2} key={platform.value}>
                <Grid item xs={12} md={8} pr={{ md: 1 }} mb={2} mx="auto">
                  <Box display="flex" alignItems="center">
                    <DatePicker
                      label={platform.title}
                      value={formik.values.platformsDates[index].date as Date | null}
                      disabled={formik.values.earlyAccess}
                      handleChange={(value: Date | null) =>
                        formik.setFieldValue('platformsDates', setPlatformsDate(index, value))
                      }
                    />
                    <Box ml={2}>
                      <LoadingButton
                        type="button"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          const today = new Date();
                          formik.setFieldValue('platformsDates', setPlatformsDate(index, today));
                        }}
                      >
                        Dzisiaj
                      </LoadingButton>
                    </Box>
                    <Box ml={2} width="330px">
                      <LoadingButton
                        type="button"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          formik.setFieldValue(
                            'platformsDates',
                            setPlatformsDate(index, formik.values.firstDate)
                          );
                        }}
                      >
                        Pierwsza premiera
                      </LoadingButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Step2DatesFields;

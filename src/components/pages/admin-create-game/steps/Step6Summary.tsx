import React from 'react';

// === Components === //
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';

// === Helpers === //
import dateFormat from 'dateformat';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { FormikProps } from 'formik';
import { CreateGameInitialValuesData } from '../../../../types/forms';

interface Step5SummaryProps {
  formik: FormikProps<CreateGameInitialValuesData>;
  imageSrc: string;
}

const Step6Summary = ({ formik, imageSrc }: Step5SummaryProps) => {
  return (
    <>
      <Box mt={4}>
        <Grid container mt={2}>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Nazwa Oryginalna/Globalna: <strong>{formik.values.name}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Nazwa PL: <strong>{formik.values.namePl}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Nazwa do sortowania: <strong>{formik.values.nameSort}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Nazwa serii: <strong>{formik.values.groupName}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Platformy:{' '}
              {formik.values.platforms?.map((platform) => (
                <strong key={platform.value}>{platform.title}, </strong>
              ))}
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Gra we wczesnym dostępie: <strong>{formik.values.earlyAccess ? 'TAK' : 'NIE'}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Data pierwszej premiery:{' '}
              <strong>
                {formik.values.firstDate ? dateFormat(formik.values.firstDate, 'dd-mm-yyyy') : ''}
              </strong>
            </Typography>

            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Daty premier:
            </Typography>
            <Box pl={2}>
              {formik.values.platformsDates.map((date) => (
                <Typography sx={{ mb: 1 }} color={customColors.textLight} key={date.platformId}>
                  {date.platformName}:{' '}
                  <strong>{date.date ? dateFormat(date.date as Date, 'dd-mm-yyyy') : ''}</strong>
                </Typography>
              ))}
            </Box>

            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Tagi:{' '}
              {formik.values.tags?.map((tag) => (
                <strong key={tag.value}>{tag.title}, </strong>
              ))}
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Producent: <strong>{formik.values.producer?.title}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Wydawca globalny: <strong>{formik.values.distributor?.title}</strong>
            </Typography>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Wydawca w Polsce: <strong>{formik.values.distributorPl?.title}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Okładka:
            </Typography>
            <Box width="250px">
              {imageSrc ? <img className="summary-cover" src={imageSrc} alt="" /> : null}
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Typography sx={{ mb: 1 }} color={customColors.textLight}>
            Opis:
          </Typography>
          <div className="summary-description">{ReactHtmlParser(formik.values.description)}</div>
        </Box>

        <Grid container mt={2}>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Wymagania minimalne:
            </Typography>
            <Box pl={2}>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Procesor: {formik.values.cpuMin}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Karta graficzna: {formik.values.gpuMin}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                RAM: {formik.values.ramMin}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                System operacyjny: {formik.values.systemMin?.title}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                DirectX: {formik.values.directxMin?.title}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Miejsce na dysku: {formik.values.hddMin}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 1 }} color={customColors.textLight}>
              Wymagania rekomendowane:
            </Typography>
            <Box pl={2}>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Procesor: {formik.values.cpuReccomended}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Karta graficzna: {formik.values.gpuReccomended}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                RAM: {formik.values.ramReccomended}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                System operacyjny: {formik.values.systemReccomended?.title}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                DirectX: {formik.values.directxReccomended?.title}
              </Typography>
              <Typography sx={{ mb: 1 }} color={customColors.textLight}>
                Miejsce na dysku: {formik.values.hddReccomended}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <style jsx>{`
        .summary-cover {
          max-width: 100%;
        }

        .summary-description,
        .summary-description * {
          color: ${customColors.textLight};
        }

        .summary-description p {
          margin: 5px 0;
        }
      `}</style>
    </>
  );
};

export default Step6Summary;

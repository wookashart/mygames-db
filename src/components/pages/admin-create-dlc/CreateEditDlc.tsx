/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import PlatformCreateEdit from '../admin-platforms/PlatformCreateEdit';
import Step1BasicFields from './steps/Step1BasicFields';
import Step2DatesFields from '../admin-create-game/steps/Step2DatesFields';
import Step4Description from '../admin-create-game/steps/Step4Description';
import Step5Cover from '../admin-create-game/steps/Step5Cover';
import Step5Summary from './steps/Step5Summary';
import Notification from '../../common/Notification';

// === Helper === //
import dateFormat from 'dateformat';
import { useFormik } from 'formik';
import getCroppedImg from '../../../utils/image-cropper';
import * as yup from 'yup';

// === Styles === //
import { customColors } from '../../../styles/variables';
import { colors, makeStyles } from '@material-ui/core';

// === Types === //
import { UserData } from '../../../types/users';
import {
  CreateGamePlatformsDatesData,
  DropdownOptionsData,
  NotificationType,
} from '../../../types/forms';
import { PlatformsData } from '../../../types/admin';
import { CroppedAreaData } from '../../../types/images';

interface CreateEditDlcFormProps {
  editItem: any | null;
  user: UserData | null;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę!'),
  nameSort: yup.string().required('Musisz podać nazwę do sortowania!'),
  game: yup.object({
    title: yup.string().required('Musisz wybrać grę!'),
    value: yup.number().required('Musisz wybrać grę!'),
  }),
});

const steps = ['Podstawowe dane', 'Daty premier', 'Opis', 'Okładka', 'Podsumowanie'];

const CreateEditDlc = ({ editItem, user }: CreateEditDlcFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [step1Failed, toggleStep1Failed] = useState(false);
  const [submitDisabled, toggleSubmitDisabled] = useState(true);
  const [formError, setFormError] = useState({ error: false, message: '' });
  const [notification, handleNotification] = React.useState({
    open: false,
    message: '',
    type: 'success' as NotificationType,
  });

  // dropdowns data
  const [platforms, setPlatforms] = useState([]);

  // modals
  const [openCreatePlatform, toggleOpenCreatePlatform] = useState(false);

  // image cropper
  const [imageSrc, setImageSrc]: Array<any> = useState('');
  const [zoom, handleChangeZoom] = useState(1);
  const [rotation, handleChangeRotation] = useState(0);
  const [croppedAreaPixels, handleChangeCroppedAreaPixels]: Array<
    CroppedAreaData | null | Function
  > = useState(null);

  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiStepLabel-label': { color: customColors.textLight },
      '& .MuiStepLabel-label.Mui-active': { color: 'white' },
      '& .MuiStepLabel-label.Mui-error': { color: colors.red[500] },
      '& .Mui-disabled .MuiStepIcon-root': { color: colors.grey[600] },
    },
  }));
  const c = useStyles();

  const handleNext = (index: number) => {
    if (index === 0) {
      formik.validateForm().then((val) => {
        if (Object.keys(val).length > 0) {
          formik.setTouched({
            name: true,
            nameSort: true,
            game: true,
          });
          toggleStep1Failed(true);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (index === 3) {
      setTimeout(() => {
        toggleSubmitDisabled(false);
      }, 1000);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    toggleSubmitDisabled(true);
  };

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

  const formik = useFormik({
    initialValues: {
      name: editItem ? editItem.distributor_name : '',
      namePl: editItem ? editItem.distributor_namePl : '',
      nameSort: '',
      firstDate: editItem ? editItem.distributor_firstDate : null,
      platforms: [],
      earlyAccess: false,
      platformsDates: [],
      description: editItem ? editItem.game_description : '',
      game: null as DropdownOptionsData | null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);

      const input = {
        id: editItem ? editItem.dlc_id : null,
        name: values.name,
        namePl: values.namePl,
        nameSort: values.nameSort,
        firstDate: values.earlyAccess
          ? null
          : values.firstDate
          ? dateFormat(values.firstDate, 'yyyy-mm-dd')
          : null,
        platforms: values.platforms,
        earlyAccess: values.earlyAccess ? 1 : 0,
        platformsDates: values.earlyAccess
          ? null
          : values.platformsDates.map((pd: CreateGamePlatformsDatesData) => ({
              ...pd,
              date: pd.date ? dateFormat(pd.date, 'yyyy-mm-dd') : null,
            })),
        description: values.description,
        image: null,
        userId: user ? user.id : null,
        game: values.game ? values.game.value : null,
      };

      if (imageSrc && imageSrc !== '') {
        try {
          getCroppedImg(imageSrc, croppedAreaPixels, rotation).then((image) => {
            input.image = image;

            fetch(`/api/dlc-create`, {
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
                toggleSubmitDisabled(true);

                if (json.nameSortDuplicated || json.nameDuplicated) {
                  setFormError({
                    error: true,
                    message: json.errorMessage,
                  });
                  handleNotification({
                    open: true,
                    message: `Nie udało się dodać DLC!`,
                    type: 'error',
                  });
                } else {
                  handleNotification({
                    open: true,
                    message: `Poprawnie dodano DLC ${values.name}!`,
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
                  setActiveStep(0);
                }
              })
              .catch((error) => {
                toggleButtonLoading(false);
                toggleSubmitDisabled(true);
                console.error(error);
              });
          });
        } catch (e) {
          toggleButtonLoading(false);
          console.error(e);
        }
      }
    },
  });

  return (
    <Box px={3} py={3}>
      <Stepper activeStep={activeStep} alternativeLabel className={c.root}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};

          if (step1Failed && index === 0) {
            labelProps.optional = (
              <Typography variant="caption" color="error" align="center" display="block">
                Uzupełnij brakujące pola!
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <form onSubmit={formik.handleSubmit}>
        {activeStep === 0 && (
          <Step1BasicFields
            formik={formik as any}
            toggleStep1Failed={toggleStep1Failed}
            platforms={platforms}
            toggleOpenCreatePlatform={toggleOpenCreatePlatform}
          />
        )}
        {activeStep === 1 && <Step2DatesFields formik={formik as any} />}
        {activeStep === 2 && <Step4Description formik={formik as any} />}
        {activeStep === 3 && (
          <Step5Cover
            imageSrc={imageSrc}
            zoom={zoom}
            rotation={rotation}
            onSelectFile={onSelectFile}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onPreviewUpdate={onPreviewUpdate}
          />
        )}
        {activeStep === 4 && <Step5Summary formik={formik as any} imageSrc={imageSrc} />}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            type="button"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Wstecz
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loadingPosition="end"
              loading={buttonLoading}
              endIcon={<Send />}
              disabled={submitDisabled}
            >
              Zapisz
            </LoadingButton>
          ) : (
            <LoadingButton
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleNext(activeStep)}
              disabled={step1Failed}
            >
              Dalej
            </LoadingButton>
          )}
          {formError.error && (
            <Box mt={2}>
              <Typography variant="body2" component="p" color={colors.red[500]} fontSize={12}>
                {formError.message}
              </Typography>
            </Box>
          )}
        </Box>
      </form>

      <PlatformCreateEdit
        editItem={null}
        open={openCreatePlatform}
        handleClose={() => toggleOpenCreatePlatform(false)}
        handleReloadData={() => getAllPlatforms()}
      />
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
    </Box>
  );
};

export default CreateEditDlc;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import Step1BasicFields from './steps/Step1BasicFields';
import Step2DatesFields from './steps/Step2DatesFields';
import Step3Requirements from './steps/Step3Requirements';
import Step4Description from './steps/Step4Description';
import Step5Cover from './steps/Step5Cover';
import Step6Summary from './steps/Step6Summary';
import PlatformCreateEdit from '../admin-platforms/PlatformCreateEdit';
import TagCreateEdit from '../admin-tags/TagCreateEdit';
import CompanyCreateEdit from '../admin-companies/CompanyCreateEdit';
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
import {
  CreateGamePlatformsDatesData,
  DropdownOptionsData,
  NotificationType,
} from '../../../types/forms';
import { CompanyData, PlatformsData, TagData } from '../../../types/admin';
import { CroppedAreaData } from '../../../types/images';
import { UserData } from '../../../types/users';

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę!'),
  nameSort: yup.string().required('Musisz podać nazwę do sortowania!'),
  groupName: yup.string().required('Musisz podać nazwę do serii!'),
});

interface CreateEditGameFormProps {
  editItem: any | null;
  user: UserData | null;
}

const steps = [
  'Podstawowe dane',
  'Daty premier',
  'Wymagania sprzętowe',
  'Opis',
  'Okładka',
  'Podsumowanie',
];

const CreateEditGameForm = ({ editItem, user }: CreateEditGameFormProps) => {
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
  const [tags, setTags] = useState([]);
  const [producers, setProducers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [distributorsPl, setDistributorsPl] = useState([]);

  // image cropper
  const [imageSrc, setImageSrc]: Array<any> = useState('');
  const [zoom, handleChangeZoom] = useState(1);
  const [rotation, handleChangeRotation] = useState(0);
  const [croppedAreaPixels, handleChangeCroppedAreaPixels]: Array<
    CroppedAreaData | null | Function
  > = useState(null);

  // modals
  const [openCreatePlatform, toggleOpenCreatePlatform] = useState(false);
  const [openCreateTag, toggleOpenCreateTag] = useState(false);
  // const [openCreateProducer, toggleOpenCreateProducer] = useState(false);
  // const [openCreateDistributor, toggleOpenCreateDistributor] = useState(false);
  const [openCreateCompany, toggleOpenCreateCompany] = useState(false);

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
            groupName: true,
          });
          toggleStep1Failed(true);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (index === 4) {
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
  const getAllTags = () => {
    fetch(`/api/tags`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setTags(
            json.items.map((item: TagData) => ({
              title: item.tag_name,
              value: item.tag_id,
            }))
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getAllCompanies = () => {
    fetch(`/api/companies`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && !json.error) {
          const producers = json.items
            .filter((item: CompanyData) => item.type.find((type) => type === 'producer'))
            .map((item: CompanyData) => ({
              title: item.name,
              value: item.id,
            }));
          const distributors = json.items
            .filter((item: CompanyData) => item.type.find((type) => type === 'distributor'))
            .map((item: CompanyData) => ({
              title: item.name,
              value: item.id,
            }));
          const distributorsPl = json.items
            .filter((item: CompanyData) => item.type.find((type) => type === 'distributor_pl'))
            .map((item: CompanyData) => ({
              title: item.name,
              value: item.id,
            }));

          setProducers(producers);
          setDistributors(distributors);
          setDistributorsPl(distributorsPl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllPlatforms();
    getAllTags();
    getAllCompanies();
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
      nameSort: editItem ? editItem.distributor_nameSort : '',
      groupName: editItem ? editItem.distributor_groupName : '',
      firstDate: editItem ? editItem.distributor_firstDate : null,
      platforms: [],
      tags: [],
      producer: editItem
        ? producers.find((p: DropdownOptionsData) => p.value === editItem.platform_producer_id)
        : (null as DropdownOptionsData | null),
      distributor: editItem
        ? distributors.find((p: DropdownOptionsData) => p.value === editItem.platform_producer_id)
        : (null as DropdownOptionsData | null),
      distributorPl: editItem
        ? distributorsPl.find((p: DropdownOptionsData) => p.value === editItem.platform_producer_id)
        : (null as DropdownOptionsData | null),
      earlyAccess: false,
      platformsDates: [],
      cpuMin: '',
      gpuMin: '',
      ramMin: '',
      systemMin: null,
      directxMin: null,
      hddMin: '',
      cpuReccomended: '',
      gpuReccomended: '',
      ramReccomended: '',
      systemReccomended: null,
      directxReccomended: null,
      hddReccomended: '',
      description: editItem ? editItem.game_description : '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);

      const input = {
        id: editItem ? editItem.game_id : null,
        name: values.name,
        namePl: values.namePl,
        nameSort: values.nameSort,
        groupName: values.groupName,
        firstDate: values.earlyAccess
          ? null
          : values.firstDate
          ? dateFormat(values.firstDate, 'yyyy-mm-dd')
          : null,
        platforms: values.platforms,
        tags: values.tags,
        producer: values.producer ? values.producer.value : null,
        distributor: values.distributor ? values.distributor.value : null,
        distributorPl: values.distributorPl ? values.distributorPl.value : null,
        earlyAccess: values.earlyAccess ? 1 : 0,
        platformsDates: values.earlyAccess
          ? null
          : values.platformsDates.map((pd: CreateGamePlatformsDatesData) => ({
              ...pd,
              date: pd.date ? dateFormat(pd.date, 'yyyy-mm-dd') : null,
            })),
        cpuMin: values.cpuMin,
        gpuMin: values.gpuMin,
        ramMin: values.ramMin,
        systemMin: values.systemMin ? (values.systemMin as DropdownOptionsData).value : null,
        directxMin: values.directxMin ? (values.directxMin as DropdownOptionsData).value : null,
        hddMin: values.hddMin,
        cpuReccomended: values.cpuReccomended,
        gpuReccomended: values.gpuReccomended,
        ramReccomended: values.ramReccomended,
        systemReccomended: values.systemReccomended
          ? (values.systemReccomended as DropdownOptionsData).value
          : null,
        directxReccomended: values.directxReccomended
          ? (values.directxReccomended as DropdownOptionsData).value
          : null,
        hddReccomended: values.hddReccomended,
        description: values.description,
        image: null,
        userId: user ? user.id : null,
      };

      if (imageSrc && imageSrc !== '') {
        try {
          getCroppedImg(imageSrc, croppedAreaPixels, rotation).then((image) => {
            input.image = image;

            fetch(`/api/game-create`, {
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
                    message: `Nie udało się dodać gry!`,
                    type: 'error',
                  });
                } else {
                  handleNotification({
                    open: true,
                    message: `Poprawnie dodano grę ${values.name}!`,
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
      } else {
        fetch(`/api/game-create`, {
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
                message: `Nie udało się dodać gry!`,
                type: 'error',
              });
            } else {
              handleNotification({
                open: true,
                message: `Poprawnie dodano grę ${values.name}!`,
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
            }
          })
          .catch((error) => {
            toggleButtonLoading(false);
            toggleSubmitDisabled(true);
            console.error(error);
          });
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
            tags={tags}
            producers={producers}
            distributors={distributors}
            distributorsPl={distributorsPl}
            toggleOpenCreatePlatform={toggleOpenCreatePlatform}
            toggleOpenCreateTag={toggleOpenCreateTag}
            toggleOpenCreateCompany={toggleOpenCreateCompany}
          />
        )}
        {activeStep === 1 && <Step2DatesFields formik={formik as any} />}
        {activeStep === 2 && <Step3Requirements formik={formik as any} />}
        {activeStep === 3 && <Step4Description formik={formik as any} />}
        {activeStep === 4 && (
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
        {activeStep === 5 && <Step6Summary formik={formik as any} imageSrc={imageSrc} />}

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
      <TagCreateEdit
        editItem={null}
        open={openCreateTag}
        handleClose={() => toggleOpenCreateTag(false)}
        handleReloadData={() => getAllTags()}
      />
      <CompanyCreateEdit
        editItem={null}
        open={openCreateCompany}
        user={user}
        handleClose={() => toggleOpenCreateCompany(false)}
        handleReloadData={() => getAllCompanies()}
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

export default CreateEditGameForm;

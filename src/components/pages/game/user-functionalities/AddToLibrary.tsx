import React, { Component } from 'react';

// === Components == //
import { Box } from '@mui/system';
import { colors, Divider, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add, Delete, Send } from '@mui/icons-material';
import Modal from '../../../common/Modal';
import Dropdown from '../../../common/form/Dropdown';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { PlatformsData, UserFunctionData } from '../../../../types/games';
import { GameDistributionData } from '../../../../types/admin';
import { AddToLibrarySelectedItemsData, DropdownOptionsData } from '../../../../types/forms';

interface AddToLibraryProps {
  funcData: UserFunctionData;
  modalOpen: boolean;
  availablePlatforms: PlatformsData[];
  handleClose: Function;
  handleSubmit: Function;
}

class AddToLibrary extends Component<AddToLibraryProps> {
  state = {
    buttonLoading: false,
    platforms: [],
    distributions: [],
    distributionsOptions: [[]],
    selectedItems: [{ platform: null, distribution: null }],
  };

  componentDidMount() {
    this.getAllPlatforms();
    this.getAllDistributions();

    setTimeout(() => {
      this.setDefaultData();
    }, 1000);
  }

  getAllPlatforms = () => {
    this.setState({
      platforms: this.props.availablePlatforms.map((item: PlatformsData) => ({
        title: `${item.name} (${item.code})`,
        value: item.id,
      })),
    });
  };

  getAllDistributions = () => {
    fetch(`/api/game-distributions`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json && !json.error) {
            this.setState({ distributions: json.items });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  addSelectedItem = () => {
    this.handleSelectedItems([...this.state.selectedItems, { platform: null, distribution: null }]);
    this.setDistributionsOptions([...this.state.distributionsOptions, []]);
  };

  removeSelectedItem = (index: number) => {
    const tempItems: AddToLibrarySelectedItemsData[] = [];
    const tempOptions: Array<DropdownOptionsData[]> = [];

    this.state.selectedItems.forEach((item, idx) => {
      if (index !== idx) {
        tempItems.push(item);
      }
    });
    this.state.distributionsOptions.forEach((item, idx) => {
      if (index !== idx) {
        tempOptions.push(item);
      }
    });

    this.handleSelectedItems(tempItems);
    this.setDistributionsOptions(tempOptions);
  };

  handleChangePlatform = (index: number, value: DropdownOptionsData | null) => {
    const selectedItemsChanged: AddToLibrarySelectedItemsData[] = [];
    this.getDistributionsOptions(index, value ? Number(value.value) : null);

    this.state.selectedItems.forEach((p, i) => {
      if (index === i) {
        selectedItemsChanged.push({
          platform: value,
          distribution: null,
        });
      } else {
        selectedItemsChanged.push(p);
      }
    });

    this.handleSelectedItems(selectedItemsChanged);
  };

  handleChangeDistribution = (index: number, value: DropdownOptionsData | null) => {
    const selectedItemsChanged: AddToLibrarySelectedItemsData[] = [];

    this.state.selectedItems.forEach((p, i) => {
      if (index === i) {
        selectedItemsChanged.push({
          platform: this.state.selectedItems[index].platform,
          distribution: value,
        });
      } else {
        selectedItemsChanged.push(p);
      }
    });

    this.handleSelectedItems(selectedItemsChanged);
  };

  getDistributionsOptions = (index: number, platformId: number | null) => {
    const tempArr: Array<DropdownOptionsData[]> = [];
    const dDistributions: GameDistributionData[] = this.state.distributions;

    this.state.distributionsOptions.forEach((dArr, i) => {
      if (!platformId) {
        tempArr.push([]);
      } else if (index === i) {
        const optionsArr = dDistributions
          .filter(
            (d) =>
              d.platforms && d.platforms.length > 0 && d.platforms.find((p) => p.id === platformId)
          )
          .map((item) => ({
            title: item.name,
            value: item.id,
          }));

        tempArr.push(optionsArr);
      } else {
        tempArr.push(dArr);
      }
    });

    this.setDistributionsOptions(tempArr);
  };

  clearData = () => {
    this.handleSelectedItems([{ platform: null, distribution: null }]);
    this.setDistributionsOptions([[]]);
  };

  setDefaultData = () => {
    const { funcData } = this.props;
    const { distributions, platforms } = this.state;
    const modifySelectedItems: AddToLibrarySelectedItemsData[] = [];
    const modifyDistributionOptions: Array<DropdownOptionsData[]> = [];

    if (funcData && funcData.library && funcData.library.length > 0) {
      funcData.library.map((lib) => {
        const dDistribution: GameDistributionData | null | undefined =
          distributions && distributions.length > 0
            ? distributions.find(
                (distribution: GameDistributionData) =>
                  Number(distribution.id) === Number(lib.distribution)
              )
            : null;

        const pPlatform: DropdownOptionsData | null =
          platforms.find(
            (platform: DropdownOptionsData) => Number(platform.value) === Number(lib.platform)
          ) || null;

        const item = {
          platform: pPlatform,
          distribution: dDistribution
            ? {
                title: (dDistribution as GameDistributionData).name,
                value: (dDistribution as GameDistributionData).id,
              }
            : null,
        };

        const distributionOptions = distributions
          .filter(
            (d: GameDistributionData) =>
              d.platforms &&
              d.platforms.length > 0 &&
              d.platforms.find((p) => Number(p.id) === Number(lib.platform))
          )
          .map((item: GameDistributionData) => ({
            title: item.name,
            value: item.id,
          }));

        modifyDistributionOptions.push(distributionOptions);
        modifySelectedItems.push(item);
      });

      this.setDistributionsOptions(modifyDistributionOptions);
      this.handleSelectedItems(modifySelectedItems);
    } else {
      this.setDistributionsOptions([[]]);
      this.handleSelectedItems([{ platform: null, distribution: null }]);
    }
  };

  handleSelectedItems = (value: AddToLibrarySelectedItemsData[]) =>
    this.setState({ selectedItems: value });
  setDistributionsOptions = (value: Array<DropdownOptionsData[]>) =>
    this.setState({ distributionsOptions: value });
  handleButtonLoading = (value: boolean) => this.setState({ buttonLoading: value });

  render() {
    const { funcData, modalOpen, handleClose, handleSubmit } = this.props;
    const { buttonLoading, platforms, distributionsOptions, selectedItems } = this.state;

    return (
      <Modal
        title={funcData && funcData.library ? 'Edytuj w bibliotece' : 'Dodaj do biblioteki'}
        open={modalOpen}
        size="md"
        handleClose={() => handleClose()}
      >
        <Box>
          <Box py={4} px={2}>
            {selectedItems.map((item, index) => (
              <Box key={index}>
                <Box>
                  <Typography color={customColors.textLight} component="p" variant="body2">
                    Platforma: {index + 1}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box flex={1} pr={2}>
                    <Box mt={2}>
                      <Dropdown
                        id={`platforms-${index}`}
                        label="Platforma"
                        options={platforms}
                        multiple={false}
                        value={selectedItems[index].platform}
                        handleChange={(value: DropdownOptionsData | null) =>
                          this.handleChangePlatform(index, value)
                        }
                      />
                    </Box>
                    <Box mt={2}>
                      <Dropdown
                        id={`distributions-${index}`}
                        label="Dystrybucja"
                        options={distributionsOptions[index]}
                        multiple={false}
                        value={selectedItems[index].distribution}
                        handleChange={(value: DropdownOptionsData | null) =>
                          this.handleChangeDistribution(index, value)
                        }
                      />
                    </Box>
                  </Box>
                  {index > 0 && (
                    <Box pl={1}>
                      <IconButton
                        size="large"
                        edge="start"
                        color="error"
                        aria-label="delete"
                        sx={{ mr: 2 }}
                        onClick={() => this.removeSelectedItem(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Divider
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    borderColor: colors.grey[700],
                  }}
                />
              </Box>
            ))}
            <Box mt={2}>
              <LoadingButton
                type="button"
                color="primary"
                variant="contained"
                endIcon={<Add />}
                onClick={() => this.addSelectedItem()}
              >
                Dodaj platformę
              </LoadingButton>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              type="button"
              color="error"
              variant="contained"
              onClick={() => handleClose()}
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
              onClick={() => handleSubmit(this.handleButtonLoading, handleClose, selectedItems)}
            >
              Zapisz
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    );
  }
}

export default AddToLibrary;

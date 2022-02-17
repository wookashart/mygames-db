import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import Dropdown from '../../../common/form/Dropdown';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { FormikProps } from 'formik';
import { CreateGameInitialValuesData, DropdownOptionsData } from '../../../../types/forms';
import { DirectXData, WindowsData } from '../../../../types/admin';

interface Step3RequirementsProps {
  formik: FormikProps<CreateGameInitialValuesData>;
}

class Step3Requirements extends Component<Step3RequirementsProps> {
  state = {
    requirementDisabled: false,
    windows: [],
    directX: [],
  };

  componentDidMount() {
    if (!this.props.formik.values.platforms?.find((platform) => platform.title.includes('PC'))) {
      this.setState({
        requirementDisabled: true,
      });
    }

    this.getAllWindows();
    this.getAllDirectX();
  }

  getAllWindows = () => {
    fetch(`/api/windows`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && !json.error) {
          this.setState({
            windows: json.items.map((item: WindowsData) => ({
              title: item.windows_name,
              value: item.windows_id,
            })),
          });
        }
      });
  };

  getAllDirectX = () => {
    fetch(`/api/directx`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && !json.error) {
          this.setState({
            directX: json.items.map((item: DirectXData) => ({
              title: item.directx_name,
              value: item.directx_id,
            })),
          });
        }
      });
  };

  render() {
    return (
      <Box mt={4}>
        <Grid container mt={2}>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 2 }} color={customColors.textLight}>
              Minimalne
            </Typography>
            <Box mb={3}>
              <TextField
                fullWidth
                id="cpuMin"
                name="cpuMin"
                label="Procesor"
                value={this.props.formik.values.cpuMin}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={this.props.formik.touched.cpuMin && Boolean(this.props.formik.errors.cpuMin)}
                helperText={this.props.formik.touched.cpuMin && this.props.formik.errors.cpuMin}
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="gpuMin"
                name="gpuMin"
                label="Karta graficzna"
                value={this.props.formik.values.gpuMin}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={this.props.formik.touched.gpuMin && Boolean(this.props.formik.errors.gpuMin)}
                helperText={this.props.formik.touched.gpuMin && this.props.formik.errors.gpuMin}
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="ramMin"
                name="ramMin"
                label="RAM"
                value={this.props.formik.values.ramMin}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={this.props.formik.touched.ramMin && Boolean(this.props.formik.errors.ramMin)}
                helperText={this.props.formik.touched.ramMin && this.props.formik.errors.ramMin}
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <Dropdown
                id="systemMin"
                label="System operacyjny"
                options={this.state.windows}
                value={this.props.formik.values.systemMin}
                handleChange={(value: DropdownOptionsData | null) => {
                  this.props.formik.setFieldValue('systemMin', value);
                }}
                error={
                  this.props.formik.touched.systemMin && Boolean(this.props.formik.errors.systemMin)
                }
                helperText={
                  this.props.formik.touched.systemMin && this.props.formik.errors.systemMin
                }
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <Dropdown
                id="directxMin"
                label="DirectX"
                options={this.state.directX}
                value={this.props.formik.values.directxMin}
                handleChange={(value: DropdownOptionsData | null) =>
                  this.props.formik.setFieldValue('directxMin', value)
                }
                error={
                  this.props.formik.touched.directxMin &&
                  Boolean(this.props.formik.errors.directxMin)
                }
                helperText={
                  this.props.formik.touched.directxMin && this.props.formik.errors.directxMin
                }
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="hddMin"
                name="hddMin"
                label="Miejsce na dysku"
                value={this.props.formik.values.hddMin}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={this.props.formik.touched.hddMin && Boolean(this.props.formik.errors.hddMin)}
                helperText={this.props.formik.touched.hddMin && this.props.formik.errors.hddMin}
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} pr={{ md: 1 }}>
            <Typography sx={{ mb: 2 }} color={customColors.textLight}>
              Rekomendowane
            </Typography>
            <Box mb={3}>
              <TextField
                fullWidth
                id="cpuReccomended"
                name="cpuReccomended"
                label="Procesor"
                value={this.props.formik.values.cpuReccomended}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={
                  this.props.formik.touched.cpuReccomended &&
                  Boolean(this.props.formik.errors.cpuReccomended)
                }
                helperText={
                  this.props.formik.touched.cpuReccomended &&
                  this.props.formik.errors.cpuReccomended
                }
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="gpuReccomended"
                name="gpuReccomended"
                label="Karta graficzna"
                value={this.props.formik.values.gpuReccomended}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={
                  this.props.formik.touched.gpuReccomended &&
                  Boolean(this.props.formik.errors.gpuReccomended)
                }
                helperText={
                  this.props.formik.touched.gpuReccomended &&
                  this.props.formik.errors.gpuReccomended
                }
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="ramReccomended"
                name="ramReccomended"
                label="RAM"
                value={this.props.formik.values.ramReccomended}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={
                  this.props.formik.touched.ramReccomended &&
                  Boolean(this.props.formik.errors.ramReccomended)
                }
                helperText={
                  this.props.formik.touched.ramReccomended &&
                  this.props.formik.errors.ramReccomended
                }
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <Dropdown
                id="systemReccomended"
                label="System operacyjny"
                options={this.state.windows}
                value={this.props.formik.values.systemReccomended}
                handleChange={(value: DropdownOptionsData | null) =>
                  this.props.formik.setFieldValue('systemReccomended', value)
                }
                error={
                  this.props.formik.touched.systemReccomended &&
                  Boolean(this.props.formik.errors.systemReccomended)
                }
                helperText={
                  this.props.formik.touched.systemReccomended &&
                  this.props.formik.errors.systemReccomended
                }
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <Dropdown
                id="directxReccomended"
                label="DirectX"
                options={this.state.directX}
                value={this.props.formik.values.directxReccomended}
                handleChange={(value: DropdownOptionsData | null) =>
                  this.props.formik.setFieldValue('directxReccomended', value)
                }
                error={
                  this.props.formik.touched.directxReccomended &&
                  Boolean(this.props.formik.errors.directxReccomended)
                }
                helperText={
                  this.props.formik.touched.directxReccomended &&
                  this.props.formik.errors.directxReccomended
                }
                disabled={this.state.requirementDisabled}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="hddReccomended"
                name="hddReccomended"
                label="Miejsce na dysku"
                value={this.props.formik.values.hddReccomended}
                onChange={this.props.formik.handleChange}
                onBlur={this.props.formik.handleBlur}
                error={
                  this.props.formik.touched.hddReccomended &&
                  Boolean(this.props.formik.errors.hddReccomended)
                }
                helperText={
                  this.props.formik.touched.hddReccomended &&
                  this.props.formik.errors.hddReccomended
                }
                variant="filled"
                disabled={this.state.requirementDisabled}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Step3Requirements;

import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Send } from '@mui/icons-material';
import { TextField } from '@material-ui/core';
import Modal from '../../../common/Modal';
import Dropdown from '../../../common/form/Dropdown';
import Checkbox from '../../../common/form/Checkbox';

// === Helpers === //
import * as utils from '../../../../utils';

// === Types === //
import { UserFunctionData } from '../../../../types/games';
import { DropdownOptionsData } from '../../../../types/forms';

interface StatusManageProps {
  funcData: UserFunctionData | null;
  modalOpen: boolean;
  handleCloseModal: Function;
  handleSubmit: Function;
}

class StatusManage extends Component<StatusManageProps> {
  state = {
    buttonLoading: false,
    status: null as DropdownOptionsData | null,
    statusDetail: null as DropdownOptionsData | null,
    favourite: false,
    hours: '',
    minutes: '',

    statusOptions: [
      { title: 'Nie grałem', value: 'notPlayed' },
      { title: 'Grałem', value: 'played' },
      { title: 'Pomijam', value: 'skip' },
      { title: 'Planuję', value: 'plan' },
    ],
    statusDetailOptions: [
      { title: 'Ukończyłem na 100%', value: '100p' },
      { title: 'Ukończyłem fabułę', value: 'story' },
      { title: 'Gra bez wyraźnego zakończenia', value: 'endless' },
      { title: 'Porzuciłem', value: 'dropped' },
    ],
  };

  componentDidMount() {
    if (this.props.funcData && this.props.funcData.status) {
      const totalMinutes = this.props.funcData.status.time;
      const hours = utils.minutesToHoursAndMinutes(totalMinutes).hours;
      const minutes = utils.minutesToHoursAndMinutes(totalMinutes).minutes;

      this.setState({
        status: this.state.statusOptions.find(
          (item) => item.value === this.props.funcData?.status?.status
        ),
        statusDetail: this.props.funcData?.status?.statusDetail
          ? this.state.statusDetailOptions.find(
              (item) => item.value === this.props.funcData?.status?.statusDetail
            )
          : null,
        favourite: this.props.funcData.status.favourite,
        hours: hours > 0 ? `${hours}` : '',
        minutes: minutes > 0 ? `${minutes}` : '',
      });
    }
  }

  handleButtonLoading = (value: boolean) => this.setState({ buttonLoading: value });

  render() {
    const { funcData, modalOpen, handleCloseModal, handleSubmit } = this.props;

    return (
      <Modal
        title={funcData && funcData.status ? 'Zmień status' : 'Ustaw status'}
        open={modalOpen}
        size="md"
        handleClose={() => handleCloseModal()}
      >
        <Box>
          <Box py={4} px={2}>
            <Box>
              <Dropdown
                id="status"
                label="Status"
                options={this.state.statusOptions}
                multiple={false}
                value={this.state.status}
                handleChange={(value: DropdownOptionsData | null) =>
                  this.setState({ status: value })
                }
              />
            </Box>
            <Box mt={2}>
              <Dropdown
                id="statusDetail"
                label="Dokładny status"
                options={this.state.statusDetailOptions}
                multiple={false}
                value={this.state.statusDetail}
                handleChange={(value: DropdownOptionsData | null) =>
                  this.setState({ statusDetail: value })
                }
                disabled={
                  !this.state.status || (this.state.status && this.state.status.value !== 'played')
                }
              />
            </Box>
            <Box mt={2}>
              <Grid container>
                <Grid item xs={12} md={6} pr={{ md: 1 }} mb={2}>
                  <TextField
                    fullWidth
                    id="hours"
                    name="hours"
                    label="Godziny"
                    value={this.state.hours}
                    onChange={(e) => this.setState({ hours: e.target.value })}
                    variant="filled"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6} pl={{ md: 1 }} mb={2}>
                  <TextField
                    fullWidth
                    id="minutes"
                    name="minutes"
                    label="Minuty"
                    value={this.state.minutes}
                    onChange={(e) => this.setState({ minutes: e.target.value })}
                    variant="filled"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Checkbox
                id="favourite"
                label="Ulubiona gra"
                value={this.state.favourite}
                handleChange={(value: boolean) => this.setState({ favourite: value })}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              type="button"
              color="error"
              variant="contained"
              onClick={() => handleCloseModal()}
              sx={{ marginRight: 2 }}
            >
              Zamknij
            </LoadingButton>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loadingPosition="end"
              loading={this.state.buttonLoading}
              endIcon={<Send />}
              onClick={() =>
                handleSubmit(this.handleButtonLoading, handleCloseModal, {
                  status: this.state.status,
                  statusDetail: this.state.statusDetail,
                  favourite: this.state.favourite,
                  hours: this.state.hours,
                  minutes: this.state.minutes,
                })
              }
            >
              Wyślij
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    );
  }
}

export default StatusManage;

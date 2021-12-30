import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import WindowsTable from './WindowsTable';
import WindowsCreateEdit from './WindowsCreateEdit';
import WindowsDelete from './WindowsDelete';

// === Types === //
import { WindowsData } from '../../../types/admin';

class WindowsTabView extends Component {
  state = {
    list: [],
    totalCount: 0,
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetAllWindows();
  }

  handleGetAllWindows = () => {
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
            list: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleOpenEditModal = (item: WindowsData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: WindowsData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Box>
        <Box textAlign="right">
          <LoadingButton
            type="button"
            color="primary"
            variant="contained"
            startIcon={<Add />}
            onClick={() => this.setState({ createEditOpen: true })}
          >
            Dodaj Windows
          </LoadingButton>
        </Box>
        <Box py={2}>
          <WindowsTable
            items={this.state.list}
            handleOpenEditModal={(item: WindowsData) => this.handleOpenEditModal(item)}
            handleOpenDeleteModal={(item: WindowsData) => this.handleOpenDeleteModal(item)}
          />
        </Box>

        <WindowsCreateEdit
          editItem={this.state.editItem}
          open={this.state.createEditOpen}
          handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
          handleReloadData={this.handleGetAllWindows}
        />

        <WindowsDelete
          editItem={this.state.editItem}
          open={this.state.deleteOpen}
          handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
          handleReloadData={this.handleGetAllWindows}
        />
      </Box>
    );
  }
}

export default WindowsTabView;

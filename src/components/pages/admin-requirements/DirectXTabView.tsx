import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import DirectXTable from './DirectXTable';
import DirectXCreateEdit from './DirectXCreateEdit';
import DirectXDelete from './DirectXDelete';

// === Types === //
import { DirectXData } from '../../../types/admin';

class DirectXTabView extends Component {
  state = {
    list: [],
    totalCount: 0,
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetAllDirectX();
  }

  handleGetAllDirectX = () => {
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
            list: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleOpenEditModal = (item: DirectXData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: DirectXData) => {
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
            Dodaj DirectX
          </LoadingButton>
        </Box>
        <Box py={2}>
          <DirectXTable
            items={this.state.list}
            handleOpenEditModal={(item: DirectXData) => this.handleOpenEditModal(item)}
            handleOpenDeleteModal={(item: DirectXData) => this.handleOpenDeleteModal(item)}
          />
        </Box>

        <DirectXCreateEdit
          editItem={this.state.editItem}
          open={this.state.createEditOpen}
          handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
          handleReloadData={this.handleGetAllDirectX}
        />

        <DirectXDelete
          editItem={this.state.editItem}
          open={this.state.deleteOpen}
          handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
          handleReloadData={this.handleGetAllDirectX}
        />
      </Box>
    );
  }
}

export default DirectXTabView;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// === Components === //
import Cropper from 'react-easy-crop';
import { Box } from '@mui/system';
import { colors, FormLabel, Slider, useMediaQuery, useTheme } from '@mui/material';
import InputFile from './InputFile';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { CroppedAreaData } from '../../../types/images';

interface ImageCropperProps {
  label: string;
  imageSrc: string;
  zoom: number;
  rotation: number;
  width: number;
  height: number;
  onZoomChange: Function | any;
  onRotationChange: Function | any;
  onPreviewUpdate: Function;
  onSelectFile: Function;
}

const ImageCropper = ({
  label,
  imageSrc,
  zoom,
  rotation,
  width,
  height,
  onZoomChange,
  onRotationChange,
  onPreviewUpdate,
  onSelectFile,
}: ImageCropperProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };
  const onCropComplete = (croppedArea: CroppedAreaData, croppedAreaPixels: CroppedAreaData) => {
    onPreviewUpdate(croppedAreaPixels);
  };

  return (
    <>
      <Box mb={2}>
        <FormLabel component="legend" sx={{ color: customColors.textLight }}>
          {label}
        </FormLabel>
      </Box>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        <Box flex={1} mr={4}>
          <Box mb={2} maxWidth={300}>
            <InputFile
              label="Wybierz obrazek"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelectFile(e)}
            />
          </Box>
          <Box display="flex" alignItems="center" mb={isMobile ? 0 : 2}>
            <FormLabel component="legend" sx={{ width: 120, color: customColors.textLight }}>
              Zoom
            </FormLabel>
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              aria-label="zoom"
              onChange={(e, value) => onZoomChange(value)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <FormLabel component="legend" sx={{ width: 120, color: customColors.textLight }}>
              Rotacja
            </FormLabel>
            <Slider
              min={0}
              max={360}
              step={1}
              value={rotation}
              aria-label="rotation"
              onChange={(e, value) => onRotationChange(value)}
            />
          </Box>
        </Box>
        <Box
          position="relative"
          width={width}
          height={height}
          sx={{ backgroundColor: colors.grey[700] }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            cropSize={{ width, height }}
            zoom={zoom}
            rotation={rotation}
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ImageCropper;

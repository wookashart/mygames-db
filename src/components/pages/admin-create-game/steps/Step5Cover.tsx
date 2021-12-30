import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import ImageCropper from '../../../common/form/ImageCropper';

interface Step5CoverProps {
  imageSrc: string;
  zoom: number;
  rotation: number;
  onZoomChange: Function;
  onRotationChange: Function;
  onPreviewUpdate: Function;
  onSelectFile: Function;
}

const Step5Cover = ({
  imageSrc,
  zoom,
  rotation,
  onPreviewUpdate,
  onSelectFile,
  onZoomChange,
  onRotationChange,
}: Step5CoverProps) => {
  return (
    <Box mt={4}>
      <ImageCropper
        label="Okładka"
        width={300}
        height={415}
        imageSrc={imageSrc}
        zoom={zoom}
        rotation={rotation}
        onZoomChange={(zoom: number) => onZoomChange(zoom)}
        onRotationChange={(zoom: number) => onRotationChange(zoom)}
        onPreviewUpdate={onPreviewUpdate}
        onSelectFile={onSelectFile}
      />
    </Box>
  );
};

export default Step5Cover;

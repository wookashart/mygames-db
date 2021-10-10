import React from 'react';
import dynamic from 'next/dynamic';

// === Components === //
import { Box } from '@mui/system';
import { colors, FormLabel, Skeleton } from '@mui/material';

// === Styles === //
import { customColors } from '../../../styles/variables';

interface WysiwigProps {
  value: string;
  label: string;
  onChange: Function;
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={57} />,
});

const modules = {
  toolbar: [
    [
      { header: '1' },
      { header: '2' },
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      { script: 'sub' },
      { script: 'super' },
      { list: 'ordered' },
      { list: 'bullet' },
      { direction: 'rtl' },
      { align: [] },
      'link',
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'list',
  'bullet',
  'direction',
  'align',
  'link',
];

const Wysiwig = ({ value, label, onChange }: WysiwigProps) => {
  return (
    <>
      <Box mb={2}>
        <FormLabel component="legend">{label}</FormLabel>
      </Box>
      <Box>
        <QuillNoSSRWrapper
          theme="snow"
          className="custom-richTextEditor"
          modules={modules}
          formats={formats}
          value={value}
          onChange={(value: string) => onChange(value)}
        />
      </Box>

      <style jsx global>{`
        .custom-richTextEditor .ql-toolbar {
          border: none;
          background-color: ${colors.blue[700]};
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          padding: 0;
        }

        .custom-richTextEditor .ql-toolbar .ql-formats button {
          background-color: ${colors.blue[700]};
          width: 32px;
          height: 32px;
          padding: 7px;
          border-radius: 4px;
        }

        .custom-richTextEditor .ql-toolbar .ql-formats button:hover,
        .custom-richTextEditor .ql-toolbar .ql-formats .ql-picker-label:hover {
          background-color: ${colors.blue[800]};
        }

        .custom-richTextEditor .ql-toolbar .ql-formats button.ql-active {
          background-color: ${colors.blue[800]};
        }

        .custom-richTextEditor .ql-toolbar .ql-formats button svg .ql-fill {
          fill: white;
        }
        .custom-richTextEditor .ql-toolbar .ql-formats button svg .ql-stroke,
        .custom-richTextEditor .ql-toolbar .ql-formats .ql-picker-label svg .ql-stroke {
          stroke: white;
        }

        .custom-richTextEditor .ql-toolbar .ql-formats .ql-picker {
          width: 32px;
          height: 32px;
          padding: 0;
        }
        .custom-richTextEditor .ql-toolbar .ql-formats .ql-picker-label {
          border: none;
          padding: 7px;
          color: white;
        }

        .custom-richTextEditor .ql-toolbar .ql-formats {
          margin: 0;
        }

        .custom-richTextEditor .ql-container {
          border: none;
          background-color: ${colors.grey[700]};
          font-size: 16px;
          color: ${customColors.textLight};
          transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        }

        .custom-richTextEditor .ql-container::before {
          left: 0;
          right: 0;
          bottom: 0;
          content: '';
          position: absolute;
          transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-bottom: 1px solid rgba(255, 255, 255, 0.7);
          pointer-events: none;
        }
        .custom-richTextEditor .ql-container::after {
          left: 0;
          right: 0;
          bottom: 0;
          content: '';
          position: absolute;
          transform: scaleX(0);
          transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          border-bottom: 2px solid #2196f3;
          pointer-events: none;
        }

        .custom-richTextEditor .ql-editor {
          background-color: rgba(0, 0, 0, 0.09);
          padding: 18px 12px 17px;
          transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        }

        .custom-richTextEditor .ql-container:hover {
          background-color: transparent;
        }
        .custom-richTextEditor .ql-container:hover .ql-editor {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .custom-richTextEditor .ql-editor::before {
          color: ${customColors.textLight};
          font-style: normal;
        }
      `}</style>
    </>
  );
};

export default Wysiwig;

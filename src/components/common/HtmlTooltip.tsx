import React from 'react';

// === Components === //
import ReactHtmlParser from 'react-html-parser';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

// === Styles === //
import { styled } from '@mui/material/styles';
import { colors } from '@mui/material';

interface CustomTooltipProps {
  children: React.ReactElement;
  label: string;
  placement:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
    | undefined;
}

const CustomTooltip = ({ children, label, placement }: CustomTooltipProps) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement={placement} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colors.grey[500],
      color: colors.grey[900],
      maxWidth: 320,
      fontSize: theme.typography.pxToRem(12),
    },
  }));

  return (
    <HtmlTooltip title={label && label !== '' ? <>{ReactHtmlParser(label)}</> : ''}>
      {children}
    </HtmlTooltip>
  );
};

export default CustomTooltip;

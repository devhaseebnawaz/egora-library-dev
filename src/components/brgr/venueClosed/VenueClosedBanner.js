import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';

// Notice shown across the store while the selected venue is outside its opening hours.
export default function VenueClosedBanner({ status, sticky = false, sx }) {
  if (!status || status.isOpen || !status.message) return null;

  return (
    <Alert
      severity="warning"
      role="status"
      sx={{
        borderRadius: 0,
        justifyContent: 'center',
        ...(sticky && { position: 'sticky', top: 0, zIndex: 1200 }),
        ...sx,
      }}
    >
      <AlertTitle sx={{ mb: 0.25 }}>Venue closed</AlertTitle>
      {status.message}
    </Alert>
  );
}

VenueClosedBanner.propTypes = {
  status: PropTypes.object,
  sticky: PropTypes.bool,
  sx: PropTypes.object,
};

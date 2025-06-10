import { Typography, Box, useTheme } from "@mui/material";

const SalesTracker = ({ icon, title, number, profit }) => {
  const theme = useTheme();
  return (
    <Box className="salesTrackerBox" padding={5}>
        {icon}
      <Typography fontSize={24} fontWeight={600} color="white">
        {number}
      </Typography>
      <Typography fontSize={14} fontWeight={200} color="darkgray" sx={{ m: "0 0 20px 0" }}>
        {title}
      </Typography>
      <Typography fontSize={10} fontWeight={200} sx={{ m: "0 0 20px 0" }}>
        {profit}
      </Typography>
    </Box>
  );
};

export default SalesTracker;
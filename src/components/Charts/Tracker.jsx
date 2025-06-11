import { Typography, Box, useTheme } from "@mui/material";

const Tracker = ({ title, number }) => {
  const theme = useTheme();
  return (
    <Box className="trackerBox" padding={5}>
      <Typography fontSize={18} fontWeight={200} color="gray" sx={{ m: "0 0 20px 0" }}
      >
        {title}
      </Typography>
      <Typography fontSize={36} fontWeight={600} color="aqua">
        {number}
      </Typography>
    </Box>
  );
};

export default Tracker;
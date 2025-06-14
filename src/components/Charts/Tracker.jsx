import { AccountBox } from "@mui/icons-material";
import { Typography, Box, useTheme } from "@mui/material";

const Tracker = ({ icon, title, number }) => {
  const theme = useTheme();
  return (
    <Box className="trackerBox" padding={5}>
      <div className="folder" style={{display: 'flex', justifyContent: 'end', overflow: 'hidden'}}>
        {icon}
        <Typography fontSize={36} fontWeight={600} maxWidth='80%' color="cadetblue" sx={{ m: "20px 20px 0 0" }} zIndex={-10} position="absolute" style={{overflowWrap: 'break-word'}}>
          {number}
        </Typography>
      </div>
      <Typography fontSize={18} fontWeight={600} color="black" sx={{ m: "0 0 50px 0", p: '5px' }} 
                  boxShadow='0 0px 4px rgba(0,0,0,0.5)'>
        {title}
      </Typography>
    </Box>
  );
};

export default Tracker;
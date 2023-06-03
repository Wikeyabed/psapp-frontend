import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import {
  Box,
  Typography,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from "@mui/material";

const AcordMenu = styled(Accordion)({
  boxShadow: "none !important",
  background: "transparent !important",
  "&:before": {
    background: "transparent",
  },
});

const AcordItem = styled(AccordionSummary)({
  background: "transparent",
  background: "transparent !important",
});
export default function CategoryBar() {
  return (
    <Box>
      <AcordMenu>
        <AcordItem
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body2">کارتن پستی</Typography>
        </AcordItem>

        <AccordionDetails>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </AccordionDetails>
      </AcordMenu>

      <AcordMenu>
        <AcordItem
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body2">کارتن استوک</Typography>
        </AcordItem>

        <AccordionDetails>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </AccordionDetails>
      </AcordMenu>
      <AcordMenu>
        <AcordItem
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body2">وسایل اسباب کشی</Typography>
        </AcordItem>

        <AccordionDetails>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </AccordionDetails>
      </AcordMenu>
    </Box>
  );
}

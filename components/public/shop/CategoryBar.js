import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { Box, Typography, AccordionSummary, Accordion } from "@mui/material";

const AcordMenu = styled(Accordion)({
  backgroundColor: "transparent",
  boxShadow: "none !important",
});

const AcordItem = styled(AccordionSummary)({
  boxShadow: "none !important",
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
          <Typography>Accordion 1</Typography>
        </AcordItem>
      </AcordMenu>
      <AcordMenu>
        <AcordItem
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AcordItem>
      </AcordMenu>
      <AcordMenu>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </AcordMenu>
    </Box>
  );
}

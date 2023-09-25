import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import {
  Filter1Outlined,
  Filter2Outlined,
  Filter3,
  FilterAlt,
} from "@mui/icons-material";
import FilterBar from "./FilterBar";

export default function MobileFilterBar() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
      }}
    >
      <Accordion
        square
        sx={{
          backgroundColor: "primary.textWhite",
          direction: "rtl !important",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Button
            endIcon={
              <FilterAlt
                sx={{
                  fontSize: "25px !important",
                  mx: 2,
                }}
              />
            }
            variant="text"
          >
            <Typography variant="body2">فیلتر</Typography>
          </Button>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "primary.textWhite" }}>
          <FilterBar />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

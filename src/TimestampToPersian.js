import moment from "moment-jalaali";
import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";

function ToPersianDate({ timestamp }) {
  moment.loadPersian({ usePersianDigits: true });
  let m = moment.unix(timestamp);
  let date = m.format("jYYYY/jMM/jDD");
  let time = m.format("HH:mm");

  return (
    <>
      <ButtonGroup
        size="small"
        color="lightPrimary"
        sx={{ direction: "ltr !important", bgcolor: "primary" }}
      >
        <Button startIcon={<CalendarMonth fontSize="small" />} variant="text">
          {date}
        </Button>

        <Button startIcon={<AccessTime fontSize="small" />} variant="text">
          {time}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ToPersianDate;

import moment from "moment-jalaali";
import { AccessTime, CalendarMonth } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import * as React from "react";

function ToPersianDate({ timestamp }) {
  moment.loadPersian({ usePersianDigits: true });
  let m = moment.unix(timestamp);
  let date = m.format("jYYYY/jMM/jDD");
  let time = m.format("HH:mm");

  return (
    <div>
      <ButtonGroup
        size="small"
        color="primary"
        sx={{
          direction: "ltr !important",
          p: 1,
        }}
      >
        <Typography
          sx={{
            mr: 1,
          }}
          variant="caption"
          color={"primary"}
        >
          {date}
        </Typography>

        <Typography variant="caption" color={"secondary"}>
          {time}
        </Typography>
      </ButtonGroup>
    </div>
  );
}

export default ToPersianDate;

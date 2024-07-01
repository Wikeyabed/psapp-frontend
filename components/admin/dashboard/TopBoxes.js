import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TollIcon from "@mui/icons-material/Toll";
import { useState, useEffect } from "react";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Grid, Box, Paper, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  minHeight: 160,
  position: "relative",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

const iconStyle = {
  fontSize: 35,
  color: "#fff",
};

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 15,
  left: 15,
  width: 56,
  height: 56,
  cursor: "pointer",
  paddingTop: 10,
  transition: ".3s ease all",
  ":hover": {
    transform: "scale(1.1)",
  },
  borderRadius: "50%",
  textAlign: "center",
}));

const Text = styled(Typography)(({ theme }) => ({
  color: "#9f9f9f",
}));

const TextInfo = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: 25,
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

function TopBoxes({ users, orders, products }) {
  const [date, setDate] = useState({
    incomeStart: "0",
    incomeEnd: "0",
    userStart: "0",
    userEnd: "0",
    productStart: "0",
    productEnd: "0",
    orderStart: "0",
    orderEnd: "0",
  });

  const [filteredData, setFilteredData] = useState({
    income: null,
    user: null,
    product: null,
    order: null,
  });
  const [allIncome, setAllIncome] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const [monthlyUsers, setMonthlyUsers] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  useEffect(() => {
    getAllIncome();
    getMonthlyIncome();
    getDailyIncome();

    // users

    getAllUsers();
    getMonthlyUsers();
    getDailyUsers();

    // orders
    getAllOrders();
    getMonthlyOrders();
    getDailyOrders();
  }, []);

  function handleDate(value, props) {
    console.log(moment.unix(value.unix).format("jYYYY/jMM/jDD HH:mm"));
    setDate({
      ...date,
      [props.input.name]: value.unix,
    });
  }

  const finishedOrders = orders.filter((order) => {
    return order.status == "200";
  });

  const handleFilter = (start, end, array, dateField, name) => {
    let value = 0;
    const filteredArray = array.filter((item) => {
      return start < item[dateField] && item[dateField] < end;
    });
    if (name == "income") {
      filteredArray.map((item) => {
        value += item.finished_price * 1;
        setFilteredData({
          ...filteredData,
          [name]: persianNumber(value),
        });
      });
    } else {
      value = filteredArray.length + 1;

      setFilteredData({
        ...filteredData,
        [name]: persianNumber(value),
      });
    }
  };

  const getAllIncome = () => {
    let allPrice = 0;
    finishedOrders.map((order) => {
      allPrice += order.finished_price * 1;
    });
    setAllIncome(allPrice);

    console.log("current hour", moment());
    console.log(
      "subtract",
      moment()
        .subtract(moment().hour(), "hours")
        .subtract(moment().minute(), "minutes")
        .format("HH:mm")
    );
  };

  const getMonthlyIncome = () => {
    const lastMonth = moment()
      .subtract(moment().day() + 2, "days")
      .subtract(moment().hours(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")

      .unix();

    console.log("last month date ", lastMonth);

    const lastMonthOrders = finishedOrders.filter((order) => {
      return order.order_date >= lastMonth;
    });

    let allPrice = 0;
    lastMonthOrders.map((order) => {
      allPrice += order.finished_price * 1;
    });
    setMonthlyIncome(allPrice);
  };

  const getDailyIncome = () => {
    const hourOfTwilight = moment()
      .subtract(moment().hour(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")
      .unix();
    const lastDayOrders = finishedOrders.filter((order) => {
      return order.order_date >= hourOfTwilight;
    });

    let allPrice = 0;
    lastDayOrders.map((order) => {
      allPrice += order.finished_price * 1;
    });
    setDailyIncome(allPrice);
  };

  // users

  const getAllUsers = () => {
    setAllUsers(users.length);
  };

  const getMonthlyUsers = () => {
    const lastMonth = moment()
      .subtract(moment().day() + 2, "days")
      .subtract(moment().hours(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")

      .unix();

    const lastMonthUsers = users.filter((user) => {
      return user.register_date >= lastMonth;
    });

    setMonthlyUsers(lastMonthUsers.length);
  };

  const getDailyUsers = () => {
    const hourOfTwilight = moment()
      .subtract(moment().hour(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")
      .unix();

    const lastDayUsers = users.filter((user) => {
      return user.register_date >= hourOfTwilight;
    });

    setDailyUsers(lastDayUsers.length);
  };

  // orders

  const getAllOrders = () => {
    setAllOrders(orders.length);
  };

  const getMonthlyOrders = () => {
    const lastMonth = moment()
      .subtract(moment().day() + 2, "days")
      .subtract(moment().hours(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")

      .unix();

    const lastMonthOrders = orders.filter((order) => {
      return order.order_date >= lastMonth;
    });

    setMonthlyOrders(lastMonthOrders.length);
  };

  const getDailyOrders = () => {
    const hourOfTwilight = moment()
      .subtract(moment().hour(), "hours")
      .subtract(moment().minute(), "minutes")
      .subtract(moment().second(), "seconds")
      .unix();

    const lastDayOrders = orders.filter((order) => {
      return order.order_date >= hourOfTwilight;
    });

    setDailyOrders(lastDayOrders.length);
  };

  return (
    <>
      <Grid xs={12}>
        {" "}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            py: 2,
            mb: 2,
          }}
        >
          آمار
        </Typography>{" "}
      </Grid>

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            درآمد کل
          </Text>

          <TextInfo variant="body1">
            {persianNumber(allIncome)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              ریال
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            درآمد ماهانه
          </Text>

          <TextInfo variant="body1">
            {" "}
            {persianNumber(monthlyIncome)}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              ریال
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            درآمد روزانه
          </Text>

          <TextInfo variant="body1">
            {persianNumber(dailyIncome)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              ریال
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <Grid
        item
        container
        xs={12}
        sx={{
          borderBottom: "1px solid #e2e2e2",
          pb: 2,
          mb: 2,
        }}
      >
        <CardContainer item xs={12} md={4}>
          <DatePicker
            name="incomeStart"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            plugins={[
              <TimePicker mStep={30} key={1} hideSeconds position="bottom" />,
            ]}
            maxDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)}
            defaultValue={Date.now()}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ شروع"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>
        <CardContainer item xs={12} md={4}>
          <DatePicker
            disabled={date.incomeStart == "0"}
            name="incomeEnd"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            minDate={new Date(date.incomeStart + 24 * 60 * 60 * 1000)}
            plugins={[
              <TimePicker mStep={30} key={2} hideSeconds position="bottom" />,
            ]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ پایان"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>

        <CardContainer item xs={12} md={4}>
          <Button
            onClick={() =>
              handleFilter(
                date.incomeStart,
                date.incomeEnd,
                finishedOrders,
                "order_date",
                "income"
              )
            }
            sx={{
              mt: "1px",
            }}
            variant="contained"
            fullWidth
            size="large"
          >
            اعمال فیلتر
          </Button>
        </CardContainer>

        <CardContainer item xs={12}>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {filteredData.income}
            {filteredData.income != null ? (
              <span
                style={{
                  color: "red",
                  marginRight: "5px",
                  marginTop: "20px",
                  fontSize: 12,
                }}
              >
                ریال
              </span>
            ) : (
              ""
            )}
          </Typography>
        </CardContainer>
      </Grid>

      {/* Poroducts  */}

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            کل کاربران
          </Text>

          <TextInfo variant="body1">
            {persianNumber(allUsers)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              نفر{" "}
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            کاربران ماهانه
          </Text>

          <TextInfo variant="body1">
            {" "}
            {persianNumber(monthlyUsers)}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              نفر{" "}
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            کاربران روزانه
          </Text>

          <TextInfo variant="body1">
            {persianNumber(dailyUsers)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              نفر
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <Grid
        item
        container
        xs={12}
        sx={{
          borderBottom: "1px solid #e2e2e2",
          pb: 2,
          mb: 2,
        }}
      >
        <CardContainer item xs={12} md={4}>
          <DatePicker
            name="userStart"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            plugins={[
              <TimePicker mStep={30} key={3} hideSeconds position="bottom" />,
            ]}
            maxDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)}
            defaultValue={Date.now()}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ شروع"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>
        <CardContainer item xs={12} md={4}>
          <DatePicker
            disabled={date.userStart == "0"}
            name="userEnd"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            minDate={new Date(date.userStart + 24 * 60 * 60 * 1000)}
            plugins={[
              <TimePicker mStep={30} key={4} hideSeconds position="bottom" />,
            ]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ پایان"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>

        <CardContainer item xs={12} md={4}>
          <Button
            onClick={() =>
              handleFilter(
                date.userStart,
                date.userEnd,
                users,
                "register_date",
                "user"
              )
            }
            sx={{
              mt: "1px",
            }}
            variant="contained"
            fullWidth
            size="large"
          >
            اعمال فیلتر
          </Button>
        </CardContainer>

        <CardContainer item xs={12}>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {filteredData.user}
            {filteredData.user != null ? (
              <span
                style={{
                  color: "red",
                  marginRight: "5px",
                  marginTop: "20px",
                  fontSize: 12,
                }}
              >
                نفر
              </span>
            ) : (
              ""
            )}
          </Typography>
        </CardContainer>
      </Grid>

      {/* orders */}

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            کل سفارشات
          </Text>

          <TextInfo variant="body1">
            {persianNumber(allOrders)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              عدد{" "}
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>

      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            سفارشات ماهانه
          </Text>

          <TextInfo variant="body1">
            {" "}
            {persianNumber(monthlyOrders)}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              عدد{" "}
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={4}>
        <DashboardCard>
          <Text
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            سفارشات روزانه
          </Text>

          <TextInfo variant="body1">
            {persianNumber(dailyOrders)}{" "}
            <span
              style={{
                color: "red",
                marginRight: "5px",
                marginTop: "20px",
                fontSize: 12,
              }}
            >
              عدد{" "}
            </span>
          </TextInfo>
        </DashboardCard>
      </CardContainer>
      <Grid
        item
        container
        xs={12}
        sx={{
          borderBottom: "1px solid #e2e2e2",
          pb: 2,
          mb: 2,
        }}
      >
        <CardContainer item xs={12} md={4}>
          <DatePicker
            name="orderStart"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            plugins={[
              <TimePicker mStep={30} key={3} hideSeconds position="bottom" />,
            ]}
            maxDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)}
            defaultValue={Date.now()}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ شروع"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>
        <CardContainer item xs={12} md={4}>
          <DatePicker
            disabled={date.orderStart == "0"}
            name="orderEnd"
            style={{
              textAlign: "center !important",
              padding: "20px 15px",
            }}
            minDate={new Date(date.orderStart + 24 * 60 * 60 * 1000)}
            plugins={[
              <TimePicker mStep={30} key={4} hideSeconds position="bottom" />,
            ]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={handleDate}
            placeholder={"تاریخ پایان"}
            format="MM/DD/YYYY HH:mm"
          />
        </CardContainer>

        <CardContainer item xs={12} md={4}>
          <Button
            onClick={() =>
              handleFilter(
                date.orderStart,
                date.orderEnd,
                orders,
                "order_date",
                "order"
              )
            }
            sx={{
              mt: "1px",
            }}
            variant="contained"
            fullWidth
            size="large"
          >
            اعمال فیلتر
          </Button>
        </CardContainer>

        <CardContainer item xs={12}>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {filteredData.order}
            {filteredData.order != null ? (
              <span
                style={{
                  color: "red",
                  marginRight: "5px",
                  marginTop: "20px",
                  fontSize: 12,
                }}
              >
                عدد{" "}
              </span>
            ) : (
              ""
            )}
          </Typography>
        </CardContainer>
      </Grid>
    </>
  );
}

export default TopBoxes;

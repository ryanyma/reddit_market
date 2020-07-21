import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";

import {
  Avatar,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Checkbox,
  Radio,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CustomTextField from "../components/CustomTextField";
import CustomCard from "../components/CustomCard";

const useStyles = makeStyles((theme) => ({
  borderQuery: {
    [`& fieldset`]: {
      borderRadius: "5px 0px 0px 5px",
    },
  },
  borderSub: {
    [`& fieldset`]: {
      borderRadius: "0px 5px 5px 0px",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  chip: {
    marginRight: theme.spacing(2),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1),
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
  },
  searchGrid: {
    marginTop: theme.spacing(4),
    verticalAlign: "middle",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const CustomButton = styled(Button)`
  background-color: white;
`;

const BuyingChip = styled(Chip)`
  background-color: #a436fc;
`;
const SellingChip = styled(Chip)`
  background-color: #5e98e4;
`;
const SoldChip = styled(Chip)`
  background-color: #d53631;
`;
const TradingChip = styled(Chip)`
  background-color: #f1b512;
`;

const handleColor = (flairText) => {
  if (flairText === "Buying") {
    console.log("hiii");
    return "classes.buying";
  }
  // } else if (flairText === "Selling") {

  // } else if (flairText === "Trading") {

  // } else if (flairText === "Sold") {

  // } else {

  // }
};

const FillForm = () => {
  const [result, setResult] = useState([]);
  useEffect(() => console.log(result), [result]);
  const history = useHistory();
  const classes = useStyles();
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          keywords: "",
          subreddit: "",
          // isTall: false,
          // cookies: [],
          // yogurt: "",
          // pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }],
        }}
        // validate={values => {
        //   const errors: Record<string, string> = {};

        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob";
        //   }

        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log(values);
          setTimeout(async () => {
            const url = `http://localhost:5000/search/submission/?q=${values.keywords}&subreddit=${values.subreddit}`;
            console.log(url);
            axios.get(url).then((res) => {
              if (res.status === 200) {
                setSubmitting(false);
                console.log(res.data);
                setResult(res.data);
                console.log(result);
              }
            });
            console.log(result);
            // const response = await registerUser({
            //   variables: {
            //     username: values.username,
            //     email: values.email,
            //     password: values.password,
            //   },
            // });
            // const { ok, errors } = response.data.register;
            // console.log(errors);
            // if (ok) {
            //   setOpen(false);
            //   setSubmitting(false);
            //   history.push('/login');
            // } else {
            //   setFieldError('general', errors[0].message);
            //   setOpen(true);
            //   setSubmitting(false);
            //   setTimeout(() => {
            //     setOpen(false);
            //   }, 5000);
            // }
            // console.log(response);
          }, 400);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Grid className={classes.searchGrid} container spacing={3}>
              <CustomTextField
                className={classes.borderQuery}
                placeholder="Keywords"
                name="keywords"
              />
              <CustomTextField
                className={classes.borderSub}
                placeholder="Subreddit"
                name="subreddit"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Search
              </Button>
            </Grid>

            {/* <Field name="isTall" type="checkbox" as={Checkbox} /> */}
            {/* <div>cookies:</div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="snickerdoodle"
              as={Checkbox}
            />
            <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} /> */}
            {/* <div>yogurt</div> */}

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>

      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {result.map(
            ({ author, created, url, flair_text, id, score, title }) => (
              <Grid item key={id} xs={12}>
                <Card className={classes.card}>
                  {/* <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                /> */}
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {author[0]}
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={author}
                    subheader={moment.unix(created).format("YYYY-MM-DD h:mm a")}
                  />

                  <Divider />
                  <CardContent className={classes.cardContent}>
                    <div className={classes.chips}>
                      {flair_text && flair_text === "Buying" && (
                        <BuyingChip size="small" label={flair_text} />
                      )}
                      {flair_text && flair_text === "Selling" && (
                        <SellingChip size="small" label={flair_text} />
                      )}
                      {flair_text && flair_text === "Trading" && (
                        <TradingChip size="small" label={flair_text} />
                      )}
                      {flair_text && flair_text === "Sold" && (
                        <SoldChip size="small" label={flair_text} />
                      )}
                      <Chip
                        size="small"
                        label={
                          score > 1 || score === 0
                            ? score + " pts"
                            : score + " pt"
                        }
                        color="primary"
                        style={{ backgroundColor: "#75AAFA" }}
                      />
                    </div>
                    <Typography>{title}</Typography>
                  </CardContent>
                  <CardActions>
                    <a
                      href={url}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined">Go to Link</Button>
                    </a>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default FillForm;

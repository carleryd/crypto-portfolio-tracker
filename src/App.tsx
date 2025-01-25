import { Grid2 as Grid, styled } from "@mui/material";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const App = () => {
  return <Stuff>Hello</Stuff>;
};

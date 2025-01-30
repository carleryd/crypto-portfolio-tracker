import { Box, Grid2 as Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export const PageWrapper = ({ children }: Props) => (
  <Box
    minHeight="100vh"
    minWidth="100vw"
    sx={{
      backgroundColor: "background.default",
    }}
  >
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      paddingX={{
        xs: 1,
        sm: 2,
        md: 4,
      }}
      paddingY={4}
      spacing={5}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        borderRadius={8}
        bgcolor="white"
        padding={2}
      >
        {children}
      </Grid>
    </Grid>
  </Box>
);

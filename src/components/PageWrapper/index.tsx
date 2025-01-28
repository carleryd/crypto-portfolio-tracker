import { Box, Container, Grid2 as Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export const PageWrapper = ({ children }: Props) => (
  <Box
    minHeight="100vh"
    minWidth="100vw"
    sx={{
      backgroundColor: "primary.main",
    }}
  >
    <Container maxWidth="lg">
      <Grid
        container
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
          width="100%"
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

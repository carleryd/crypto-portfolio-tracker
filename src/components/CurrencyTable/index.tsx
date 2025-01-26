import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

// TODO: How to handle localstorage vs component type?
// Probably should have a conversion because localstorage is not
// easy to migrate
type Currency = {
  assetId: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number | null;
  totalValue: number | null;
};

type Props = {
  currencies: Currency[];
};

export const CurrencyTable: FC<Props> = ({ currencies }) => {
  // const { test } = useWalletState();
  const [isFetching] = useState(false);

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid container>
          <Grid>
            <Typography variant="h4">Incoming Payments</Typography>
          </Grid>
          <Grid>
            <Tooltip title="Transactions associated with your wallet address are fetched periodically. Incoming transactions will be displayed below as they are discovered on-chain.">
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container paddingRight={1}>
          <CircularProgress
            size={25}
            sx={{
              visibility: isFetching ? "visible" : "hidden",
            }}
          />
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Name
              </TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No currencies
                </TableCell>
              </TableRow>
            ) : (
              currencies.map((currency, index) => (
                <TableRow key={index}>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>{currency.quantity}</TableCell>
                  <TableCell>{currency.price || "-"}</TableCell>
                  <TableCell>{currency.totalValue || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

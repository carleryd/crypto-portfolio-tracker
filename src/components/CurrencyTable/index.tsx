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

// import { useWalletState } from "@/context/WalletState";

// TODO: How to handle localstorage vs component type?
// Probably should have a conversion because localstorage is not
// easy to migrate
type Currency = {
  assetId: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  totalValue: number;
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
                Tx id
              </TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Explorer</TableCell>
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
                  <TableCell>
                    {currency.name} {currency.symbol} {currency.quantity}{" "}
                    {currency.price} {currency.totalValue}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

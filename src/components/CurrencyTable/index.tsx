import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

import { formatAssetAmount } from "@/utils/index";

import { HoverableTableCell } from "./components/TableCell";

type Currency = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number | null;
  totalValue: number | null;
};

type Props = {
  currencies: Currency[];
  onClickTableRow: (currency: Currency) => void;
};

export const CurrencyTable: FC<Props> = ({ currencies, onClickTableRow }) => {
  const [isFetching] = useState(false);

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container>
          <Grid marginTop={1.5} marginBottom={3}>
            <Typography variant="h3">Portfolio</Typography>
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
              <TableCell>Name</TableCell>
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
                <TableRow
                  component="tr"
                  key={index}
                  hover={true}
                  onClick={() => onClickTableRow(currency)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <HoverableTableCell label={currency.quantity.toString()} />
                  <HoverableTableCell
                    label={currency.price?.toString() || "-"}
                  />
                  <HoverableTableCell
                    label={
                      currency.totalValue
                        ? formatAssetAmount(currency.totalValue)
                        : "-"
                    }
                  />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

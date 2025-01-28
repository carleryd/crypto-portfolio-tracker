import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

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

export const CurrencyTable: FC<Props> = ({ currencies, onClickTableRow }) => (
  <Box>
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
                <HoverableTableCell label={currency.price?.toString() || "-"} />
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

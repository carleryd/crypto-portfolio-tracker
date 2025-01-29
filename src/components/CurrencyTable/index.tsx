import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useCallback } from "react";

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
  onSelectCurrency: (currency: Currency) => void;
  onSelectEditCurrency: (currency: Currency) => void;
};

export const CurrencyTable: FC<Props> = ({
  currencies,
  onSelectCurrency,
  onSelectEditCurrency,
}) => {
  const onClickEditCurrency = useCallback(
    (event: React.MouseEvent, currency: Currency) => {
      event.stopPropagation();
      onSelectEditCurrency(currency);
    },
    [onSelectEditCurrency],
  );

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell align="right">Edit</TableCell>
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
                <>
                  <TableRow
                    component="tr"
                    key={index}
                    hover={true}
                    onClick={() => onSelectCurrency(currency)}
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
                    <TableCell>
                      <Button
                        onClick={(event) =>
                          onClickEditCurrency(event, currency)
                        }
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

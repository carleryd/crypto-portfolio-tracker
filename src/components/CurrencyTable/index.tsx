import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { FC, useCallback } from "react";

import { formatCurrencyAmount, formatCurrencyPrice } from "@/utils/index";

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

const CurrencyName = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});

const CurrencySymbol = styled(Typography)({
  fontSize: 14,
  fontWeight: 300,
});

const TableHeaderCell = styled(TableCell)({
  fontSize: 12,
  fontWeight: 600,
});

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
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Holdings</TableHeaderCell>
              <TableHeaderCell align="center">Edit</TableHeaderCell>
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
                  onClick={() => onSelectCurrency(currency)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <CurrencyName>{currency.name}</CurrencyName>
                      <CurrencySymbol marginLeft={1}>
                        {currency.symbol}
                      </CurrencySymbol>
                    </Box>
                  </TableCell>
                  <HoverableTableCell
                    label={
                      currency.price ? formatCurrencyPrice(currency.price) : "-"
                    }
                  />
                  <HoverableTableCell label={currency.quantity.toString()} />
                  <HoverableTableCell
                    label={
                      currency.totalValue
                        ? formatCurrencyAmount(currency.totalValue)
                        : "-"
                    }
                  />
                  <TableCell>
                    <Button
                      onClick={(event) => onClickEditCurrency(event, currency)}
                    >
                      <EditIcon />
                    </Button>
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

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

import { formatFinancial } from "@/utils/index";

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
      {currencies.length === 0 ? (
        <Typography variant="h5">No currencies added yet</Typography>
      ) : (
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
              {currencies.map((currency, index) => (
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
                      currency.price
                        ? `$${formatFinancial(currency.price)}`
                        : "-"
                    }
                  />
                  <HoverableTableCell
                    label={formatFinancial(currency.quantity)}
                  />
                  <HoverableTableCell
                    label={
                      currency.totalValue
                        ? `$${formatFinancial(currency.totalValue)}`
                        : "-"
                    }
                  />
                  <TableCell>
                    <Button
                      onClick={(event) => onClickEditCurrency(event, currency)}
                    >
                      <EditIcon color="info" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

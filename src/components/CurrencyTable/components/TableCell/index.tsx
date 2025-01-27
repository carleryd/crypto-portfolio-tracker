import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  Tooltip,
} from "@mui/material";
import { FC } from "react";

type Props = {
  label: string;
} & MuiTableCellProps;

export const HoverableTableCell: FC<Props> = ({ label, ...muiProps }) => (
  <Tooltip title={label}>
    <MuiTableCell
      style={{
        maxWidth: 150,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      {...muiProps}
    >
      {label}
    </MuiTableCell>
  </Tooltip>
);

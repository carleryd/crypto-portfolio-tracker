import CircularProgress from "@mui/material/CircularProgress";

import { RemoteData } from "@/requests/utils/remoteData";

type Props<T, E> = {
  onSuccess: (data: T) => React.ReactNode;
  onFailure: (error: E) => React.ReactNode;
  onPending?: () => React.ReactNode;
  remoteData: RemoteData<T, E>;
};

export const RemoteDataView = <T, E>({
  remoteData,
  onSuccess,
  onFailure,
  onPending = () => <CircularProgress />,
}: Props<T, E>) => {
  switch (remoteData.type) {
    case "NOT_ASKED":
      return null;
    case "PENDING":
      return onPending();
    case "SUCCESS":
      return onSuccess(remoteData.data);
    case "ERROR":
      return onFailure(remoteData.error);
  }
};

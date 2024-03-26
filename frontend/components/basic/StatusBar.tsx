import {
  Alert,
  AlertTitle,
  Card,
  Collapse,
  LinearProgress,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ErrorIcon from "@mui/icons-material/Error";
import status, { Status } from "@lib/store/statusBar";
import { observer } from "mobx-react-lite";
// import { TransitionGroup } from "react-transition-group";

const StatusMessage = observer(({ status }: { status: Status }) => {
  const icon =
    status.status === "loading" ? (
      <CircularProgress size="1rem" />
    ) : status.status === "success" ? undefined : (
      <ErrorIcon />
    );

  const severity = status.status === "loading" ? "info" : status.status;

  return (
    <Card elevation={2}>
      <Alert icon={icon} severity={severity} onClose={() => status.delete()}>
        <AlertTitle sx={{ fontWeight: "700", mb: 0 }}>
          {status.title}
        </AlertTitle>

        {status.message}
      </Alert>
    </Card>
  );
});

/**
 * Status Bar / Toast message with Loading Bar component suitable for all pages.
 * This adds a main layout Status context which all pages can seemlessly use.
 */
export default observer(function StatusBar() {
  return (
    <>
      <Box sx={{ position: "fixed", width: "100%" }}>
        <Collapse in={status.isLoading}>
          <LinearProgress />
        </Collapse>
      </Box>

      <Box
        sx={{
          position: "fixed",
          right: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* <TransitionGroup>
          {status.bars.map((s, i) =>
            <Collapse key={i} sx={{ mt: 2, mr: 2 }}>
              <StatusMessage status={s} />
            </Collapse>
          )}
        </TransitionGroup> */}
      </Box>
    </>
  );
});

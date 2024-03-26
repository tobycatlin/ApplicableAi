import { Alert, Button, Card, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Main from "@components/layouts/Main";

interface RequirementProps {
  fulfilled: boolean;
  text: string;
}

function Requirement({ fulfilled, text }: RequirementProps) {
  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        {fulfilled ?
          <CheckCircleIcon color="primary" /> :
          <HorizontalRuleIcon color="disabled" />
        }
      </ListItemAvatar>
      <ListItemText
        primary={text}
        secondary={""} />
    </ListItem>
  );
}

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    success: false,
    error: ""
  });

  async function changePassword() {
    const response = await fetch("/api/profile/changepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentPassword, password
      })
    });

    if (response.ok) {
      setApiStatus({ success: true, error: "" });
    } else {
      const { error } = await response.json();
      setApiStatus({ success: false, error });
    }
  }

  const minLength = password.length >= 8;
  const hasNumber = !!password.match(/[\d]/);
  const hasUpper = !!password.match(/[A-Z]/);
  const hasLower = !!password.match(/[a-z]/);

  return (
    <Main title="Change Password" collection="Profile">
      <Card sx={{ px: 3, pb: 3, pt: 1 }}>
        <TextField
          label="Current Password"
          name="currentPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setCurrentPassword(e.target.value)}
          value={currentPassword}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 4 }}
        />

        <Divider variant="middle" sx={{ mb: 2, borderBottom: 2 }} />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <List dense>
          <Requirement fulfilled={minLength} text="Contains at least 8 characters" />
          <Requirement fulfilled={hasNumber} text="Contains at least one number" />
          <Requirement fulfilled={hasUpper} text="Contains at least one uppercase letter" />
          <Requirement fulfilled={hasLower} text="Contains at least one lowercase letter" />
        </List>

        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 2 }}
        />

        {
          apiStatus.error &&
          <Alert severity="error">{apiStatus.error}</Alert>
        }
        {
          apiStatus.success &&
          <Alert severity="success">Password has been reset</Alert>
        }

        <Button
          color="primary"
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          disabled={!password || !confirmPassword || password !== confirmPassword}
          onClick={changePassword}
        >
          Submit
        </Button>
      </Card>
    </Main>
  );
}
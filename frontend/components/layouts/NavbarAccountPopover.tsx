import NextLink from "next/link";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cog as CogIcon } from "@icons/cog";
import { UserCircle as UserCircleIcon } from "@icons/user-circle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { JWT } from "next-auth/jwt";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
  [x: string]: any;
}

type User = JWT & {
  role: "ADMIN" | "USER";
  user_id: string;
  displayName: string;
};

export default function NavbarAccountPopover({
  anchorEl,
  onClose,
  open,
  ...other
}: Props) {
  const { data: session, status } = useSession();

  if (!session || status !== "authenticated") return null;

  const {
    image: avatar,
    displayName: name,
    role,
    user_id,
  } = session.user as unknown as User;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          // src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">{name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {user_id}
          </Typography>
          <Chip
            size="small"
            label={role === "ADMIN" ? "Administrator" : "User"}
            color={role === "ADMIN" ? "error" : "default"}
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        {/* <NextLink href="/dashboard/social/profile" passHref legacyBehavior>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Profile</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/dashboard/account" passHref legacyBehavior>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink> */}
        <NextLink href="/profile/changepassword" passHref legacyBehavior>
          <MenuItem component="a" onClick={onClose}>
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Change Password</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
}

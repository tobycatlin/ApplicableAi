import { Box, Button, IconButton, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { User } from "@prisma/client";
import jsonSchema from "@lib/db/json-schema/json-schema.json";
import status from "@lib/store/statusBar";

const roles = ["ADMIN", "RANGE", "USER"];

const groups = {
  Other: ["nakama_id", "image"],
};

interface Props {
  id: string;
  create: boolean;
  data?: Partial<User>;
  onClose: () => void;
  onRefresh: () => Promise<void>;
  rangeIds: string[];
}

export default function AdminUserForm({
  id,
  create,
  data,
  onClose,
  onRefresh,
  rangeIds,
}: Props) {
  const initialValues = {
    // id: "",
    role: data?.role ?? "USER",
    name: data?.name ?? "",
    email: data?.email ?? "",
    emailVerified: data?.emailVerified ?? false,
    password: "",
    nakama_id: data?.nakama_id ?? "",
    image: data?.image ?? "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      emailVerified: Yup.boolean().required(),
      password: create ? Yup.string().min(1).required() : Yup.string().min(1),
      role: Yup.string().oneOf(roles).required(),
      nakama_id: Yup.string().nullable(),
    }),
    onSubmit: async (values, helpers) => {
      const bar = status.loading("Saving user config...");
      values.emailVerified = !!values.emailVerified;
      const response = await fetch("/api/usersadmin", {
        method: create ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          create
            ? values
            : {
                // id: initialValues.id,
                id,
                data: values,
              }
        ),
      });

      if (response.ok) {
        // const data = await response.json();

        helpers.setSubmitting(false);

        if (create) {
          bar.success("User created", `User ${values.name} has been created.`);
        } else {
          bar.success("User updated", `User ${values.name} has been updated.`);
        }

        await onRefresh();
        onClose();
      } else {
        helpers.setSubmitting(false);

        const { error } = await response.json();
        console.error(error);

        bar.error("Error saving User", error);
      }
    },
  });

  const schema = {
    ...jsonSchema.definitions.User.properties,
    ...(formik.values.role === "RANGE"
      ? {
          name: {
            type: "string",
            enum: rangeIds,
          },
        }
      : undefined),
  };

  const title = create ? "Create Admin User" : "Edit User";
  const description = create ? (
    <>Create new Admin Client user.</>
  ) : (
    <>
      Edit Admin Client user <strong>{formik.values.name}</strong>.
    </>
  );

  return (
    <>
      <Box sx={{ position: "relative", mt: 4, mx: 2 }}>
        <IconButton
          color="primary"
          onClick={onClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseRoundedIcon fontSize="large" />
        </IconButton>

        <Typography variant="h4" gutterBottom sx={{ px: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ px: 2, mb: 4, color: "text.secondary" }}
        >
          {description}
        </Typography>

        {(create || data) && (
          <Box
            component="form"
            method="post"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
            >
              {formik.values.name}
            </Typography>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
              disabled={(!create && !formik.dirty) || !formik.isValid}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

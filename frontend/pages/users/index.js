import * as React from "react";
import useSWR from "swr";

import { Box, Container, Paper, Typography } from "@mui/material";

import useFetch from "@lib/hooks/use-fetch";
import { useTheme } from "@mui/material/styles";
import TitleUnderlined from "@components/generic/TitleUnderlined";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Users() {
  const theme = useTheme();
  const { data, error } = useSWR("/api/users/list", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // "id": "clefouxsp0004v42krc1hiewr",
  // "nakama_id": "eef78dc0-bef9-4b3b-a0c6-7fcde39b7ab9",
  // "name": "Toby Catlin",
  // "email": "tobycatlin@gmail.com",
  // "emailVerified": true,
  // "password": "$2b$10$fwvk5lmo/H71gfZQ.riVFOgn17Ss91tb3yjH.77BAoUB76SCG70my",
  // "role": "ADMIN",
  // "image": "",
  // "createdAt": "2023-02-09T20:25:11.526Z",
  // "updatedAt": "2023-02-15T12:13:12.113Z"
  return (
    <>
      <TitleUnderlined>Users</TitleUnderlined>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}

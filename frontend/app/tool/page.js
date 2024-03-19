"use client";
import { useState, useEffect } from "react";

import {
  Divider,
  Box,
  Typography,
  TextField,
  InputLabel,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Rating,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import TabSet from "../components/TabSet";
import Button from "@mui/material/Button";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "You will be provided with a cv document and a job description. Your task is to rewrite the document to match the job description and include addition information from the prompt."
  );
  const [referenceCV, setReferenceResult] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [baseCV, setBaseCV] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(false);
  const [error, setError] = useState(false);

  // useEffect();
  useEffect(() => {
    const storedContext = localStorage.getItem("context");
    const storedPrompt = localStorage.getItem("prompt");
    const storedBaseCV = localStorage.getItem("baseCV");
    const storedReferenceCV = localStorage.getItem("referenceCV");
    // const storedMessage = localStorage.getItem("message");

    if (storedContext) setContext(storedContext);
    if (storedPrompt) setPrompt(storedPrompt);
    if (storedBaseCV) setBaseCV(storedBaseCV);
    if (storedReferenceCV) setReferenceResult(storedReferenceCV);
    // if (storedMessage) setMessage(storedMessage);
  }, []);

  const textboxStyle = {
    height: "100%",
    // "& .MuiInputBase-root": {
    //   height: "100%",
    // },
  };

  // Handle posting text to api
  const postPrompt = async () => {
    setLoading(true);
    setError(false);
    // console.log(JSON.stringify({ prompt, context, baseCV }));

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, context, baseCV }),
    });

    if (!response.ok) {
      return {
        error: `Something went wrong - ${response.status} ${response.statusText}`,
      };
    }

    return response.json();
  };

  const postCVScore = async () => {
    const response = await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ context, baseCV }),
    });

    if (!response.ok) {
      return {
        error: `Something went wrong - ${response.status} ${response.statusText}`,
      };
    }

    return response.json();
  };

  const getCVExample = async () => {
    // console.log(JSON.stringify({ prompt, context, baseCV }));

    const response = await fetch("/api/generate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        error: `Something went wrong - ${response.status} ${response.statusText}`,
      };
    }

    return response.json();
  };

  const handleSubmit = async () => {
    setMessage("");
    const message = await postPrompt();
    const score = await postCVScore();

    if (message.error) {
      setError(message.error);
    } else {
      setMessage(message.output.content);
      setScore(score.output.content);
      setError(false);
      localStorage.setItem("message", message.output.content);
    }

    setLoading(false);
  };

  const handleScore = async () => {
    const message = await postCVScore();
    console.log(message);
  };

  const generateCVExample = async () => {
    setBaseCV("Loading...");
    const message = await getCVExample();
    if (message.error) {
      setError(message.error);
    } else {
      setBaseCV(message.output.content);
      localStorage.setItem("baseCV", message.output.content);
    }

    setLoading(false);
  };

  const handleDocumentChange = (e) => {
    setBaseCV(e.target.value);
    localStorage.setItem("baseCV", e.target.value);
  };

  const handleRefDocumentSave = (e) => {
    if (message && message != "") {
      setReferenceResult(message);
      localStorage.setItem("referenceCV", message);
      // setShowReference(true);
    }
  };

  const handleToggleChange = (event) => {
    setShowReference(event.target.checked);
  };

  const handleContextChange = (e) => {
    setContext(e.target.value);
    localStorage.setItem("context", e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    localStorage.setItem("prompt", e.target.value);
  };

  const RatingComponent = (props) => {
    const { display, scoreValue } = props;
    if (!display || !scoreValue) {
      return null;
    } else {
      // console.log(scoreValue);
      return (
        <>
          {scoreValue}
          <Rating name="customized-10" value={scoreValue} max={10} readOnly />
        </>
      );
    }
  };

  const tabs = [
    {
      label: "Document",
      component: (
        <>
          <Typography
            variant="h5"
            sx={{
              my: 2,
            }}
          >
            CV
          </Typography>
          <Typography variant="body">
            The base CV document that can be used as an input
          </Typography>
          <Box>
            <p>
              Generate an example CV using prompt: "generate an bad example cv
              for a junior frontend web developer"
            </p>
            <Button variant="contained" onClick={generateCVExample}>
              Generate Bad CV
            </Button>
          </Box>

          <TextField
            value={baseCV}
            multiline
            variant="outlined"
            placeholder="Paste CV"
            fullWidth
            sx={textboxStyle}
            onChange={handleDocumentChange}
          />
        </>
      ),
    },
    {
      label: "Job Description",
      component: (
        <>
          <Typography
            variant="h5"
            sx={{
              my: 2,
            }}
          >
            Job Description
          </Typography>
          {/* <Typography my={5} variant="body">
            The job description
          </Typography> */}
          <TextField
            value={context}
            multiline
            variant="outlined"
            placeholder="Paste Job description"
            fullWidth
            sx={textboxStyle}
            onChange={handleContextChange}
          />
        </>
      ),
    },
    {
      label: "Prompt",
      component: (
        <>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            Prompt
          </Typography>
          <Typography variant="body">
            <p>
              The prompt provides the LLM instructions as to how it should
              combine the CV and Job description inputs. You can format the
              prompt as if you were instructing a person to do the task.
            </p>
            <InputLabel htmlFor="prompt-field">Input Prompt:</InputLabel>
            <TextField
              id="prompt-field"
              value={prompt}
              multiline
              variant="outlined"
              placeholder="Prompt"
              fullWidth
              sx={textboxStyle}
              onChange={handlePromptChange}
            />
            <p>
              Examples:
              <ul>
                <li>
                  <i>
                    You will be provided with a cv document and a job
                    description. Your task is to rewrite the document to match
                    the job description
                  </i>
                </li>
                <li>
                  <i>
                    match the cv as closely as you can to to the job description
                  </i>
                </li>
                <li>
                  <i>take the existing CV and adapt it to the requirements</i>
                </li>
                <li>
                  <i>
                    Make a cv for this job as if you were looking for a
                    promotion. List most compatible I.T. skills. List
                    transferable I.T. skills. Only list relevant I.T. work
                    experience. Use the tone of a professional. Add a personal
                    statement of someone who enjoys their job.
                  </i>
                </li>
                <li>
                  <i>
                    As a junior developer, match the cv to the job description,
                    as if you were applying to the job, Organise it as :
                    Personal info, About me (include personal statement),
                    Skills, professional experience, Education, others (hobbies,
                    languages...), keep the CV in the tone of the original with
                    a Action-Oriented Language
                  </i>
                </li>
              </ul>
            </p>
          </Typography>
        </>
      ),
    },
    {
      label: "Result",
      component: (
        <>
          <Box p={2}>
            {loading ? <Typography>Loading...</Typography> : null}
            {loading ? null : (
              <Button sx={{ m: 2 }} variant="contained" onClick={handleSubmit}>
                Generate
              </Button>
            )}

            {message && message != "" && !loading && (
              <>
                <Button sx={{ m: 2 }} variant="contained" onClick={handleScore}>
                  Score
                </Button>
                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  onClick={handleRefDocumentSave}
                >
                  Save as Reference
                </Button>

                {referenceCV && (
                  <FormControlLabel
                    sx={{ m: 2 }}
                    control={
                      <Switch
                        checked={showReference}
                        onChange={handleToggleChange}
                        color="primary"
                      />
                    }
                    label="Show Reference"
                  />
                )}
              </>
            )}
          </Box>

          {!loading && error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            message &&
            showReference && (
              <>
                <RatingComponent display={message != ""} scoreValue={score} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h5"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Result
                    </Typography>
                    <ReactMarkdown>{message}</ReactMarkdown>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h5"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Reference Result
                    </Typography>
                    <ReactMarkdown>{referenceCV}</ReactMarkdown>
                  </Grid>
                </Grid>
              </>
            )
          )}

          {!loading && error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            message &&
            !showReference && (
              <>
                <RatingComponent display={message != ""} scoreValue={score} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Result
                    </Typography>
                    <ReactMarkdown>{message}</ReactMarkdown>
                  </Grid>
                </Grid>
              </>
            )
          )}
        </>
      ),
    },
  ];

  return <TabSet tabs={tabs} sx={{ height: "90%" }} />;
}

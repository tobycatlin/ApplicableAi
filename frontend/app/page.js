import ReactMarkdown from "react-markdown";

export default function Home() {
  const page = `
  # Overview
  Junior developers encounter a multitude of challenges as they embark on the journey to
  secure a job in the competitive tech industry. One of the primary hurdles they face is the
  constraint of limited experience. Employers often prioritise candidates with hands-on
  practical experience, creating a substantial barrier for those who are at the nascent stages of
  their careers. This lack of real-world application can impede their ability to stand out in a
  crowded job market.

  Crafting an effective resume and cover letter further compounds the challenges faced by
  junior developers. With limited work history to draw upon, they must skillfully emphasise
  relevant projects, internships, and acquired skills. This process requires a delicate balance
  between showcasing competence and addressing the inevitable gaps in experience, a task
  that demands careful attention to detail.
  
  # Sprint Goal
  This innovation sprint goal is to assess and iterate the potential of using Large Language
  Models to increase the effectiveness of junior developer applications.

  LLMs are a new class of machine learning models that have demonstrated the ability to generate coherent text and perform a variety of language-related tasks. They are trained on large datasets of text, such as Wikipedia, and are capable of generating text that is indistinguishable from human-written text. The most advanced LLMs, such as GPT-3, are capable of performing a variety of tasks, including translation, summarisation, and question answering.
  The input passed into a LLM is known as a prompt. The quality of the prompt is vital to get the desired output from the model. The prompt should be specific enough to guide the model towards the desired output, but not so specific that it limits the model’s ability to generate novel text. 

  Through experimentation the aim is to dertermine the key factors in defining prompts. How a prompt combined with the input a CV, Job description can generate different CV outputs. Documenting the inputs and results will help to iterate on the process and improve the results.
  
  # Stretch tasks
  * Write a prompt that takes a CV as the context and generates a score from 1-10 based of a set of critiria
  * Write a prompt that will take a list of job descriptions and a CV and return a list of scores for each job description

  `;

  return <ReactMarkdown>{page}</ReactMarkdown>;
}

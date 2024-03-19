import ReactMarkdown from "react-markdown";

export default function Docs() {
  const page = `
  # The 6 components of a LLM prompt
  * Task
  * Context
  * Exemplar
  * Persona
  * Format
  * Tone
  
  ## Task
  The task is the main goal of the prompt. It is the primary objective that the model is trying to achieve. 
  The task should be as specific as possible to guide the model towards the desired output. 
  However, it should not be so specific that it limits the model’s ability to generate novel text.

  A Task is **mandatory**, because if you just pasted a CV document and didn't specifiy what should be done then the model would just return the CV document.

  ## Context
  The context is the information that the model uses to generate the output. In our experiments the CV document and Job description form the context

  Context is important but not mandatory. It can really help the model to get closer to what you want.

  ## Exemplar
  The exemplar is an example of the desired output. It is used to guide the model towards the desired output.
  Exemplar is also not mandatory but can tell the model how you want the output to look.
  Example:
  *"Use the STAR answer framework: Situation, Task, Action, Result"*

  You can also tell the model to reference an existing document. 
  For example:
  *"Please draft the CV document using known good CVs as a reference."*

  ## Persona
  The persona is the identity of the model, ie who do you want the model to be when asking it questions. 
  An example might be:
  *"You are a CTO at a tech company that wants to hire junior developers"*

  This builds on the context and allows the model to have a pespective on the task.
  You can reference real world people or fictional characters. 
  For example:
  * Write in the style of Shakespeare
  * You are Bill Gates and you want to hire a junior developer
  * You are Donald Trump reviewing my CV
  * As Batman suggest changes to my CV

  ## Format
  The format can help change how the output is returned. A common format is to return the output as markdown which will add headings and paragraphs.

  ## Tone
  The tone is the style of the prompt.

  Examples would be: 
  * use a formal tone of voice
  * use a casual tone
  * show enthusiasm for the role
  
  
  If its hard to think of suitable tone words to use a prompt to help with this. 
  Try running: 
  *"I am applying for my first developer job. I want to show enthusiasm for the role. Can you list 5 tone keywords to using in a prompt"*
  
  ### Result
  When showcasing enthusiasm for a developer job, these tone keywords can help convey your passion and eagerness:

  * **Passionate**: Emphasize your love for coding and how it's not just a job but a genuine interest and passion.
  * **Eager**: Show excitement and eagerness to contribute, learn, and grow within the role and the company.
  * **Enthusiastic**: Convey your enthusiasm for the specific technologies, projects, or challenges the role offers.
  * **Motivated**: Highlight your drive to make a meaningful impact, solve problems, and contribute positively to the team and projects.
  * **Inspired**: Share what inspires you about the company's mission, values, or the potential to innovate and create with the team.


  ## Super prompt
  Try this out in ChatGPT or other chatbot that keeps the context between messages.
  ~~~
  You are an expert-level ChatGPT Prompt Engineer with expertise in various subject matters.

  Throughout our interaction, you will refer to me as [name].

  Let's collaborate to create the best possible ChatGPT response to a prompt I provide.

  We will interact as follows:

  1. I will inform you how you can assist me.

  2. Based on my requirements, you will suggest additional expert roles you should assume, besides being a ChatGPT Prompt Engineer, to deliver the best possible response. You will then ask if you should proceed with the suggested roles or modify them for optimal results.

  3. If I agree, you will adopt all additional expert roles, including the initial ChatGPT Prompt Engineer role.

  4. If I Disagree, you will inquire which roles should be removed, eliminate those roles, and maintain the remaining roles, including the ChatGPT Prompt Engineer role, before proceeding.

  5. You will confirm your active expert roles, outline the skills under each role, and ask if I want to modify any roles.

  6. If I agree, you will ask which roles to add or remove, and I will inform you. Repeat step 5 until I am satisfied with the roles.

  7. If I disagree, proceed to the next step.

  8. You will ask, "How can I help with [my answer to step 1]?"

  9. I will provide my answer.

  10. You will inquire if I want to use any reference sources for crafting the perfect prompt.

  11. If I agree, you will ask for the number of sources I want to use.

  12. You will request each source individually, acknowledge when you have reviewed it, and ask for the next one. Continue until you have reviewed all sources, then move to the next step.

  13. You will request more details about my original prompt in a list format to fully understand my expectations.

  14. I will provide answers to your questions.

  15. From this point, you will act under all confirmed expert roles and create a detailed ChatGPT prompt using my original prompt and the additional details from step 14. Present the new prompt and ask for my feedback.

  16. If I am satisfied, you will describe each expert role's contribution and how they will collaborate to produce a comprehensive result. Then, ask if any outputs or experts are missing.
  16.1. If I agree, I will indicate the missing role or output, and you will adjust roles before repeating step 15.
  16.2. If I disagree, you will execute the provided prompt as all confirmed expert roles and produce the output as outlined in step 15. Proceed to step 20.

  17. If I am unsatisfied, you will ask for specific issues with the prompt.

  18. I will provide additional information.

  19. Generate a new prompt following the process in step 15, considering my feedback from step 18.

  20. Upon completing the response, ask if I require any changes.

  21. If I agree, ask for the needed changes, refer to your previous response, make the requested adjustments, and generate a new prompt.

  Repeat steps 15-20 until I am content with the prompt.

  If you fully understand your assignment, respond with, "How may I help you today, [name]?"
~~~

  # Useful Links
  * A summary of the 6 important components of a LLM prompt [YouTube](https://www.youtube.com/watch?v=jC4v5AS4RIM)
  * [OpenAI Guide to Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
  * [What is a LLM by IBM 5 mins](https://www.youtube.com/watch?v=5sLYAQS9sWQ)
  * [FreeCodeCamp - Prompt Engineering Tutorial ~40 mins](https://www.youtube.com/watch?v=_ZvnD73m40o)
  
 
`;

  return <ReactMarkdown>{page}</ReactMarkdown>;
}

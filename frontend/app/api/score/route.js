import openai from "../../../lib/openAI";

export async function POST(request) {
  const body = await request.json();
  const { context, baseCV } = body;
  const prompt = `You will be provided with a candidate's CV and a job description. Your task is to carefully compare the CV experience, education, skills and qualifications to the required and desired criteria listed in the job description. Assign an overall Match Score between 1 and 10 to indicate how well the candidate's CV aligns with the job requirements, where:
    1 = CV does not match any of the required or desired skills, experience or qualifications listed in the job description

    10 = CV matches or exceeds all of the required and desired skills, experience and qualifications described in the job description

    To determine the score:

    Read through the full CV and job description.
    Identify all required and desired skills, experience and qualifications in the job description.
    Compare these to the candidate's CV experience, education, skills and qualifications.
    For each required job description element also present on CV, add 1 point.
    For each desired element on the CV, add 0.5 points.
    Determine a final overall score between 1 and 10 for the full CV based on components matched.
    In your response, return only the numeric Match Score between 1 and 10`;

  const promptWithContext = `Prompt:${prompt} \n
                             CV document: """${baseCV}"""\n
                             Job description: """${context}"""\n
                            `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: promptWithContext }],
    model: "gpt-3.5-turbo-1106",
    // temperature: 0.9,
    // model: "gpt-4",
  });

  const theResponse = completion.choices[0].message;

  return Response.json({ output: theResponse }, { status: 200 });
}

import openai from "../../../lib/openAI";

export async function GET(request) {
  const promptWithContext = `generate an bad example cv for a junior frontend web developer\n
                            `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: promptWithContext }],
    model: "gpt-3.5-turbo-1106",
    // model: "gpt-4",
  });

  const theResponse = completion.choices[0].message;

  return Response.json({ output: theResponse }, { status: 200 });
}

// export const config = {
//   type: "experimental-background",
// };

import openai from "../../../lib/openAI";

export async function GET(request) {
  const promptString = `create a booklet cover page for a 4 seasons music score`;

  const aiResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: promptString,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  const imageUrl = aiResponse.data[0].url;
  return Response.json({ url: imageUrl }, { status: 200 });
}

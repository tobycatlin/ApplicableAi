import minioClient from "@lib/minio/minioClient";

export default async function handle(req, res) {
  const { filename, filedata } = req.body;

  const objectsStream = await minioClient.putObject(
    "solve",
    filename,
    filedata,
    "text/plain"
  );
  // console.log(objectsStream);

  res.json(objectsStream);
}

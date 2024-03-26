import minioClient from "@lib/minio/minioClient";

export default async function handle(req, res) {
  const { log, user_id, user_ip, type } = req.body;
  const str = "random string to be uploaded";

  minioClient.putObject(
    "solve",
    "my-objectname3",
    str,
    "text/plain",
    function (e) {
      if (e) {
        return console.log(e);
      }
      console.log("Successfully uploaded the string");
    }
  );

  const objectsStream = minioClient.listObjectsV2("solve", "", true);
  const files = [];

  for await (const obj of objectsStream) {
    files.push(obj);
  }

  res.json(files);
}

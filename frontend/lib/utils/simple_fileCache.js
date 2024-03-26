import fs from "fs";

export async function getFileCache(filePath) {
  // Check if the file exists
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);

    // console.log("File exists.");
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    return false;
  }
}

export async function putFileCache(filePath, contentToWrite) {
  const fileWritten = await fs.promises.writeFile(filePath, contentToWrite);

  if (!fileWritten) {
    return false;
  } else {
    return true;
  }
}

export async function deleteFileCache(filePath) {
  const fileDeleted = await fs.promises.unlink(filePath);

  if (!fileDeleted) {
    return false;
  } else {
    return true;
  }
}


const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

// eslint-disable-next-line import/no-anonymous-default-export
export default async (media) => {
  const blob = await fileToBlob(media)
  const urlCreator = window.URL || window.webkitURL
  return urlCreator.createObjectURL(blob)
}
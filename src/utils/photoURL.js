const backendURL =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL;

const storeImagesURL =
  process.env.REACT_APP_STORE_IMAGES_URL ||
  process.env.NEXT_PUBLIC_STORE_IMAGES_URL;

const spacesName =
  process.env.REACT_APP_SPACES_NAME ||
  process.env.NEXT_PUBLIC_DO_SPACES_BUCKET_NAME;

const spacesEndpoint =
  process.env.REACT_APP_SPACES_ENDPOINT ||
  process.env.NEXT_PUBLIC_SPACES_ENDPOINT ||
  process.env.NEXT_PUBLIC_DO_SPACES_CDN_URL;

// Prefer the CDN endpoint supplied by DigitalOcean. The bucket name is only
// used as a fallback for deployments that provide the regional endpoint.
const spacesBaseURL = spacesEndpoint
  ? spacesEndpoint.replace(/\/$/, "")
  : spacesName
    ? `https://${spacesName}.sgp1.cdn.digitaloceanspaces.com`
    : null;

const isAbsoluteURL = (value) =>
  /^(?:https?:)?\/\//i.test(value) ||
  value.startsWith("data:") ||
  value.startsWith("blob:") ||
  value.startsWith("file:");

export function getPhotoURL(photoURL) {
  if (typeof photoURL !== "string" || !photoURL) return null;

  if (backendURL && photoURL.startsWith(`${backendURL}/images/`)) {
    const photoKey = photoURL.split("/images/")[1];
    return spacesBaseURL ? `${spacesBaseURL}/${photoKey}` : photoURL;
  }

  if (storeImagesURL && photoURL.startsWith(`${storeImagesURL}/`)) {
    const photoKey = photoURL.slice(`${storeImagesURL}/`.length);
    return spacesBaseURL ? `${spacesBaseURL}/${photoKey}` : photoURL;
  }

  if (isAbsoluteURL(photoURL) || photoURL.startsWith("/")) return photoURL;

  return spacesBaseURL ? `${spacesBaseURL}/${photoURL}` : photoURL;
}

export function processPhotoURL(photoURL) {
  if (
    typeof photoURL === "string" &&
    ((backendURL && photoURL.startsWith(`${backendURL}/images`)) ||
      (storeImagesURL && photoURL.startsWith(`${storeImagesURL}/`)) ||
      (spacesBaseURL && photoURL.startsWith(`${spacesBaseURL}/`))) &&
    !photoURL.startsWith("file://")
  ) {
    return photoURL.split("/").pop();
  }

  return photoURL;
}

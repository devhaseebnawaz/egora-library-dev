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

const imageAPIBaseURL = (
  storeImagesURL || (backendURL ? `${backendURL}/images` : null)
)?.replace(/\/$/, "");

const getImageURL = (photoKey) => {
  if (!photoKey) return photoKey;
  const normalizedKey = String(photoKey).replace(/^\/+/, "");
  return imageAPIBaseURL
    ? `${imageAPIBaseURL}/${normalizedKey}`
    : spacesBaseURL
      ? `${spacesBaseURL}/${normalizedKey}`
      : photoKey;
};

const isAbsoluteURL = (value) =>
  /^(?:https?:)?\/\//i.test(value) ||
  value.startsWith("data:") ||
  value.startsWith("blob:") ||
  value.startsWith("file:");

export function getPhotoURL(photoURL) {
  if (typeof photoURL !== "string" || !photoURL) return null;

  // Legacy AWS URLs are converted to the backend image endpoint. The backend
  // owns the DigitalOcean Spaces credentials and signs the object request.
  try {
    const parsed = new URL(photoURL);
    if (parsed.hostname.endsWith('.amazonaws.com')) {
      return getImageURL(parsed.pathname);
    }
  } catch (error) {
    // Continue handling normal object keys and external URLs below.
  }

  if (backendURL && photoURL.startsWith(`${backendURL}/images/`)) return photoURL;
  if (storeImagesURL && photoURL.startsWith(`${storeImagesURL}/`)) return photoURL;

  if (isAbsoluteURL(photoURL) || photoURL.startsWith("/")) return photoURL;

  return imageAPIBaseURL ? `${imageAPIBaseURL}/${photoURL.replace(/^\/+/, '')}` : photoURL;
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

const backendURL =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL;

const awsBucketName =
  process.env.REACT_APP_AWS_BUCKET_NAME ||
  process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

const awsBucketRegion =
  process.env.REACT_APP_AWS_BUCKET_REGION ||
  process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;

const awsBaseURL =
  awsBucketName && awsBucketRegion
    ? `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com`
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
    return awsBaseURL ? `${awsBaseURL}/${photoKey}` : photoURL;
  }

  if (isAbsoluteURL(photoURL) || photoURL.startsWith("/")) return photoURL;

  return awsBaseURL ? `${awsBaseURL}/${photoURL}` : photoURL;
}

export function processPhotoURL(photoURL) {
  if (
    typeof photoURL === "string" &&
    ((backendURL && photoURL.startsWith(`${backendURL}/images`)) ||
      (awsBaseURL && photoURL.startsWith(`${awsBaseURL}/`))) &&
    !photoURL.startsWith("file://")
  ) {
    return photoURL.split("/").pop();
  }

  return photoURL;
}
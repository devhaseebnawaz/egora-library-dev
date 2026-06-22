export function getPhotoURL(photoURL) {
    console.log("Photo URL : ",photoURL)    
    if (photoURL?.startsWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/`)  ) {
      photoURL = photoURL.split('/images/')[1];
      return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}.amazonaws.com/${photoURL}`
    } else if( photoURL?.startsWith(`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}.amazonaws.com/`) ){
      return photoURL
    }
    return photoURL ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}.amazonaws.com/${photoURL}` : null;
}

export function processPhotoURL(photoURL) {
    if (
      typeof photoURL === 'string' && ( photoURL.startsWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`) ||  photoURL?.startsWith(`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_BUCKET_REGION}.amazonaws.com/`) ) &&
      !photoURL.startsWith('file://')
    ) {
      let photoId = photoURL.split('/').pop();
      return photoId;
    }
    return photoURL;
  }
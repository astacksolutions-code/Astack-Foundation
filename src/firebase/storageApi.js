const MAX_DIMENSION = 1200; // px, longest side
const JPEG_QUALITY = 0.75;

/** Resizes/compresses an image file in the browser and returns a JPEG data URL.
 * Keeps images well under Firestore's 1MB document limit when stored inline. */
function compressToDataURL(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error('Could not read this image file'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Could not read this file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resolves an image File to a usable URL for the app.
 *
 * By design this NEVER calls Firebase Storage — it compresses the image
 * client-side and stores it as a base64 data URL directly on the Firestore
 * document. This sidesteps Storage entirely (no bucket setup, no CORS
 * configuration, no retry hangs), at the cost of each image adding roughly
 * 100–400KB to its Firestore document (fine for an admin-managed content
 * site with dozens/hundreds of images, not built for high-volume user
 * uploads). See README "Fixing Storage CORS" if you outgrow this later.
 */
export async function uploadImage(file) {
  return compressToDataURL(file);
}


export function formateDate(date: Date) {
  
  const postDate = new Date(date);
  const now = new Date();

  const sameDay =
    postDate.getDate() === now.getDate() &&
    postDate.getMonth() === now.getMonth() &&
    postDate.getFullYear() === now.getFullYear();

  const sameYear = postDate.getFullYear() === now.getFullYear();

  if (sameDay) {
    return postDate.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (sameYear) {
    return postDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
    });
  }

  return postDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// email validator
export const isValidEmail = (email: string) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// upload image 
type UploadResponse = { url: string; publicId: string };

export const uploadToCloudinary = async (
    file: File,
    oldPublicId?: string,
  ): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const res = await fetch("/api/user/uploadAvatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              file: reader.result,
              oldPublicId,
            }),
          });
          if (!res.ok) {
            throw new Error("Upload failed");
          }
          const data = await res.json();
          resolve({ url: data.url, publicId: data.publicId });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
    });
  };
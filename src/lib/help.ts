
export function formateDate(date: Date) {
  const d = new Date(date);
  const formattedDate =
    d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  return formattedDate;
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
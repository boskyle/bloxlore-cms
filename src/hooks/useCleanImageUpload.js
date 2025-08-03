import { useCallback } from "react";

export function useCleanImageUpload() {
  const cleanImageBlob = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const cleanedFile = new File([blob], "cleaned-" + file.name, {
                type: blob.type,
              });
              resolve(cleanedFile);
            } else {
              reject(new Error("Failed to convert to Blob"));
            }
          },
          "image/webp",
          0.9
        );
      };

      img.onerror = reject;
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }, []);

  return cleanImageBlob;
}

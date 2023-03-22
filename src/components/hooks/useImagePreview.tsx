import { useEffect, useState } from "react";

export default function useImagePreview(file: File | string | null) {
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // if initial value
    if (typeof file === "string") {
      setPreviewImage(file);
      return;
    }
    // if file was removed
    if (!file) {
      setPreviewImage("");
      return;
    }
    // if is not an image
    if (!file.type.match("image.*")) return;

    // create the preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return previewImage;
}

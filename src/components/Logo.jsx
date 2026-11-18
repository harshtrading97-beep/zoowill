// ZoOwill Logo — renders actual brand image with mix-blend-multiply
import { handleImageError } from "../data/products";

export default function ZoOwillLogo({ className = "", height = 48 }) {
  return (
    <img
      src="/logo.jpeg"
      alt="ZoOwill Equestrian"
      onError={handleImageError}
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        mixBlendMode: "multiply",
        display: "block",
      }}
      className={className}
    />
  );
}

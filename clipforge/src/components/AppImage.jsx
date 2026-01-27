import React from "react";

const AppImage = ({ src, alt = "image", className, ...props }) => {
    if (!src) return null;
    return <img src={src} alt={alt} className={`object-cover ${className}`} {...props} />;
};
export default AppImage;

import React from 'react';
import * as Icons from 'lucide-react';

const AppIcon = ({ name, className, size = 24, color, ...props }) => {
    // Normalize name to PascalCase just in case, though lucide uses PascalCase
    // or handle if name is missing
    if (!name) return null;

    const IconComponent = Icons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    return (
        <IconComponent
            size={size}
            color={color}
            className={className}
            {...props}
        />
    );
};

export default AppIcon;

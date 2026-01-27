import React from "react";
import { Link } from "react-router-dom";

const PrimaryNavigation = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow">
            <Link to="/" className="text-xl font-bold">ClipForge</Link>
            <div className="flex gap-4">
                <Link to="/" className="hover:text-blue-500">Home</Link>
            </div>
        </nav>
    );
};

export default PrimaryNavigation;

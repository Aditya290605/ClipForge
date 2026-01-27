import React from "react";
import { Link, useLocation } from "react-router-dom";

const steps = [
    { path: "/video-input", label: "Input" },
    { path: "/video-editor", label: "Edit" },
    { path: "/download-options", label: "Download" },
];

const WorkflowProgress = () => {
    const location = useLocation();

    return (
        <div className="flex justify-center space-x-4 py-4 bg-gray-50 border-b">
            {steps.map((step, index) => {
                const isActive = location.pathname.startsWith(step.path);
                return (
                    <div key={step.path} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                            {index + 1}
                        </div>
                        <span className={`ml-2 text-sm ${isActive ? "font-medium text-blue-600" : "text-gray-500"}`}>
                            {step.label}
                        </span>
                        {index < steps.length - 1 && <div className="w-12 h-0.5 bg-gray-300 ml-4" />}
                    </div>
                );
            })}
        </div>
    );
};
export default WorkflowProgress;

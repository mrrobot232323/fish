import React from 'react';

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 ${className}`}>
        {children}
    </div>
);

export const Button = ({ onClick, children, variant = "primary", className = "", icon: Icon }) => {
    const baseStyles = "w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 touch-manipulation";
    const variants = {
        primary: "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
        success: "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700",
        danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

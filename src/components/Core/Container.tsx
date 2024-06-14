import React from "react";

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="mx-auto lg:w-[85vw] md:w-[95vw]  max-w-full px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    )
}

export default Container;
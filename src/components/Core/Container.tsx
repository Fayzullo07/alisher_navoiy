import React from "react";

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="mx-auto md:w-[85vw]  max-w-full px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    )
}

export default Container;
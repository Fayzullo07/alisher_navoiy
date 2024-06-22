import React from "react";

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="mx-auto 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:w-[85vw] md:w-[95vw]  max-w-full px-2 sm:px-6 lg:px-8">
            {children}
        </div>
    )
}

export default Container;
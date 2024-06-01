import React from "react";

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="mx-auto w-[80vw] text-2xl px-5">
            {children}
        </div>
    )
}

export default Container;
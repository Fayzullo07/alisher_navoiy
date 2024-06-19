const Title = ({ title = "" }) => {
    return (
        <div className="py-5 text-lg 2xl:text-3xl xl:text-2xl lg:text-2xl md:text-2xl font-semibold">
            {title}
        </div>
    )
}

export default Title;
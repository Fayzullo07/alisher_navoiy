const Title = ({ title = "" }) => {
    return (
        <div className="py-5 text-lg md:text-2xl font-semibold">
            {title}
        </div>
    )
}

export default Title;
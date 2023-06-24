export const Button = ({ children, className, type }) => {
    return <button type={type} className={`btn btn-primary rounded-xl text-white ease-in-out duration-200 ${className}`}>
        <span className="font-semibold">
            {children}
        </span>
    </button>
}
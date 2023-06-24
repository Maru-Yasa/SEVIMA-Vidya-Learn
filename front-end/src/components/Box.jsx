export const Box = ({ children, className }) => {
    return <div className={`rounded-xl border bg-white p-5 ${className}`}>
        {children}
    </div>
}
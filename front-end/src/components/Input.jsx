export const Input = ({type, label, placeHolder, helpText, hook, error, defaultValue}) => {
    return <div className="my-3 flex flex-col">
        <label className="mb-1">
            <span className="">
                {label}
            </span>
        </label>
        <input type={type} defaultValue={defaultValue} className="input border-gray-300" placeholder={placeHolder} {...hook} />
        {helpText && <>
            <small className="mt-1">
                <span className="text-gray-400">{helpText}</span>
            </small>
        </>}
        {error && <>
            <div className="mt-1">
                <span className="text-red-500">{error}</span>
            </div>
        </>}
    </div>
}
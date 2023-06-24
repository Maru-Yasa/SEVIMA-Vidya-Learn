import { Controller } from 'react-hook-form'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

export const SelectInput = ({label, helpText, error, options, placeholder, name, control, async=false, load}) => {
    
    const loadOptions = async (inputValue) => {
        const data = await load(inputValue)
        console.log(data);
        return data
    }

    return <div className="my-3 flex flex-col">
        <label className="mb-1">
            <span className="">
                {label}
            </span>
        </label>
        <Controller
                control={control}
                name={name}
                render={({field: {onChange, value, name, ref} }) => (
                    // <Select
                    //     inputRef={ref}
                    //     classNamePrefix="addl-class"
                    //     options={options}
                    //     value={options.find(c => c.value === value)}
                    //     onChange={val => onChange(val.value)}
                    // />
                    async ? <>
                        <AsyncSelect 
                            ref={ref}
                            onChange={val => onChange(val.value)} 
                            className='w-full' 
                            placeholder={placeholder} 
                            name={name} 
                            loadOptions={loadOptions}
                        />
                    </> : <>
                        <Select 
                            ref={ref} 
                            onChange={val => onChange(val.value)} 
                            value={options.find(c => c.value === value)} 
                            className='w-full' 
                            placeholder={placeholder} 
                            name={name} 
                            options={options}
                        />
                    </> 
                )}
            />
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
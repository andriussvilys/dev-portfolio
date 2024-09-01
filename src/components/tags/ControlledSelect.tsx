import { categories } from "@/src/lib/definitions/tags"
import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"

interface ControlledSelectProps{
    control: Control<any>,
    options:string[],
    fieldName:string,
    defautValue?: string
}

export default function ControlledSelect({control, options, fieldName, defautValue}:ControlledSelectProps){
    return(
        <Controller
            control={control}
            name={fieldName}
            defaultValue={defautValue}
            render={({
                field: { onChange, value, name }
            }) => (
                <Autocomplete
                    options={options}
                    onChange={(e, values) => onChange(values)}
                    value={value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size="small"
                            InputLabelProps={{shrink:true}}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                              }}
                            label={name}
                            onChange={onChange}
                        />
                    )}
            />
            )}
        />
    )
}

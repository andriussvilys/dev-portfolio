import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"

interface ControlledSelectProps{
    control: Control<any>,
    options: string[],
    defautValue?: string
}

export default function ControlledSelect({control, options, defautValue}:ControlledSelectProps){
    return(
        <Controller
            control={control}
            name="category"
            defaultValue={defautValue}
            render={({
                field: { onChange, value, name },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
            }) => (
                <Autocomplete
                    freeSolo
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

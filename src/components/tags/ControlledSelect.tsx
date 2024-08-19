import { categories } from "@/src/lib/definitions/tags"
import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"

interface ControlledSelectProps{
    control: Control<any>,
    defautValue?: string
}

export default function ControlledSelect({control, defautValue}:ControlledSelectProps){
    return(
        <Controller
            control={control}
            name="category"
            defaultValue={defautValue}
            render={({
                field: { onChange, value, name }
            }) => (
                <Autocomplete
                    options={categories}
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

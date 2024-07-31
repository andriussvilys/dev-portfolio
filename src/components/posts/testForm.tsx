import { Box, Button } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

//   console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("example")} />
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      <Button type="submit">Submit</Button>
    </Box>
  )
}
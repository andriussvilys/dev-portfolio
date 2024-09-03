import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

interface FormStepperProps {
  steps: string[],
  children: React.ReactNode,
  activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>,
}

export default function FormStepper({steps, children, activeStep, setActiveStep}: FormStepperProps) {
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Stack sx={{ width: '100%', height:"100%" , maxWidth:"lg"}}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack sx={{flex:1, overflow:"hidden"}}>
        <Box sx={{height: "100%", display:"flex", justifyContent:"center", overflow:"auto"}}>
          {children}
        </Box>
      </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent:"end" }}>
            <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
        </Box>
    </Stack>
  );
}

'use client'
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import CartPage from "./CartPage"
import CheckoutPage from './CheckoutPage';
import PaymentPage from './PaymentPage';

const steps = ['Cart', 'Checkout', 'Payment'];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CartPage onNext={handleNext} />;
      case 1:
        return <CheckoutPage onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <PaymentPage onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop: "50px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
    </Box>
  );
};

export default CheckoutStepper;

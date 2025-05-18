import Button from '@mui/material/Button';

const PaymentPage = ({ onBack }) => (
  <>
    {/* Payment Options */}
    <Button onClick={onBack}>Back to Checkout</Button>
    <Button variant="contained" color="success">Pay Now</Button>
  </>
);


export default PaymentPage;
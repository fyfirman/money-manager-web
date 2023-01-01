import { InputNumber, InputNumberProps } from "antd";

interface AmountInputProps extends InputNumberProps {}

const AmountInput: React.FC<AmountInputProps> = (props) => {
  return (
    <InputNumber
      className="w-full"
      min={0}
      placeholder="Please enter amount"
      prefix="Rp."
      step={1000}
      {...props}
    />
  );
};

export default AmountInput;

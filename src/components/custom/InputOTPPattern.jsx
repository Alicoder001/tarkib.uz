import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useState } from "react";

export default function InputOTPPattern() {
  const [value, setValue] = useState("");
  return (
    <InputOTP
      onChange={(value) => {
        setValue(value);
      }}
      name="code"
      value={value}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

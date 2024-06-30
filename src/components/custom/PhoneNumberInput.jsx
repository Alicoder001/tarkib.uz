import { Input } from "../ui/input";

export default function PhoneNumberInput({ autoComplete }) {
  return (
    <Input
      id="phoneNumber"
      placeholder="Telefon raqamingizni kiriting"
      type="text"
      name="phoneNumber"
      autoComplete={autoComplete ? "tel" : "off"}
    />
  );
}

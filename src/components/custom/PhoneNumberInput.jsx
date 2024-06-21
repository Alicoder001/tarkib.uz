"use client";
import { formatPhoneNumber } from "@/utils";
import { Input } from "../ui/input";
import { useState } from "react";

export default function PhoneNumberInput() {
  const [number, setNumber] = useState("");

  function handleInput(e) {
    const {
      target: { value },
    } = e;
    const result = formatPhoneNumber(value);
    setNumber(result);
  }

  return (
    <div>
      <Input
        onChange={handleInput}
        id="phoneNumber"
        placeholder="Telefon raqamingizni kiriting"
        type="text"
        name="phoneNumber"
        value={number}
        autoComplete="off"
      />
    </div>
  );
}

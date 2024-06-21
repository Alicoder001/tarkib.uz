export function getFormData(form) {
  const data = new FormData(form);
  const result = {};
  for (const [key, value] of data.entries()) {
    result[key] = value;
  }
  return result;
}

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1 $2")
    .replace(/(\d{3})(\d)/, "$1 $2")
    .replace(/(-\d{2})(\d)/, "$1 $2")
    .replace(/(-\d{2})(\d+?)/, "$1");
}

export function validatePhoneNumber(phone: string): boolean {
  const frRegex = /^(?:\+33|0)[67]\d{8}$/;
  const trRegex = /^(?:\+90|0)5\d{9}$/;
  return frRegex.test(phone) || trRegex.test(phone);
}

export async function askCode(phone: string): Promise<void> {
  console.log("Demande de code pour :", phone);
  await new Promise((res) => setTimeout(res, 1000));
}

export async function checkCode(phone: string, code: string): Promise<boolean> {
  console.log("Vérification code", { phone, code });
  await new Promise((res) => setTimeout(res, 1000));
  return code === "123456"; // Simule code valide
}
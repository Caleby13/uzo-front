export const toFixedNumber = (digits: number) => (params: any) =>
  params.value.toFixed(digits).replace(".", ",");

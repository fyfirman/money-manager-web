export const parseToXwwwFormUrlWithSpace = (payload: object) => {
  const params = new URLSearchParams();
  Object.keys(payload).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument --- this code below is not right.
    params.append(key, (payload as any)[key]);
  });

  return params.toString().replaceAll("+", "%20");
};

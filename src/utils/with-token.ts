export const withToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
};

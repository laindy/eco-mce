const config = () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    sms: {
      url: process.env.SMS_SERVICE_URL,
      token: process.env.SMS_SERVICE_TOKEN,
    },
  };
};
export default config;

import api from ".";

export const apiOptions = {
  apiKey: "AIzaSyAKKMDaiaPrPZ33mmBrv0sOVDET9HYr3kE",
  version: "beta",
};

export const getLocation = async (identifier) => {
  try {
    const response = await api.get(
      `http://localhost:8080/api/location/${identifier}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

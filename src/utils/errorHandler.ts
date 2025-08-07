export const handleApiError = (error: unknown, defaultMessage: string): string => {
  try {
    const errorData = JSON.parse((error as Error).message);
    if (errorData.error === "Unauthorized" || errorData.error === "Invalid credentials") {
      return "Please check your credentials";
    }
    if (errorData.errors && Array.isArray(errorData.errors)) {
      return errorData.errors.join(", ");
    }
    return errorData.error || errorData.message || defaultMessage;
  } catch {
    return (error as Error).message || defaultMessage;
  }
};
export const validationSchema = {
  FullName: (value: string) => {
    if (!value || value.trim() === "") {
      return "Full name is required";
    }
    return null;
  },

  EmailAddress: (value: string) => {
    if (!value || value.trim() === "") {
      return "Email is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return null;
  },

  PhoneNumber: (value: string) => {
    if (!value || value.trim() === "") {
      return "Phone number is required";
    }

    const phoneRegex = /^\+?[0-9\s\-]+$/;
    if (!phoneRegex.test(value)) {
      return "Invalid phone number format";
    }
    return null;
  },

  totalYearsExperience: (value: string) => {
  if (!value || value.trim() === "") {
    return "Experience is required";
  }
  return null;
  },

};

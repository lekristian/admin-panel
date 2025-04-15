interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  companyName: string;
}

interface LoginResponse {
  id: string;
  email: string;
  companyName: string;
  subscription: string | null;
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      id: '1',
      email: credentials.email,
      companyName: 'Test Company',
      subscription: null,
    };
  }

  throw new Error('Invalid credentials');
};

export const registerUser = async (credentials: RegisterCredentials): Promise<LoginResponse> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: Date.now().toString(),
    email: credentials.email,
    companyName: credentials.companyName,
    subscription: null,
  };
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};
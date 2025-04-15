import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/auth';
import { registerUser } from '../../api/auth';
import { Car } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Input, Button } from '../ui';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      login(data);
      navigate('/subscription');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, companyName });
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        </CardHeader>
        
        <CardContent>
          {registerMutation.isError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
              Registration failed. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Company name"
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={registerMutation.isPending}
            >
              Create account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              as={Link}
              to="/login"
              variant="outline"
              fullWidth
            >
              Sign in instead
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
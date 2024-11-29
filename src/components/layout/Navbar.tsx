import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Gamepad2, Film, User, LogOut, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/auth';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">Lumora</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/games" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Gamepad2 className="h-5 w-5" />
                </Link>
                <Link 
                  to="/media" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Film className="h-5 w-5" />
                </Link>
                <Link 
                  to="/social-analysis" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Share2 className="h-5 w-5" />
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/login')}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
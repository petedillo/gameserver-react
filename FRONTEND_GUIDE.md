# Frontend Integration Guide

This guide explains how to update the React application's state when interacting with the GameServer Agent API.

## Prerequisites
- React 16.8 or higher (for Hooks)
- `axios` or `fetch` for API requests
- Basic understanding of React hooks (useState, useEffect)

## API Base URL
```javascript
const API_BASE_URL = 'https://api.gameserver.petedillo.com';
```

## State Management with React Hooks

### 1. Basic State Management

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function ServerStatus() {
  const [serverStatus, setServerStatus] = useState({
    isOnline: false,
    players: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/status`);
        setServerStatus({
          isOnline: response.data.isOnline,
          players: response.data.players || [],
          isLoading: false,
          error: null
        });
      } catch (error) {
        setServerStatus(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch server status'
        }));
      }
    };

    fetchServerStatus();
    
    // Optional: Set up polling
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (serverStatus.isLoading) return <div>Loading...</div>;
  if (serverStatus.error) return <div>Error: {serverStatus.error}</div>;

  return (
    <div>
      <h2>Server Status: {serverStatus.isOnline ? '🟢 Online' : '🔴 Offline'}</h2>
      <p>Players online: {serverStatus.players.length}</p>
    </div>
  );
}
```

### 2. Custom Hook for API Calls

Create a reusable hook to handle API calls and state management:

```javascript
import { useState, useCallback } from 'react';
import axios from 'axios';

export function useApi(endpoint, method = 'GET', initialData = null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (body = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data: body
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, method]);

  return { data, isLoading, error, execute };
}
```

### 3. Using the Custom Hook

```javascript
function ServerControls() {
  const { 
    data: status, 
    isLoading, 
    error, 
    execute: refreshStatus 
  } = useApi('/api/status');
  
  const { execute: startServer } = useApi('/api/start', 'POST');
  const { execute: stopServer } = useApi('/api/stop', 'POST');

  const handleStart = async () => {
    try {
      await startServer();
      // Refresh status after starting
      await refreshStatus();
    } catch (err) {
      console.error('Failed to start server:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Server Controls</h2>
      <p>Status: {status?.isOnline ? '🟢 Online' : '🔴 Offline'}</p>
      <button 
        onClick={handleStart}
        disabled={status?.isOnline}
      >
        Start Server
      </button>
      <button 
        onClick={stopServer}
        disabled={!status?.isOnline}
      >
        Stop Server
      </button>
    </div>
  );
}
```

## Error Handling

### Global Error Handler

```javascript
// In your main App.js or AppProvider
import { useEffect } from 'react';
import { useSnackbar } from 'notistack'; // or your preferred notification library

function App() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleGlobalError = (event) => {
      // Handle uncaught errors
      enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, [enqueueSnackbar]);

  // ... rest of your app
}
```

## Best Practices

1. **Loading States**: Always handle loading states to provide feedback to users.
2. **Error Boundaries**: Wrap components with error boundaries to prevent the entire app from crashing.
3. **Optimistic Updates**: For better UX, update the UI optimistically before the API call completes.
4. **Debouncing**: Use debouncing for search inputs or frequent API calls.
5. **Caching**: Consider using React Query or SWR for advanced caching and state management.

## Authentication (if needed)

If your API requires authentication, you can add an interceptor:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## CORS Configuration

The API is configured to accept requests from `gameserver.petedillo.com`. Make sure your frontend is served from this domain or update the CORS configuration in the backend.

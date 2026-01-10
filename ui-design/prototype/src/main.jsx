import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

/**
 * Attempt to mount the application.
 * If rendering throws synchronously, catch the error and display
 * a simple fallback so the user isn't left with a blank/black page.
 */
try {
  root.render(<App />);
} catch (err) {
  /* eslint-disable no-console */
  console.error('Failed to render React application:', err);
  /* eslint-enable no-console */

  root.render(
    <div
      style={{
        padding: '2rem',
        color: 'red',
        backgroundColor: '#111',
        fontFamily:
          'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Application Error</h2>
      <p>{err?.message || 'Unknown error occurred while rendering the app.'}</p>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: '0.875rem',
          marginTop: '1rem',
          color: '#f88',
        }}
      >
        {err?.stack}
      </pre>
    </div>
  );
}

'use client';

import { FC, useEffect, useState } from 'react';
import { Footer } from '../../molecules/Footer';
import { PageTitle } from '../../molecules/PageTitle';
import { FormRenderer } from '../../organisms/FormRender.tsx';
import { NavigationBar } from '../../organisms/NavigationBar';
import { FormBuilder } from '../../organisms/FormBuilder';
import { Button } from '../../atoms/Button';

type ToastPropType = {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
};
const Toast: FC<ToastPropType> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration !== null) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
        color: type === 'error' ? '#721c24' : '#155724',
        zIndex: 1000,
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{ marginLeft: '10px', cursor: 'pointer' }}
      >
        X
      </button>
    </div>
  );
};
export const CustomFormBuilder = () => {
  const [config, setConfig] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedConfig = localStorage.getItem('sheetwise_formConfig');
    if (savedConfig) {
      setConfig(savedConfig);
    }

    console.log('SAVED CONFIG MOUNTING...');
  }, []);

  const clearConfig = () => {
    setConfig('');
    localStorage.removeItem('sheetwise_formConfig');
    setMessage('Configuration cleared successfully.');
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      try {
        reader.onload = (e) => {
          const text = e.target?.result;
          setConfig(text as string);
          localStorage.setItem('sheetwise_formConfig', text as string);
          setMessage('Configuration loaded successfully.');
        };
        reader.readAsText(file);
      } catch (error) {
        setError('Failed to load the configuration file.');
        console.error('failed to upload JSON file ', error);
      }
      reader.onerror = () => {
        setError('Error reading the file.');
      };
      reader.readAsText(file);
    }
  };

  const saveConfigToFile = () => {
    try {
      const blob = new Blob([config], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'form-config.json';
      link.click();
      URL.revokeObjectURL(url);
      setMessage('Configuration saved to file.');
    } catch (error) {
      setError('Failed to save the configuration file.');
      console.error('failed to save JSON config file ', error);
    }
  };
  return (
    <div className="min-h-screen overflow-auto">
      <NavigationBar />
      <section id="about" className="min-h-screen px-4 lg:px-8">
        <PageTitle
          title={'Form Custom Builder'}
          subtitle={'Build your own form for data capturing'}
          className="lg:px-48"
        />

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <FormBuilder
              onSave={(config) => {
                setConfig(config);
                localStorage.setItem('sheetwise_formConfig', config);
                setMessage('Configuration saved successfully.');
              }}
            />
          </div>
          <div className="flex-1 p-4">
            <FormRenderer config={config} saveConfigToFile={saveConfigToFile} />
          </div>
        </div>

        {message && <Toast message={message} onClose={() => setMessage('')} />}
        {error && (
          <Toast message={error} type="error" onClose={() => setError('')} />
        )}
        <div>
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
          />
          <Button onClick={saveConfigToFile} variant={'borderMagic'}>
            Save Config
          </Button>
        </div>

        <Button onClick={clearConfig} variant={'borderMagic'}>
          Clear
        </Button>
      </section>
      <Footer />
    </div>
  );
};

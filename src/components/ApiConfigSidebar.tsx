import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { ApiConfig } from '../types';

interface ApiConfigSidebarProps {
  config: ApiConfig;
  onConfigChange: (config: ApiConfig) => void;
}

export function ApiConfigSidebar({ config, onConfigChange }: ApiConfigSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        aria-label={t('openSettings')}
      >
        <Settings className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{t('apiSettings')}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">{t('apiEndpoint')}</span>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                value={config.endpoint}
                onChange={(e) =>
                  onConfigChange({ ...config, endpoint: e.target.value })
                }
              />
            </label>

            <label className="block">
              <span className="text-gray-700">{t('apiKey')}</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                value={config.apiKey}
                onChange={(e) =>
                  onConfigChange({ ...config, apiKey: e.target.value })
                }
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                checked={config.enabled}
                onChange={(e) =>
                  onConfigChange({ ...config, enabled: e.target.checked })
                }
              />
              <span className="text-gray-700">{t('enableApi')}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
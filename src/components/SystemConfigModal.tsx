import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { Chat } from '../types';

interface SystemConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: string) => void;
  currentConfig: string;
  chat: Chat | null;
}

const PRESET_CONFIGS = [
  {
    name: 'Default Assistant',
    config: 'You are a helpful AI assistant. Reply to any query in a helpful and informative manner.',
  },
  {
    name: 'DSA Mentor',
    config: 'You are a Data Structures and Algorithms mentor. Help users understand DSA concepts, solve problems, and provide detailed explanations with time and space complexity analysis.',
  },
  {
    name: 'Code Reviewer',
    config: 'You are an experienced code reviewer. Analyze code for best practices, potential bugs, security issues, and suggest improvements.',
  },
  {
    name: 'Interview Coach',
    config: 'You are a technical interview coach. Help users prepare for coding interviews, practice problems, and provide feedback on their solutions.',
  },
  {
    name: 'Creative Writer',
    config: 'You are a creative writing assistant. Help users brainstorm ideas, improve their writing, and create engaging content.',
  },
];

export const SystemConfigModal: React.FC<SystemConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentConfig,
  chat,
}) => {
  const [config, setConfig] = useState(currentConfig);

  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handlePresetSelect = (presetConfig: string) => {
    setConfig(presetConfig);
  };

  const handleReset = () => {
    setConfig('You are a helpful AI assistant. Reply to any query in a helpful and informative manner.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">System Configuration</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Chat Info */}
          {chat && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-1">Current Chat:</h3>
              <p className="text-blue-700">{chat.title}</p>
            </div>
          )}

          {/* Preset Configurations */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Preset Configurations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRESET_CONFIGS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset.config)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{preset.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{preset.config}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Configuration */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-900">
                Custom System Configuration
              </label>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
            <textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              placeholder="Enter your custom system configuration..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              This configuration will define how the AI behaves and responds in this chat session.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
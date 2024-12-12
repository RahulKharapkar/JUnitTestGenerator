import React from 'react';
import { TestConfig } from '../types';

interface VersionSelectorProps {
  config: TestConfig;
  onConfigChange: (config: TestConfig) => void;
}

const JUNIT_VERSIONS = ['4.x', '5.x (Jupiter)'];
const MOCKITO_VERSIONS = ['3.x', '4.x', '5.x'];

export function VersionSelector({ config, onConfigChange }: VersionSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400">JUnit Version</label>
        <select
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config.junitVersion}
          onChange={(e) => onConfigChange({ ...config, junitVersion: e.target.value })}
        >
          {JUNIT_VERSIONS.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          JUnit 5 is recommended for new projects. JUnit 4 is maintained for legacy support.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400">Mockito Version</label>
        <select
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config.mockitoVersion}
          onChange={(e) => onConfigChange({ ...config, mockitoVersion: e.target.value })}
        >
          {MOCKITO_VERSIONS.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Choose a Mockito version compatible with your JUnit version.
        </p>
      </div>
    </div>
  );
}
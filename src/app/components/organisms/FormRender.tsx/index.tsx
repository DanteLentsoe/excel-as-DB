'use client';

import { Button } from '../../atoms/Button';
import { FormInput } from '../FormBuilder';

export type FormRendererProps = {
  config: string;
  saveConfigToFile: () => void;
};

export const FormRenderer: React.FC<FormRendererProps> = ({
  config,
  saveConfigToFile,
}) => {
  let inputs: FormInput[] = [];

  try {
    inputs = JSON.parse(config)?.inputs || [];
  } catch (error) {
    console.error('Invalid JSON:', error);
  }

  return (
    <div className="relative rounded-lg  p-8 shadow-lg border border-gray-800 bg-black shadow-input sm:p-12">
      <div className="mb-4">
        <h2 className="text-lg mb-2 font-semibold">
          Custom Form Configuration
        </h2>
        <p className="text-sm">
          Below is the form you have configured. This form will be used in your
          application to collect user inputs and generate Excel data. Customize
          it as needed and save your configurations to ensure accurate data
          collection and reporting.
        </p>
      </div>

      <form
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          color: 'whitesmoke',
        }}
      >
        <div
          style={{
            maxHeight: '550px',
            overflowY: 'auto',
          }}
        >
          {inputs.map((input) => (
            <div key={input.id} className="mt-2 mb-2">
              <label className="mb-8">{input.label}</label>
              {input.type === 'select' ? (
                <select
                  style={{
                    marginLeft: '10px',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {input.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  required={input.required}
                  className="w-full bg-gray-800 text-white rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
                />
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={saveConfigToFile}
          className="mt-4 w-full"
          variant={'shimmer'}
        >
          Save Form Configurations
        </Button>
      </form>
    </div>
  );
};

"use client";

import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { Button } from "../../atoms/Button";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "../../molecules/ToolTip";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { FileUpload } from "../../molecules/FileUpload";
type FormInputOption = {
  label: string;
  value: string;
};
export type FormBuilderProps = {
  onSave: (config: string) => void;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  clearConfig: () => void;
};
export type FormInput = {
  id: number;
  label: string;
  type: string;

  options?: FormInputOption[]; // For select, radio buttons, etc.
  placeholder?: string; // Useful for text inputs
  required?: boolean; // To make an input required
};

export const FormBuilder: React.FC<FormBuilderProps> = ({
  onSave,
  handleDrop,
  handleDragOver,
  handleFileUpload,
  clearConfig,
}) => {
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const savedConfig = localStorage.getItem("sheetwise_formConfig");
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setInputs(parsedConfig.inputs);
      setNextId(parsedConfig.nextId);
    }
  }, []);

  const addInput = (type: string) => {
    setInputs([...inputs, { id: nextId, label: `Input ${nextId + 1}`, type }]);
    setNextId(nextId + 1);
  };

  // Handle changes to input properties
  const updateInput = (id: number, key: keyof FormInput, value: any) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, [key]: value } : input
      )
    );
  };

  const removeInput = (id: number) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const saveForm = () => {
    onSave(JSON.stringify({ inputs, nextId }, null, 2));
  };

  const addOptionToSelect = (inputId: number) => {
    const newOption = { label: "New Option", value: "new_option" };
    setInputs(
      inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: [...(input.options || []), newOption],
            }
          : input
      )
    );
  };

  const updateOption = (
    inputId: number,
    optionIndex: number,
    key: keyof FormInputOption,
    value: string
  ) => {
    setInputs(
      inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: input.options?.map((option, index) =>
                index === optionIndex ? { ...option, [key]: value } : option
              ),
            }
          : input
      )
    );
  };

  const removeOption = (inputId: number, optionIndex: number) => {
    setInputs(
      inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: input.options?.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : input
      )
    );
  };

  const hasFormConfigs = inputs.length > 0;

  return (
    <div
      style={{
        padding: "2px",
        fontFamily: "Arial, sans-serif",
        color: "whitesmoke",
      }}>
      <div className="block rounded-lg  bg-slate-700 shadow-secondary-1 bg-surface-dark  text-surface">
        <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          Custom Form
        </div>
        <div className="px-8 mt-4">
          <div className="flex items-center space-x-2 mb-2 mt-4">
            <BsInfoCircle />
            <span data-tooltip-id="information-config-form">
              Upload Existing Form Configurations
            </span>
            <Tooltip
              anchorSelect="#example-anchor"
              className=" w-96"
              style={{
                width: "400px",
                backgroundColor: "#E3F8F6",
                color: "#292D31",
              }}
              id="information-config-form"
              place="bottom"
              text={`Easily customize your forms by adding input fields as needed.
             Each input you add will directly correspond to a column in your Excel data. 
             Simply specify the label for each input, and it will appear as a column header in the Excel sheet.
             Upload existing form configurations to quickly apply predefined structures,
             with each input added representing the custom form structure.`}
            />
          </div>
          <FileUpload
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        </div>

        <div className="w-full px-8 mt-4">
          <Button
            onClick={saveForm}
            className="w-full px-8"
            variant={"shimmer"}>
            Generate Form
          </Button>
          {hasFormConfigs && (
            <Button
              onClick={clearConfig}
              className="w-full px-8 mt-4"
              variant={"shimmer"}>
              Clear Form Config
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2 px-8 mt-4">
          <BsInfoCircle />
          <span data-tooltip-id="information-custom-form">Information</span>
          <Tooltip
            anchorSelect="#example-anchor"
            className=" w-96"
            style={{
              width: "400px",
              backgroundColor: "#E3F8F6",
              color: "#292D31",
            }}
            id="information-custom-form"
            place="bottom"
            text={`Easily customize your forms by adding input fields as needed.
             Each input you add will directly correspond to a column in your Excel data. 
             Simply specify the label for each input, and it will appear as a column header in the Excel sheet.
             with each input added respresenting the custom form structure.`}
          />
        </div>
        <div>
          <button
            onClick={() => addInput("text")}
            style={{ margin: "5px", padding: "10px 20px", cursor: "pointer" }}>
            Add Input Field
          </button>
        </div>
        <hr />
        <div className="p-6">
          <Disclosure
            as="div"
            className="mt-2 bg-slate-800/[0.8] w-full border border-white/[0.2] rounded-lg">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between border text-white border-white/[0.2] rounded-lg bg-black px-4 py-2 text-left text-sm font-medium  hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>{"Form Inputs"}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-400">
                  <div
                    className="mt-2 mb-2"
                    style={{
                      maxHeight: "550px",
                      overflowY: "auto",
                    }}>
                    {hasFormConfigs ? (
                      inputs.map((input) => (
                        <div
                          key={input.id}
                          className="flex items-center p-2.5 border w-2/3 border-gray-300 rounded-lg my-2.5">
                          <label className="flex items-center mr-2.5">
                            Label:
                            <input
                              type="text"
                              value={input.label}
                              className="w-full bg-gray-800 text-white rounded border border-stroke px-[14px] py-2 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
                              onChange={(e) =>
                                updateInput(input.id, "label", e.target.value)
                              }
                            />
                          </label>
                          <select
                            value={input.type}
                            className=" w-28 bg-gray-800 py-1 text-white rounded border border-stroke text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
                            onChange={(e) =>
                              updateInput(input.id, "type", e.target.value)
                            }>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="select">Select</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio</option>
                            <option value="textarea">Textarea</option>
                          </select>
                          {input.type === "select" && (
                            <div className="flex flex-col">
                              {input.options?.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className="flex items-center mb-1">
                                  <input
                                    type="text"
                                    value={option.label}
                                    className="p-1.5 mr-1.5"
                                    onChange={(e) =>
                                      updateOption(
                                        input.id,
                                        optIndex,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    type="text"
                                    value={option.value}
                                    className="p-1.5 mr-1.5"
                                    onChange={(e) =>
                                      updateOption(
                                        input.id,
                                        optIndex,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <button
                                    className="bg-red-500 text-white p-1.5 rounded focus:outline-none"
                                    onClick={() =>
                                      removeOption(input.id, optIndex)
                                    }>
                                    Remove Option
                                  </button>
                                </div>
                              ))}
                              <button
                                className="mt-1.5"
                                onClick={() => addOptionToSelect(input.id)}>
                                Add Option
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => removeInput(input.id)}
                            className="ml-auto p-1.5 bg-red-500 text-white rounded cursor-pointer">
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No form Input's inserted</p>
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};

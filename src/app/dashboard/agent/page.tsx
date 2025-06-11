"use client";
import { useState, useEffect } from "react";

export default function Agent() {
  const [config, setConfig] = useState<any>(null);

  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
  fetch("/stt.json")
    .then((res) => res.json())
    .then((data) => setConfig(data.providers)) // <-- important!
    .catch((err) => console.error("Failed to load config:", err));
}, []);


  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Agent Page</h1>

    {config && (
      <>
        {/* Provider Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Provider</label>
          <select
            className="border p-2 w-full"
            value={selectedProvider}
            onChange={(e) => {
              setSelectedProvider(e.target.value);
              setSelectedModel("");
              setSelectedLanguage("");
            }}
          >
            <option value="">-- Select Provider --</option>
            {Object.keys(config).map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Model Dropdown */}
        {selectedProvider && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Model</label>
            <select
              className="border p-2 w-full"
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedLanguage("");
              }}
            >
              <option value="">-- Select Model --</option>
              {Object.keys(config[selectedProvider].models).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Language Dropdown */}
        {selectedProvider && selectedModel && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Language</label>
            <select
              className="border p-2 w-full"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">-- Select Language --</option>
              {config[selectedProvider].models[selectedModel].languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Preview Card */}
{selectedProvider && selectedModel && selectedLanguage && (
  <div className="border rounded-lg p-4 bg-gray-100 mt-4 shadow-md">
    <h2 className="text-xl font-semibold mb-2">Your Selection</h2>
    <p><strong>Provider:</strong> {selectedProvider}</p>
    <p><strong>Model:</strong> {selectedModel}</p>
    <p><strong>Language:</strong> {selectedLanguage}</p>

    <button
  onClick={async () => {
    const selectedData = {
      provider: selectedProvider,
      model: selectedModel,
      language: selectedLanguage,
    };

    // Send data to backend
    const response = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedData),
    });

    if (response.ok) {
      alert("Selection submitted and saved successfully!");
      // Reset dropdowns
      setSelectedProvider("");
      setSelectedModel("");
      setSelectedLanguage("");
    } else {
      alert("Failed to save data!");
    }
  }}
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Submit
</button>

  </div>
)}

      </>
    )}
  </div>
);


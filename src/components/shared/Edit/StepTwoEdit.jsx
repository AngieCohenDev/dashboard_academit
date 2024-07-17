import React, { useState } from 'react';

const StepTwoPrueba = ({
  videos,
  handleUpdateVideo,
  prevStep,
  nextStep,
  showPrevButton = false,
  showNextButton = false,
  prevButtonText = "Anterior",
  nextButtonText = "Siguiente"
}) => {
  const [expandedVideoId, setExpandedVideoId] = useState(null);

  const toggleExpand = (videoId) => {
    setExpandedVideoId(expandedVideoId === videoId ? null : videoId);
  };

  const handleChange = (videoId, e) => {
    handleUpdateVideo(videoId, {
      ...videos.find(video => video.id === videoId),
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (videoId, e) => {
    handleUpdateVideo(videoId, {
      ...videos.find(video => video.id === videoId),
      [e.target.name]: e.target.files[0]
    });
  };

  return (
    <div className="py-3 w-11/12 mx-auto bg-white space-y-4">
      <h2 className="text-xl font-bold mb-5">Editar videos</h2>
      {videos.map((video) => (
        <div key={video.id}>
          <div
            onClick={() => toggleExpand(video.id)}
            className="cursor-pointer p-2 bg-gray-200 rounded-md"
          >
            {video.title}
          </div>
          {expandedVideoId === video.id && (
            <div className="p-4 border border-gray-300 rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {video.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium">{field.label}</label>
                    {field.type === 'text' && (
                      <input
                        type="text"
                        name={field.name}
                        value={video[field.name] || ''}
                        onChange={(e) => handleChange(video.id, e)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    {field.type === 'number' && (
                      <input
                        type="number"
                        name={field.name}
                        value={video[field.name] || ''}
                        onChange={(e) => handleChange(video.id, e)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    {field.type === 'select' && (
                      <select
                        name={field.name}
                        value={video[field.name] || ''}
                        onChange={(e) => handleChange(video.id, e)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        {field.options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === 'file' && (
                      <input
                        type="file"
                        name={field.name}
                        onChange={(e) => handleFileChange(video.id, e)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    {field.type === 'button' && (
                      <button
                        type='button'
                        onClick={() => alert('Subir Material')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
                      >
                        Editar material
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between">
        {showPrevButton && (
          <button
            onClick={prevStep}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            {prevButtonText}
          </button>
        )}
        {showNextButton && (
          <button
            onClick={nextStep}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {nextButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepTwoPrueba;

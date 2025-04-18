import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        setError("Please select a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("userEmail", localStorage.getItem("userEmail"));

    try {
      const response = await fetch("http://localhost:5000/medical/upload-prescription", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setUploadSuccess(true);
        setTimeout(() => navigate("/chat"), 1500);
      } else {
        setError(data.error || "Failed to upload prescription");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const skipUpload = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Upload Prescription</h1>
                <p className="text-gray-600 mt-1">Upload your prescription for better medication tracking</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Section - Information */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Why Upload Your Prescription?</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-indigo-600">1</div>
                      <h3 className="font-medium text-gray-800">Medication Tracking</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-11">MedBot will track your medications and remind you when to take them.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-indigo-600">2</div>
                      <h3 className="font-medium text-gray-800">Side Effect Monitoring</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-11">Get alerts about potential side effects and drug interactions.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-indigo-600">3</div>
                      <h3 className="font-medium text-gray-800">Better Recommendations</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-11">MedBot provides more personalized health insights based on your medications.</p>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-medium mb-2">Accepted File Types:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>PDF files only</li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 mt-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h2 className="text-lg font-semibold">Privacy Notice</h2>
                </div>
                
                <p className="text-indigo-100 text-sm">
                  Your prescription data is encrypted and stored securely. We never share your medical information with third parties.
                </p>
              </div>
            </div>
            
            {/* Right Section - Upload Form */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full border border-gray-100">
                <div className="max-w-lg mx-auto py-8">
                  {uploadSuccess ? (
                    <div className="text-center">
                      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Successful!</h2>
                      <p className="text-gray-600 mb-4">Your prescription has been uploaded successfully.</p>
                      <p className="text-gray-600">Redirecting to chat...</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Prescription</h2>
                      <p className="text-gray-600 mb-8">Upload your prescription PDF to help us provide better medication tracking and recommendations.</p>
                      
                      {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-600">{error}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 hover:border-indigo-500 transition duration-300">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            {file ? (
                              <span className="text-indigo-600 font-medium">{file.name}</span>
                            ) : (
                              <span>Drag and drop your PDF here, or click to select</span>
                            )}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">PDF files only, up to 10MB</p>
                          <input 
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                          />
                          <label 
                            htmlFor="file-upload" 
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            Select File
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleUpload}
                          disabled={loading || !file}
                          className={`px-6 py-3 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center ${
                            loading || !file ? "bg-indigo-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          }`}
                        >
                          {loading && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                          {loading ? "Uploading..." : "Upload & Continue"}
                        </button>
                        
                        <button
                          onClick={skipUpload}
                          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition duration-300 flex items-center justify-center border border-gray-300"
                        >
                          Skip for Now
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescription;

//cdoe 1 working
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UploadPrescription = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       navigate("/chat"); // Skip upload if no file selected
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("prescription", file);
//     formData.append("userEmail", localStorage.getItem("userEmail")); // Attach user email if needed
//     console.log("User Email:", localStorage.getItem("userEmail"));

//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/medical/upload-prescription", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("Upload response:", data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }

//     setLoading(false);
//     navigate("/chat"); // Proceed to chatbot
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//           Upload Your Prescription (Optional)
//         </h2>

//         <label className="block w-full cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md mb-4 hover:bg-gray-300 transition">
//           <input 
//             type="file"
//             accept="application/pdf"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           {file ? file.name : "Choose a PDF File"}
//         </label>

//         <div className="flex gap-4 justify-center mt-4">
//           <button
//             onClick={handleUpload}
//             className={`px-6 py-3 rounded-lg text-white font-medium transition duration-300 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Upload & Continue"}
//           </button>

//           <button
//             onClick={() => navigate("/chat")}
//             className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition duration-300"
//           >
//             Continue Without Uploading
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadPrescription;

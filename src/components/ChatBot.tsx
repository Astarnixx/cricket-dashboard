'use client';

export default function ChatBot() {
  return (
    <div className="flex flex-col h-96 p-4 bg-white dark:bg-gray-800 rounded shadow">
  <div className="flex-1 overflow-y-auto space-y-2 mb-4">
    <div className="max-w-[60%] ml-auto bg-blue-500 text-white rounded-lg p-3">
      User message
    </div>
    <div className="max-w-[60%] mr-auto bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
      Bot response
    </div>
  </div>
  <div className="flex gap-2">
    <input className="flex-1 border rounded p-2" placeholder="Ask a question..." />
    <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
  </div>
  </div>
  );
}   

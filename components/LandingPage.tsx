import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './common/Card';
import Button from './common/Button';

interface Design {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const LandingPage: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-domain.com/api/cobit'  // Update this with your actual backend URL
        : 'http://localhost:5000/api/cobit';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch designs');
      }
      const data = await response.json();
      setDesigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/design-factor/df1');
  };

  const handleLoadDesign = (designId: string) => {
    navigate(`/design-factor?load=${designId}`);
  };

  const handleDeleteDesign = async (designId: string, designName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${designName}"?`)) {
      return;
    }

    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-domain.com/api/cobit'  // Update this with your actual backend URL
        : 'http://localhost:5000/api/cobit';
      const response = await fetch(`${apiUrl}/${designId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete design');
      }

      // Remove from local state
      setDesigns(designs.filter(design => design._id !== designId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete design');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            COBIT® Governance Design Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Design, analyze, and save your COBIT governance systems with AI assistance
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to the COBIT® Governance Design Tool
          </h2>
          <p className="text-gray-600 mb-6">
            This interactive application is designed to guide you through the process of creating a tailored I&T (Information & Technology) governance system for your enterprise, based on the COBIT® 2019 framework.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              How to Use This Tool
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Follow these steps to design your governance system.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-800">Navigate Using the Sidebar</p>
                  <p className="text-sm text-gray-600">Use the navigation menu on the left to select a Design Factor. Factors are grouped into "Initial Scope" and "Scope Refinement" stages.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-800">Provide Your Input</p>
                  <p className="text-sm text-gray-600">Each Design Factor page has an "Input Section" where you can use sliders and controls to enter values.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-800">View Immediate Results</p>
                  <p className="text-sm text-gray-600">An "Output Section" on the same page will update immediately to show how a single factor influences the priority of the 40 COBIT Governance and Management Objectives, including a data table and a radar chart.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <p className="font-medium text-gray-800">Review Summaries</p>
                  <p className="text-sm text-gray-600">Visit corresponding "Summary" pages (e.g., "Step 2 Summary") after completing factors in a stage to see combined results.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <div>
                  <p className="font-medium text-gray-800">Conclude Your Design</p>
                  <p className="text-sm text-gray-600">The "Final Summary (Canvas)" page provides a consolidated view, allowing manual adjustments, viewing recommended capability levels, and printing/saving the final report.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              Get Started with Enterprise Strategy (DF1) →
            </Button>
          </div>
        </div>



        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Saved Designs Section */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Saved Designs ({designs.length})
          </h2>
          
          {designs.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-500">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-medium mb-2">No designs yet</h3>
                <p>Create your first COBIT governance design to get started!</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <Card key={design._id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {design.name}
                      </h3>
                      <button
                        onClick={() => handleDeleteDesign(design._id, design.name)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Delete design"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    {design.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {design.description}
                      </p>
                    )}
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <div>Created: {formatDate(design.createdAt)}</div>
                      <div>Updated: {formatDate(design.updatedAt)}</div>
                    </div>
                    
                                         <Button
                       onClick={() => handleLoadDesign(design._id)}
                       className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                     >
                       📂 Load Design
                     </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 
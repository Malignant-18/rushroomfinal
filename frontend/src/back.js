import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Star } from 'lucide-react';

const ToiletFinder = () => {
  // State management
  const [toilets, setToilets] = useState([]);
  const [filters, setFilters] = useState({
    accessible: false,
    free: false,
    minRating: 0
  });
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [mapZoom, setMapZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch toilets with filters
  useEffect(() => {
    const fetchToilets = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({
          accessible: filters.accessible,
          free: filters.free,
          minRating: filters.minRating
        });
        
        const response = await fetch(`http://localhost:3000/api/toilets?${params}`);
        if (!response.ok) throw new Error('Failed to fetch toilets');
        
        const data = await response.json();
        setToilets(data);
      } catch (err) {
        setError('Error loading toilets. Please try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchToilets();
  }, [filters]);

  // Fetch reviews for selected toilet
  const fetchReviews = async (toiletId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/toilets/${toiletId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // Convert coordinates to map position
  const coordsToPosition = (lat, lng) => ({
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100
  });

  return (
    <div className="flex h-screen">
      {/* Map Section */}
      <div className="w-2/3 h-full relative bg-gray-100 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <p>Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="absolute top-4 left-4 right-4 bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={() => setMapZoom(z => Math.min(z + 0.2, 2))}
            className="w-8 h-8 p-0"
          >
            +
          </Button>
          <Button
            onClick={() => setMapZoom(z => Math.max(z - 0.2, 0.5))}
            className="w-8 h-8 p-0"
          >
            -
          </Button>
        </div>

        {/* Map Content */}
        <div 
          className="absolute inset-0 transform"
          style={{
            transform: `scale(${mapZoom}) translate(-${mapCenter.x}%, -${mapCenter.y}%)`
          }}
        >
          {toilets.map(toilet => {
            const pos = coordsToPosition(toilet.latitude, toilet.longitude);
            return (
              <div
                key={toilet.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <button
                  onClick={() => {
                    setSelectedToilet(toilet);
                    fetchReviews(toilet.id);
                  }}
                  className="group relative"
                >
                  <MapPin 
                    className={`w-6 h-6 ${
                      selectedToilet?.id === toilet.id 
                        ? 'text-blue-500' 
                        : 'text-gray-600'
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                    <Card className="p-2 text-sm whitespace-nowrap">
                      <p className="font-bold">{toilet.name}</p>
                      <p>Rating: {Number(toilet.average_rating).toFixed(1)}/5</p>
                    </Card>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Details Section */}
      <div className="w-1/3 p-4 overflow-y-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessible"
                  checked={filters.accessible}
                  onCheckedChange={(checked) => 
                    setFilters(f => ({...f, accessible: checked}))
                  }
                />
                <label htmlFor="accessible">Wheelchair Accessible</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free"
                  checked={filters.free}
                  onCheckedChange={(checked) => 
                    setFilters(f => ({...f, free: checked}))
                  }
                />
                <label htmlFor="free">Free to Use</label>
              </div>

              <div>
                <label>Minimum Rating</label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  value={filters.minRating}
                  onChange={(e) => 
                    setFilters(f => ({...f, minRating: e.target.value}))
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedToilet && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{selectedToilet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedToilet.address}</p>
              <p>Opening Hours: {selectedToilet.opening_hours || 'Not specified'}</p>
              <p>Rating: {Number(selectedToilet.average_rating).toFixed(1)}/5</p>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Reviews</h4>
                {reviews.length === 0 ? (
                  <p>No reviews yet</p>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} className="mb-2 p-2 bg-gray-100 rounded">
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ToiletFinder;
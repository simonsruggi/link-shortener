import React, { useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Link } from "lucide-react";

const LinkShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('An error occurred while shortening the URL');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="url"
                placeholder="Enter your long URL here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Shorten URL
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {shortUrl && (
            <Alert className="mt-4 w-full">
              <Link className="h-4 w-4" />
              <AlertDescription>
                Your shortened URL: 
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline ml-1">
                  {shortUrl}
                </a>
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mt-4 w-full bg-red-100 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LinkShortener;
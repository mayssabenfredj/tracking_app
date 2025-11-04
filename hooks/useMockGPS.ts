import { useState, useEffect } from 'react';

export interface GPSPosition {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: number;
}

/**
 * Mock GPS hook that simulates real-time position updates from hardware GPS.
 * Generates a realistic path with smooth movement and occasional speed/direction changes.
 *
 * In production, replace this with WebSocket/API calls to your hardware GPS backend.
 */
export function useMockGPS(updateIntervalMs: number = 1000): GPSPosition {
  const [position, setPosition] = useState<GPSPosition>({
    // Starting position: Tunis, Tunisia
    latitude: 36.8065,
    longitude: 10.1815,
    altitude: 35,
    accuracy: 5,
    speed: 0,
    heading: 0,
    timestamp: Date.now(),
  });

  useEffect(() => {
    let currentLat = 36.8065; // Tunis
    let currentLon = 10.1815;
    let currentHeading = Math.random() * 360; // Random initial direction
    let currentSpeed = 8 + Math.random() * 12; // 8-20 m/s (~29-72 km/h)

    const interval = setInterval(() => {
      // Simulate realistic movement:
      // - Small random changes in heading (±5 degrees)
      // - Small random changes in speed (±2 m/s)
      // - Move position based on speed and heading

      currentHeading += (Math.random() - 0.5) * 10; // ±5 degrees change
      currentSpeed += (Math.random() - 0.5) * 4; // ±2 m/s change
      currentSpeed = Math.max(5, Math.min(25, currentSpeed)); // Clamp 5-25 m/s

      // Convert heading to radians
      const headingRad = (currentHeading * Math.PI) / 180;

      // Calculate movement (approximation: 1 degree latitude ≈ 111km)
      const distanceMeters = currentSpeed * (updateIntervalMs / 1000);
      const deltaLat = (distanceMeters * Math.cos(headingRad)) / 111000;
      const deltaLon =
        (distanceMeters * Math.sin(headingRad)) /
        (111000 * Math.cos((currentLat * Math.PI) / 180));

      currentLat += deltaLat;
      currentLon += deltaLon;

      setPosition({
        latitude: currentLat,
        longitude: currentLon,
        altitude: 35 + Math.random() * 10 - 5, // 30-40m altitude variation
        accuracy: 3 + Math.random() * 4, // 3-7m accuracy
        speed: currentSpeed,
        heading: currentHeading % 360,
        timestamp: Date.now(),
      });
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs]);

  return position;
}

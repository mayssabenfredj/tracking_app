import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface OpenStreetMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  showMarker?: boolean;
  followPosition?: boolean; // Si true, la carte suit le marqueur; si false, seul le marqueur bouge
  onMapReady?: () => void;
}

/**
 * OpenStreetMap component using Leaflet.js in a WebView.
 * No native dependencies required - pure JavaScript map rendering.
 */
export default function OpenStreetMap({
  latitude,
  longitude,
  zoom = 15,
  showMarker = true,
  followPosition = true,
  onMapReady,
}: OpenStreetMapProps) {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    // Update marker position (and optionally map center) when position changes
    if (webViewRef.current) {
      const js = `
        if (window.map && window.marker) {
          ${followPosition ? `window.map.setView([${latitude}, ${longitude}], ${zoom});` : ''}
          // Animate marker movement smoothly
          if (window.marker._latlng) {
            var oldLatLng = window.marker.getLatLng();
            var newLatLng = L.latLng(${latitude}, ${longitude});
            var startTime = Date.now();
            var duration = 800; // 800ms animation
            
            function animateMarker() {
              var elapsed = Date.now() - startTime;
              var progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth animation
              var easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
              
              var lat = oldLatLng.lat + (newLatLng.lat - oldLatLng.lat) * easeProgress;
              var lng = oldLatLng.lng + (newLatLng.lng - oldLatLng.lng) * easeProgress;
              
              window.marker.setLatLng([lat, lng]);
              
              if (progress < 1) {
                requestAnimationFrame(animateMarker);
              }
            }
            
            animateMarker();
          } else {
            window.marker.setLatLng([${latitude}, ${longitude}]);
          }
        }
        true; // Return value required
      `;
      webViewRef.current.injectJavaScript(js);
    }
  }, [latitude, longitude, zoom, followPosition]);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        #map {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Initialize map
        const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
        window.map = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add marker if enabled
        ${showMarker ? `
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 20px; height: 20px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        
        const marker = L.marker([${latitude}, ${longitude}], { icon: customIcon }).addTo(map);
        window.marker = marker;
        ` : ''}

        // Notify React Native when map is ready
        setTimeout(() => {
          window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'mapReady' }));
        }, 500);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webview}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'mapReady' && onMapReady) {
              onMapReady();
            }
          } catch (e) {
            // Ignore parse errors
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

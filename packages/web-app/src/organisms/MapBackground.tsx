import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Vehicle } from "ws-backend/types/vehicle.ts";
import barcelonaArea from "../assets/zones/barcelona.json";
import { yColors } from "../theme/colors.tsx";
//mapboxgl.accessToken = import.meta.env.MAPBOX_API_KEY;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3VpZ3VpbGxlIiwiYSI6ImNtMHdrcjV4ZTAzMG8yaXF2ZnVjbGtpbWkifQ.JOqHUo__6O4vi7K_L8kajQ";
const barcelonaCoordinates = [41.390205, 2.154007];

type MapType = mapboxgl.Map & {
  markers: Record<string, mapboxgl.Marker>;
  onMarkerClick: (_marker: mapboxgl.Marker, _vehicle: Vehicle) => void;
};

export function MapBackground({
  vehicles,
  onSelect,
}: {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<MapType>();
  const [zoom] = useState(12);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!map.current) {
      map.current = initializeMap(
        mapContainer.current || document.createElement("div"),
      );
    }

    if (map.current) {
      map.current.addControl(new mapboxgl.FullscreenControl());
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );
    }
  }, [zoom]);

  useEffect(() => {
    if (!map.current || !vehicles.length) return;
    else {
      vehicles.forEach((vehicle: Vehicle) => {
        const markerId = vehicle.id;

        if (markers.current[markerId]) {
          markers.current[markerId].setLngLat([vehicle.lng, vehicle.lat]);
        } else {
          const el = document.createElement("div");
          el.style.backgroundImage = `url(/assets/marker-${vehicle.status.toLowerCase()}.png)`;
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.backgroundSize = "100%";

          if (map.current) {
            const marker = new mapboxgl.Marker(el)
              .setLngLat([vehicle.lng, vehicle.lat])
              .addTo(map.current);

            // Guardamos el marcador en la referencia para futuras actualizaciones
            markers.current[markerId] = marker;

            // Añadimos evento de clic al marcador
            marker.getElement().addEventListener("click", () => {
              onSelect(vehicle);
            });
          }
        }
      });
    }
  }, [vehicles, onSelect]);

  return (
    <div className="App">
      <div
        ref={mapContainer}
        className="map-container h-full absolute top-0 -z-40 w-full"
      />
    </div>
  );
}

function initializeMap(containerId: HTMLDivElement) {
  const map = new mapboxgl.Map({
    container: containerId,
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 13,
    center: [barcelonaCoordinates[1], barcelonaCoordinates[0]],
  });

  map.on("load", () => {
    map.addSource("zones", {
      type: "geojson",
      data: barcelonaArea as GeoJSON.FeatureCollection<GeoJSON.Geometry>,
    });

    map.addLayer({
      id: "zones-layer",
      type: "fill",
      source: "zones",
      layout: {},
      paint: {
        "fill-color": yColors.text.primary,
        "fill-opacity": 0.3,
      },
    });
  });

  return Object.assign(map, {
    markers: {} as Record<string, mapboxgl.Marker>,
    // On the React side we'll replace this function with
    // the callback from the component properties
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMarkerClick: (_marker: mapboxgl.Marker, _vehicle: Vehicle) => {},
  });
}

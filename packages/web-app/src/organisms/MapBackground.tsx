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
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapType | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = initializeMap(mapContainer.current!);
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
  }, []);

  useEffect(() => {
    if (!map.current || !vehicles.length) return;

    vehicles.forEach((vehicle) => {
      const markerId = vehicle.id;

      if (markers.current[markerId]) {
        markers.current[markerId].setLngLat([vehicle.lng, vehicle.lat]);
      } else {
        const isVehicleSelected = selectedVehicle?.id === vehicle.id;
        const el = document.createElement("div");
        el.style.backgroundImage = `url(/assets/marker-${vehicle.status.toLowerCase()}${isVehicleSelected ? "" : "-unselected"}.png)`;
        el.style.width = isVehicleSelected ? "32px" : "18px";
        el.style.height = isVehicleSelected ? "38px" : "18px";
        el.style.backgroundSize = "100%";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([vehicle.lng, vehicle.lat])
          .addTo(map.current!);
        markers.current[markerId] = marker;
        marker.getElement().addEventListener("click", () => {
          onSelect(vehicle);
          setSelectedVehicle(vehicle);
        });
      }
    });
  }, [vehicles, onSelect, selectedVehicle]); // Dependencias actualizadas para manejar el estado del marcador seleccionado

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

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "ws-backend/types/socket.ts";
import Search from "./molecules/Search.tsx";
import { Vehicle } from "ws-backend/types/vehicle.ts";
import { yColors } from "./theme/colors.tsx";
import "./output.css";
import "./theme/global.css";
import { NavBar } from "./organisms/NavBar.tsx";
import { IconContext } from "react-icons";
import { MapBackground } from "./organisms/MapBackground.tsx";
import { VehicleDetails } from "./molecules/VehicleDetailsPanel.tsx";
import * as _ from "lodash";

function App() {
  const socketClient = useRef(
    io("http://localhost:3001", {
      autoConnect: false,
    }) as Socket<ServerToClientEvents, ClientToServerEvents>,
  );

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | undefined>(
    vehicles[0],
  );

  useEffect(() => {
    const socket = socketClient.current;

    socket?.on("vehicle", (vehicle: Vehicle) => {
      setVehicles((prevVehicles) => {
        const vehicleIndex = prevVehicles.findIndex((v) => v.id === vehicle.id);

        if (vehicleIndex !== -1) {
          return [
            ...prevVehicles.slice(0, vehicleIndex),
            vehicle,
            ...prevVehicles.slice(vehicleIndex + 1),
          ];
        }

        return [...prevVehicles, vehicle];
      });
    });

    socket?.on("vehicles", (vehicles) => {
      setVehicles(vehicles);
      if (!filteredVehicles.length) setFilteredVehicles(vehicles);
    });

    socket?.connect();

    return () => {
      socket?.off("vehicle");
      socket?.disconnect();
    };
  }, []);

  const handleSearch = (query: string) => {
    const filtered = _.isEmpty(query)
      ? vehicles
      : vehicles.filter(
          (vehicle) =>
            vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.plate_number.toLowerCase().includes(query.toLowerCase()),
        );
    setFilteredVehicles(filtered);
  };

  return (
    <IconContext.Provider
      value={{ color: yColors.text.primary, className: "global-class-name" }}
    >
      <div>
        <NavBar>
          <>
            <Search onSearch={handleSearch} />
            {filteredVehicles.length > 0 && (
              <span
                className={
                  " font-inter text-sm font-light text-gray-400 flex-row flex"
                }
              >
                {filteredVehicles.length} vehículos
              </span>
            )}
          </>
        </NavBar>
        <MapBackground
          vehicles={filteredVehicles}
          onSelect={(a: Vehicle) => setCurrentVehicle(a)}
        />
        {currentVehicle && <VehicleDetails vehicle={currentVehicle} />}
      </div>
    </IconContext.Provider>
  );
}

export default App;

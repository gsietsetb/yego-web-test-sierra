import { Vehicle } from "ws-backend/types/vehicle.ts";
import { vehicleColor } from "../theme/colors.tsx";
import { percentFormat } from "../utils.tsx";
import { Pill } from "../atoms/Pill.tsx";

export function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div
      className={
        "sm:rounded-md sm:w-96 w-full absolute sm:relative bottom-0 sm:mx-12 sm:my-6 sm:bg-bg_secondary rounded-2xl border-gray-400 sm:p-2"
      }
    >
      <div className={"bg-white rounded-md p-2 gap-2"}>
        <div className={"bg-white gap-2 flex flex-row mb-4"}>
          <img
            src={"/assets/scooter-illustration.png"}
            alt={vehicle.name}
            className={"object-contain"}
          />
          <div
            className={
              "flex flex-col items-start justify-center text-lg font-semibold capitalize text-text_primary gap-2"
            }
          >
            <span>{vehicle.name}</span>
            <Pill
              bgColor={vehicleColor[vehicle.status].bg}
              textColor={vehicleColor[vehicle.status].text}
              label={vehicle.status}
            ></Pill>
            <div
              className={
                "bg-primary lowercase px-2 py-1 rounded-full text-white text-xs"
              }
              style={{
                backgroundColor: vehicleColor[vehicle.status].bg,
              }}
            >
              {vehicle.status}
            </div>
            <div
              className={"bg-primary rounded-full px-2 py-1 text-white text-xs"}
            >
              {percentFormat(vehicle.battery)}%
            </div>
          </div>
        </div>
        <hr />
        <div className={"w-full flex flex-row justify-between sm:flex-row"}>
          <p className={"flex text-text_primary gap-2"}>
            Plate:
            <strong className={"ml-2 uppercase"}>{vehicle.plate_number}</strong>
          </p>
          <p className={"flex text-text_primary"}>
            Battery:
            <strong className={" ml-2"}>
              {percentFormat(vehicle.battery)}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

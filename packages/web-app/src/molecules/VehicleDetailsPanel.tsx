import { Vehicle } from "ws-backend/types/vehicle.ts";
import { vehicleColor } from "../theme/colors.tsx";
import { percentFormat } from "../utils.tsx";
import { Pill } from "../atoms/Pill.tsx";

export function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div
      className={
        "sm:rounded-md sm:w-96 w-full absolute sm:relative bottom-0 sm:mx-12 sm:my-6 sm:bg-bg_secondary shadow-md rounded-2xl border-gray-400 sm:p-2"
      }
    >
      <div
        className={"bg-white sm:rounded-md p-3 gap-2 shadow-md rounded-t-2xl "}
      >
        <div className={"bg-white gap-4 flex flex-row mb-4"}>
          <img
            src={"/assets/scooter-illustration.png"}
            alt={vehicle.name}
            className={"object-contain"}
          />
          <div
            className={
              "flex flex-col items-start justify-start text-lg font-semibold capitalize text-text_primary gap-2"
            }
          >
            <span>{vehicle.name}</span>
            <Pill
              bgColor={vehicleColor[vehicle.status].bg}
              textColor={vehicleColor[vehicle.status].text}
              label={vehicle.status.toLowerCase()}
            />
          </div>
        </div>
        <hr />
        <div
          className={
            "w-full py-2 sm:pt-3 mb-2 sm:mb-0 flex flex-row justify-between sm:flex-col"
          }
        >
          <p className={"flex text-text_primary gap-2 w-full"}>
            Plate:
            <strong className={"ml-2 uppercase"}>{vehicle.plate_number}</strong>
          </p>
          <p
            className={"flex font-inter text-text_primary justify-start w-full"}
          >
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

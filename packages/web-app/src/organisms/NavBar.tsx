import * as React from "react";
import { CiMenuBurger } from "react-icons/ci";

export const NavBar = ({ children }: { children: React.ReactElement }) => {
  return (
    <div
      className={
        "flex sm:mt-6 flex-row gap-12 justify-between sm:mx-12 items-center px-3 py-2 bg-white sm:rounded-full shadow-md"
      }
    >
      <div className={"flex flex-row gap-2 items-center"}>
        <img src="/assets/yego.png" className={"h-12 w-12 mr-5"} alt="logo" />
        <div
          className={
            "sm:flex hidden rounded-full my-1 h-12 items-center w-24 justify-center px-4 flex-row gap-2 text-white bg-brand_green"
          }
        >
          {"Menu"}
        </div>
        <div
          className={
            "sm:flex hidden rounded-full my-1 h-12 items-center text-text_primary w-24 justify-center px-4 flex-row gap-2  bg-bg_secondary"
          }
        >
          {"Settings"}
        </div>
        {children}
      </div>
      <CiMenuBurger className={"sm:hidden"} />
    </div>
  );
};

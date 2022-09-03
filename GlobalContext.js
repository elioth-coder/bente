import React from "react"
import DBConnection from "./utils/DBConnection";

export const GlobalContext = React.createContext();

export const globals = {
  db: new DBConnection("pos")
}
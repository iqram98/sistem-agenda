import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [datas, setDatas] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [notif, setNotif] = useState(null);
  const [onRefresh, setOnRefresh] = useState(false);

  return (
    <DataContext.Provider
      value={[datas, setDatas, dataUser, setDataUser, notif, setNotif]}
    >
      {props.children}
    </DataContext.Provider>
  );
};

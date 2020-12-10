import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [datas, setDatas] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [notif, setNotif] = useState(null);
  const [onRefresh, setOnRefresh] = useState(true);
  const [invite, setInvite] = useState(null);
  const [vote, setVote] = useState(null);
  const [terlaksana, setTerlaksana] = useState(null);
  const [token, setToken] = useState("");
  const [pribadi, setPribadi] = useState(null);

  return (
    <DataContext.Provider
      value={[
        datas,
        setDatas,
        dataUser,
        setDataUser,
        notif,
        setNotif,
        invite,
        setInvite,
        vote,
        setVote,
        terlaksana,
        setTerlaksana,
        token,
        setToken,
        pribadi,
        setPribadi,
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};

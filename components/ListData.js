import React from "react";
import { StyleSheet } from "react-native";

import Card from "./Card";
import DateContainer from "./DateContainer";
import DescContainer from "./DescContainer";

const ListData = (props) => {
  let newDate = props.data.waktu_agenda.slice(0, 10).split("-");
  return (
    <Card
      style={styles.card}
      color={
        props.data.status_agenda === "undangan" ||
        props.data.status_agenda === "terlaksana"
          ? "secondary"
          : "primary"
      }
    >
      <DateContainer day={newDate[2]} month={`${newDate[1]}, ${newDate[0]}`} />
      <DescContainer
        title={props.data.nama_agenda}
        time={props.data.waktu_agenda.slice(11, 19)}
        status={props.data.status_agenda}
        date={props.data.waktu_agenda.slice(0, 10)}
        idAgenda={props.data.id_agenda}
      />
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: 140,
  },
});

export default ListData;

import React from "react";
import { StyleSheet } from "react-native";

import Card from "./Card";
import DateContainer from "./DateContainer";
import DescContainer from "./DescContainer";

const ListDataPribadi = (props) => {
  let newDate = props.data.waktu_kegiatan.slice(0, 10).split("-");
  return (
    <Card style={styles.card} color={"primary"}>
      <DateContainer day={newDate[2]} month={`${newDate[1]}, ${newDate[0]}`} />
      <DescContainer
        title={props.data.nama_kegiatan}
        time={props.data.waktu_kegiatan.slice(11, 19)}
        status={props.data.status_kegiatan}
        date={props.data.waktu_kegiatan.slice(0, 10)}
        idAgenda={props.data.id_kegiatan}
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

export default ListDataPribadi;

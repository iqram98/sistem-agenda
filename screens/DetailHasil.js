import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../constants/Color";
import ImageViewer from "react-native-image-zoom-viewer";
import Axios from "axios";

const DetailHasil = (props) => {
  const { detailData } = props.route.params;
  const [openModal, setOpenModal] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [indexGambar, setIndexGambar] = useState(0);
  const [hasilImg, setHasilImg] = useState([]);
  const [hasilPdf, setHasilPdf] = useState([]);

  useEffect(() => {
    if (!hasil) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/file/${detailData.id_agenda}`
      ).then((res) => {
        setHasil(res.data);
        let img = res.data.filter((hasil) => {
          if (hasil.link_file.split(".")[1] == "jpg") {
            return true;
          }
        });
        let imgBaru = [];
        img.map((data) => {
          imgBaru = [
            ...imgBaru,
            {
              url: `https://simleg-dprdsulteng.com/assets/uploads/hasil/${data.link_file}`,
              nama: data.link_file.substring(6),
            },
          ];
        });
        setHasilImg(imgBaru);
        let pdf = res.data.filter((hasil) => {
          if (hasil.link_file.split(".")[1] == "pdf") {
            return true;
          }
        });
        let pdfBaru = [];
        pdf.map((data) => {
          pdfBaru = [
            ...pdfBaru,
            {
              url: `https://simleg-dprdsulteng.com/assets/uploads/hasil/${data.link_file}`,
              nama: data.link_file.substring(6),
            },
          ];
        });
        setHasilPdf(pdfBaru);
      });
    }
  });

  return (
    <ScrollView style={styles.screen}>
      {detailData !== null ? (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => props.navigation.navigate("HasilKegiatan")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={25}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Detail Hasil Kegiatan
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nama Kegiatan</Text>
            <Text style={styles.dateTime}>{detailData.nama_agenda}</Text>
            <Text style={styles.title}>Waktu</Text>
            <Text style={styles.dateTime}>
              {detailData.waktu_agenda.slice(8, 10)} -{" "}
              {detailData.waktu_agenda.slice(5, 7)} -{" "}
              {detailData.waktu_agenda.slice(0, 4)}
            </Text>
            <Text style={styles.title}>Dokumentasi Hasil</Text>
            <View>
              {hasilImg.length > 0 ? (
                <View style={styles.imgContainer}>
                  {hasilImg.map((data, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setOpenModal(true);
                        setIndexGambar(index);
                      }}
                      style={styles.imgCnt}
                    >
                      <Image
                        source={{
                          uri: data.url,
                        }}
                        style={styles.image}
                      />
                      <Text>{data.nama}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Belum ada...</Text>
                </View>
              )}
            </View>
            <Text style={styles.title}>Berkas Hasil</Text>
            <View>
              {hasilPdf.length > 0 ? (
                <View style={styles.imgContainer}>
                  {hasilPdf.map((data, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.navigation.navigate("HalamanPdf", {
                          url: data.url,
                        });
                      }}
                      style={styles.imgCnt}
                    >
                      <AntDesign name="pdffile1" size={60} color="black" />
                      <Text>{data.nama}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Belum ada...</Text>
                </View>
              )}
            </View>
          </View>
          <Modal
            visible={openModal}
            transparent={true}
            onRequestClose={() => setOpenModal(false)}
          >
            <ImageViewer
              index={indexGambar}
              enableSwipeDown
              imageUrls={hasilImg}
              onSwipeDown={() => setOpenModal(false)}
            />
          </Modal>
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    marginTop: 28,
    flex: 1,
    backgroundColor: "white",
  },
  imgContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  back: {
    marginHorizontal: 20,
  },
  titleContainer: {
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  dateTime: {
    color: "#777",
  },
  status: {
    color: "#777",
    fontStyle: "italic",
  },
  descContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  jumlahContainer: {
    backgroundColor: Color.backgroundSecondary,
    height: 50,
    borderRadius: 10,
    width: "70%",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 50,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "15%",
  },
  buttonHasil: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: Color.buttonSecondary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonDraft: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: Color.buttonTertiary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  tidakDraft: {
    alignSelf: "center",
    color: "red",
    marginVertical: 10,
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  isiContainer: {
    width: "90%",

    marginTop: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  imgCnt: {
    alignItems: "center",
    marginHorizontal: 5,
    width: "30%",
  },
});

export default DetailHasil;

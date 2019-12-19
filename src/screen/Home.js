import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  YellowBox,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Linking
} from 'react-native'

import Slideshow from 'react-native-slideshow';

const Icon_Admin = require('../assets/icon_admin.png')
const Daftar_DesaKu = require('../assets/Daftar_DesaKu.png')
const Suara_DesaKu = require('../assets/Suara_DesaKu.png')
const Wisata_DesaKu = require('../assets/Wisata_DesaKu.png')

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Matahari Terbit Pantai Samas',
          caption: 'Pandang Yang Indah',
          url: 'https://github.com/thisWandiPratama/Documentghost/blob/master/Slide/photo_2019-12-12_22-38-35.jpg?raw=true',
        }, {
          title: 'Ombak Pantai Samas',
          caption: 'Ombak Yang Membuat Tegang',
          url: 'https://github.com/thisWandiPratama/Documentghost/blob/master/Slide/photo_2019-12-12_22-39-01.jpg?raw=true',
        }, {
          title: 'Bersepeda dan Beristirahat',
          caption: 'Gegunung Krete Bantul Yogyakarta',
          url: 'https://github.com/thisWandiPratama/Documentghost/blob/master/Slide/photo_2019-12-12_22-39-06.jpg?raw=true',
        }, {
          title: 'Danau Yang Dengan Pemandangan Yang Indah',
          caption: 'Gegunung Krete Bantul Yogyakarta',
          url: 'https://github.com/thisWandiPratama/Documentghost/blob/master/Slide/photo_2019-12-12_22-39-42.jpg?raw=true',
        },
      ],
      data: [],
      isLoding: true,
      refreshing: false
    };
  }

  List_Artikel_DesaKu = () => {
    return fetch('https://sisteminformasidesaku.000webhostapp.com/api/Artikel_DesaKu/list_artikel_desaku.php')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoding: false,
          data: responseJson
        })
      })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.List_Artikel_DesaKu().then(() => {
      this.setState({
        refreshing: false
      })
    })
  }

  ListEmptyView = (isLoading = this.state.isLoading) => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ textAlign: 'center' }}> Tidak Ada Data.</Text>
        </View>
      );
    }
  }

  renderItems = ({ item }) => {
    const { id, title_artikel_desaku, tanggal_post_artikel_desaku, photo_artikel_desaku } = item
    return (
      <View style={styles.containerList}>
        <View style={styles.conGambar}>
          <Image source={{ uri: photo_artikel_desaku }} style={styles.gmbr} />
        </View>
        <View style={styles.note}>
          <Text style={styles.Judul}>{title_artikel_desaku}</Text>
          <Text style={styles.tgl}>{tanggal_post_artikel_desaku}</Text>
        </View>
      </View>
    )
  }


  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 5000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    this.List_Artikel_DesaKu()
  }

  render() {
    YellowBox.ignoreWarnings([''])
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor='#009688' />
        <View style={styles.MainContainer}>
          <Text style={styles.font}>Sistem Informasi DesaKu</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Admin_DesaKu')}>
            <Image source={Icon_Admin} style={styles.img_style} />
          </TouchableOpacity>
        </View>
        <Slideshow
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })}
        />
        <View style={styles.FiturLainnya}>
          <View style={styles.namaFiturLainnya}>
            <Text style={styles.textNamaFiturLainnya}>Fitur Lainnya</Text>
          </View>
          <View style={styles.buttonFiturLainnya}>
            <View style={styles.flex}>
              <View style={styles.flexContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Daftar_DesaKu')}>
                  <View style={styles.center}>
                    <Image source={Daftar_DesaKu} style={styles.IconFitur} />
                    <Text>Daftar DesaKu</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flexContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Suara_DesaKu')}>
                  <View style={styles.center}>
                    <Image source={Suara_DesaKu} style={styles.IconFitur} />
                    <Text>Suara DesaKu</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flexContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Wisata_DesaKu')}>
                  <View style={styles.center}>
                    <Image source={Wisata_DesaKu} style={styles.IconFitur} />
                    <Text>Wisata DesaKu</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.Title}>
              <Text style={styles.jdlTitle}>Artikel DesaKu</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Artikel_DesaKU')}>
                <Text style={styles.jdlTitle}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.data}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={item => item.toString()}
              renderItem={this.renderItems}
              ListEmptyComponent={this.ListEmptyView}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }

            />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  MainContainer: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    backgroundColor: '#009688',
    justifyContent: 'space-between',
  },
  font: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginLeft: 5
  },
  img_style: {
    height: 30,
    width: 30
  },
  FiturLainnya: {
    margin: 10
  },
  textNamaFiturLainnya: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonFiturLainnya: {
    margin: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexContainer: {
    height: 80,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconFitur: {
    height: 50,
    width: 50,
    borderRadius: 15
  },
  center: {
    alignItems: 'center'
  },

  maincontainer: {
    flex: 1
  },
  containerList: {
    margin: 5,
    backgroundColor: '#009688',
    flexDirection: 'row',
    borderRadius: 15
  },

  gmbr: {
    height: 100,
    width: 100,
    resizeMode: "center",
    borderRadius: 20
  },
  conGambar: {
    alignItems: 'center',
    width: 120,
    justifyContent: 'center',
  },
  note: {
    width: 220,
  },
  Judul: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  tgl: {
    fontSize: 13,
    color: '#fff'
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  jdlTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default Home

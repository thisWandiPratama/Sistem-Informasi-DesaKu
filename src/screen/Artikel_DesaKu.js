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

class Artikel_DesaKu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[],
      isLoding: true,
      refreshing: false
    };
  }

  List_Artikel_DesaKu = () =>{
    return fetch('https://sisteminformasidesaku.000webhostapp.com/api/Artikel_DesaKu/list_artikel_desaku.php')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoding:false,
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

  _onRefresh(){
    this.setState({refreshing: true}) ;
     this.List_Artikel_DesaKu().then(() => {
       this.setState({
         refreshing: false
       })
     })
  }

  ListEmptyView = (isLoading = this.state.isLoading) => {
    if (isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View>
          <Text style={{textAlign: 'center'}}> Tidak Ada Data.</Text>
        </View>
    );
  }
}

renderItems = ({ item }) => {
  const { id, title_artikel_desaku, tanggal_post_artikel_desaku, photo_artikel_desaku} = item
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

  componentDidMount(){
    this.List_Artikel_DesaKu()
  }

  render() {
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor='#009688' />
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
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
    containerList:{
        margin:5,
        backgroundColor:'#009688',
        flexDirection:'row',
        borderRadius: 15
    },
    
    gmbr:{
        height: 100,
        width: 100,
        resizeMode:"center",
        borderRadius: 20
    },
    conGambar:{
        alignItems: 'center',
         width: 120,
         justifyContent:'center',
    },
    note:{
        width: 220,
    },
    Judul:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#fff'
    },
    tgl:{
        fontSize: 13,
        color:'#fff'
    },
    Title:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    jdlTitle:{
      fontSize:20,
      fontWeight:'bold'
    }
})

export default Artikel_DesaKu

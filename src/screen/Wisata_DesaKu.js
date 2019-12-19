import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Image,
    StatusBar,
    StyleSheet,
    Linking
} from 'react-native'

class Wisata_DesaKu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            isLoding: true,
            refreshing: false
         }
    }

    List_Wisata_DesaKu = () =>{
        return fetch('https://sisteminformasidesaku.000webhostapp.com/api/Wisata_DesaKu/list_wisata_desaku.php')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({
              isLoding:false,
              data: responseJson
            })
          })
      }

    componentDidMount(){
        this.List_Wisata_DesaKu()
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
         this.List_Wisata_DesaKu().then(() => {
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
        const { id, nama_wisata_desaku, lokasi_wisata_desaku, photo_wisata_desaku, maps_wisata_desaku } = item
        return (
            <View style={styles.containerList}>
                <View style={styles.conGambar}>
                    <Image source={{ uri: photo_wisata_desaku }} style={styles.gmbr} />
                </View>
                <View style={styles.note}>
                    <Text style={styles.Judul}>{nama_wisata_desaku}</Text>
                    <Text style={styles.jalan}>{lokasi_wisata_desaku}</Text>
                    <Text style={styles.arah} onPress={() => Linking.openURL(maps_wisata_desaku)}>Petujuk Arah </Text>
                </View>
            </View>
        )
    }


    render() { 
        return ( 
            <View style={styles.maincontainer}>
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
         );
    }
}
const styles = StyleSheet.create({
    maincontainer:{
        flex:1
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
        margin: 5,
    },
    Judul:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#fff'
    },
    jalan:{
        fontSize: 13,
        color:'#fff'
    },
    arah:{
        fontSize:  20,
        color:'#fff',
        fontWeight:'bold'
    },
})
export default Wisata_DesaKu;
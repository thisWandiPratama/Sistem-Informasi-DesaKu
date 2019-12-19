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

class Suara_DesaKu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            isLoding: true,
            refreshing: false
         }
    }

    List_Suara_DesaKu = () =>{
        return fetch('https://sisteminformasidesaku.000webhostapp.com/api/Suara_DesaKu/list_suara_desaku.php')
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
        this.List_Suara_DesaKu()
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
         this.List_Daftar_DesaKu().then(() => {
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
        const { id, kepada_siapa, dari_siapa, photo_suara_desaku, kritik_saran } = item
        return (
            <View style={styles.containerList}>
                <View style={styles.conGambar}>
                    <Image source={{ uri: photo_suara_desaku }} style={styles.gmbr} />
                </View>
                <View style={styles.note}>
                    <Text style={styles.Kepada}>TO  : {kepada_siapa}</Text>
                    <Text style={styles.Dari}>FROM : {dari_siapa}</Text>
                    <Text style={styles.KritikSaran}>Saran&Kritik </Text>
                    <Text style={styles.pesan}>{kritik_saran}</Text>
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
    Kepada:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#fff'
    },
    Dari:{
        fontSize: 18,
        color:'#fff'
    },
    KritikSaran:{
        fontSize:  20,
        color:'#fff'
    },
    pesan:{
        fontSize: 14,
        color:'#fff'
    }
  
})
export default Suara_DesaKu;
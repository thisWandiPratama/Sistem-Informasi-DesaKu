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

class Daftar_DesaKu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoding: true,
            refreshing: false
        }
    }

    List_Info_Kajian = () => {
        return fetch('https://sisteminformasidesaku.000webhostapp.com/api/Daftar_DesaKu/list_daftar_desaku.php')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoding: false,
                    data: responseJson
                })
            })
    }

    componentDidMount() {
        this.List_Info_Kajian()
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
        this.List_Info_Kajian().then(() => {
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
        const { id, nama_desaku, lokasi_desaku, photo_desaku, maps_desaku } = item
        return (
            <View style={styles.containerList}>
                <View style={styles.conGambar}>
                    <Image source={{ uri: photo_desaku }} style={styles.gmbr} />
                </View>
                <View style={styles.note}>
                    <Text style={styles.judul}>{nama_desaku}</Text>
                    <Text style={styles.text}>{lokasi_desaku}</Text>
                    <Text style={styles.textPetujukArah} onPress={() => Linking.openURL(maps_desaku)}> Petujuk Arah </Text>
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
    judul:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#fff'
    },
    text:{
        fontSize: 10
    },
    textPetujukArah:{
        fontSize:  20,
        color:'#fff'
    }
  
})
export default Daftar_DesaKu;
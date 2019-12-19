import React, { Component } from 'react';
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
    Linking,
    TextInput,
    PixelRatio,
    ScrollView,
    AsyncStorage
} from 'react-native'

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modalbox';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

class Admin_Artikel_DesaKu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoding: true,
            refreshing: false,
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            ImageSource: null,
            data: null,
            title_artikel_desaku: '',
            tanggal_post_artikel_desaku: '',
            photo_artikel_desaku: '',
        }
    }
    
    signOut =() =>{
        AsyncStorage.removeItem('admin')
        this.props.navigation.navigate('Auth')
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({

                    ImageSource: source,
                    data: response.data

                });
            }
        });
    }

    uploadImageToServer = () => {

        RNFetchBlob.fetch('POST', 'https://sisteminformasidesaku.000webhostapp.com/api/Artikel_DesaKu/tambah_artikel_desaku.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
            { name: 'title_artikel_desaku', data: this.state.title_artikel_desaku },
            { name: 'tanggal_post_artikel_desaku', data: this.state.tanggal_post_artikel_desaku },
            { name: 'photo_artikel_desaku', data: this.state.photo_artikel_desaku },
        ]).then((resp) => {

            var tempMSG = resp.data;

            tempMSG = tempMSG.replace(/^"|"$/g, '');

            alert(tempMSG);

        }).catch((error) => {
            console.error(error)
        })

    }

    onClose() {
        console.log('Modal just closed');
    }

    onOpen() {
        console.log('Modal just opened');
    }

    onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
    }

    renderList() {
        var list = [];

        for (var i = 0; i < 50; i++) {
            list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
        }

        return list;
    }

    Admin_List_Artikel_DesaKu = () => {
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

    componentDidMount() {
        this.Admin_List_Artikel_DesaKu()
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
        this.Admin_List_Artikel_DesaKu().then(() => {
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

    render() {
        YellowBox.ignoreWarnings(['RNFetchBlob']);
        var BContent = (
            <View style={[styles.btn, styles.btnModal]}>
                <Text style={{ color: '#fff' }} onPress={() => this.setState({ isOpen: false })}>X</Text>
            </View>
        );
        return (
            <View style={styles.maincontainer}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Artikel DesaKu</Text>
                    <TouchableOpacity onPress={() => this.signOut()}>
                    <Text style={styles.textHeader}>Logout</Text>
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
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title="Add Artikel DesaKu" onPress={() => this.refs.modal3.open()}>
                        <Icon name="note-add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>


                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                    <View>
                        <ScrollView>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                                    <View style={styles.ImageContainer}>

                                        {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                                            <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                                        }

                                    </View>

                                </TouchableOpacity>


                                <TextInput

                                    placeholder="Masukan Judul Artikel "

                                    onChangeText={data => this.setState({ title_artikel_desaku: data })}

                                    underlineColorAndroid='transparent'

                                    style={styles.TextInputStyle}
                                />

                                <TextInput

                                    placeholder="Masukan Tgl Postingan "

                                    onChangeText={data => this.setState({ tanggal_post_artikel_desaku: data })}

                                    underlineColorAndroid='transparent'

                                    style={styles.TextInputStyle}
                                />

                                <TextInput

                                    placeholder="Masukan Lokasi Posting Artikel "

                                    onChangeText={data => this.setState({ photo_artikel_desaku: data })}

                                    underlineColorAndroid='transparent'

                                    style={styles.TextInputStyle}
                                />

                                <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >

                                    <Text style={styles.TextStyle}> Upload Now </Text>

                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>

            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    },
    header: {
        height: 40,
        width: '100%',
        backgroundColor: '#009688',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textHeader: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    modal3: {
        flex: 1,
        backgroundColor: '#F0FFFF',
        marginTop: 10,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 10,
        width: '90%',
        borderRadius: 30
    },
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
      },
    
      ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
    
      },
    
      TextInputStyle: {
    
        textAlign: 'center',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20
      },
    
      TextInputStyleDetail: {
    
        textAlign: 'center',
        height: 50,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20,
        flexWrap:'wrap'
      },
    
      button: {
    
        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
      },
    
      TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
      }
})
export default Admin_Artikel_DesaKu;
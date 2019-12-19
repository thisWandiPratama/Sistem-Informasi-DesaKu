import React, { Component } from 'react';
 
import { StyleSheet, 
  TextInput,
  View, 
  Alert, 
  Button, 
  Text,
  Image,
  Modal,
  TouchableOpacity,
  YellowBox,
  AsyncStorage
} from 'react-native';


class Login_Admin_DesaKu extends Component {
 
constructor(props) {
    super(props)
    this.state = {
      UserEmail: '',
      UserPassword: ''
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('admin').then(value => {
      if (value != null) {
        this.props.navigation.navigate('App')
      }
    })  
  }

  UserLoginFunction = () =>{
          const { UserEmail }  = this.state ;
          const { UserPassword }  = this.state ;
      fetch('https://sisteminformasidesaku.000webhostapp.com/api/Admin_DesaKu/login_admin_desaku.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username_admin_desaku: UserEmail,
            password_admin_desaku: UserPassword
          })
        }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({ nama_lengkap: responseJson });
               if(responseJson === 'Data Matched')
                {
                    AsyncStorage.setItem('admin', this.state.nama_lengkap)
                    this.props.navigation.navigate('App', { Email: UserEmail });
                }
                else{
                  Alert.alert(responseJson);
                }
              }).catch((error) => {
                console.error(error);
              });
          }

  render() {
    YellowBox.ignoreWarnings(['componentWillReceiveProps']);
    return (
            <View style={styles.MainContainerImage}>
                      <View styles={styles.MainContainerForm}>
                        <Text style= {styles.TextComponentStyle}>Admin DesaKu</Text>
                        <TextInput
                                  placeholder="Masukan Nama"
                                  onChangeText={UserEmail => this.setState({UserEmail})}
                                  underlineColorAndroid='transparent'
                                  autoCapitalize = 'none'
                                  style={styles.TextInputStyleClass}
                        />
                        <TextInput
                                  placeholder="Masukan Password"
                                  onChangeText={UserPassword => this.setState({UserPassword})}
                                  underlineColorAndroid='transparent'
                                  style={styles.TextInputStyleClass}
                                  secureTextEntry={true}
                        />
                   </View>
                        <View style={styles.btnStyle}>
                              <TouchableOpacity onPress={this.UserLoginFunction}>
                                <Text>Login</Text>
                              </TouchableOpacity>
                        </View>
                  </View>
              );
        }
  }

const styles = StyleSheet.create({
 
MainContainerImage :{
    flex:1,
    justifyContent:'center',
    margin: 10,
},

MainContainerForm :{
    alignItems:'center',
    justifyContent:'center',
    margin: 10,
  },

TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5 ,
    marginLeft:'10%'
},

 TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center', 
    marginBottom: 15
 },

 styImage:{
    height:100,
    width:100,
    borderRadius:30
  },

  styLogin:{
    height:40,
    width:40,
    borderRadius:10,
  },

  btnStyle:{
    alignItems:'flex-end',
    marginRight:'10%'
  },

});
export default Login_Admin_DesaKu;
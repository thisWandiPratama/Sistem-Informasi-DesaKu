
import {createAppContainer, createSwitchNavigator } from 'react-navigation'
import {  createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'


import WellcomeScreen from './Page/Login_Admin_DesaKu'
import Admin_Artikel_DesaKu from './Page/Admin_Artkel_DesaKu'
import Admin_Daftar_DesaKu from './Page/Admin_Daftar_DesaKu'
import Admin_Wisata_DesaKu from './Page/Admin_Wisata_DesaKu'
import Tambah_Artikel_DesaKu from './Page/Tambah_Artikel_DesaKu'
import Tambah_Daftar_DesaKu from './Page/Tambah_Daftar_DesaKu'
import Tambah_Wisata_DesaKu from './Page/Tambah_Wisata_DesaKu'

const AuthStackNavigator = createStackNavigator({
  Wellcome : {
    screen : WellcomeScreen,
    navigationOptions: () => ({
      header:null
    }),
  },
  Tambah_Artikel_DesaKu : {
    screen : Tambah_Artikel_DesaKu,
    navigationOptions: () => ({
      title:' Tambah Artikel DesaKu'
    }),
  },
  Tambah_Daftar_DesaKu : {
    screen : Tambah_Daftar_DesaKu,
    navigationOptions: () => ({
      title:'Tambah Daftar DesaKu'
    }),
  },
  Tambah_Wisata_DesaKu : {
    screen : Tambah_Wisata_DesaKu,
    navigationOptions: () => ({
      title:'Tambah Wisata DesaKu'
    }),
  },
})

const AppTabNavigator = createBottomTabNavigator({
  Artikel : {
    screen : Admin_Artikel_DesaKu,
    navigationOptions: () => ({
      title:'Artikel DesaKu'
    }),
  },
  DesaKu : {
    screen : Admin_Daftar_DesaKu,
    navigationOptions: () => ({
      title:'Daftar DesaKu'
    }),
  },
  Wisata : {
    screen : Admin_Wisata_DesaKu,
    navigationOptions: () => ({
      title:'Wisata DesaKu'
    }),
  }
}) 

const AuthSwitch = createSwitchNavigator({
  Auth : AuthStackNavigator,
  App: AppTabNavigator,
})

export default createAppContainer(AuthSwitch)

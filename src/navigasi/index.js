import {createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../screen/Home'
import Admin_DesaKu from '../screen/Admin_DesaKu'
import Artikel_DesaKU from '../screen/Artikel_DesaKu'
import Daftar_DesaKu from '../screen/Daftar_DesaKu'
import Suara_DesaKu from '../screen/Suara_DesaKu'
import Wisata_DesaKu from '../screen/Wisata_DesaKu'


const StackNavigator = createStackNavigator({
    Home: {
    	screen: Home,
    	 navigationOptions: () => ({
                header: null,
              }),
    },
    Admin_DesaKu: {
    	screen: Admin_DesaKu,
    	 navigationOptions: () => ({
                header:null
              }),
    },
    Artikel_DesaKU: {
    	screen: Artikel_DesaKU,
    	 navigationOptions: () => ({
                title:'Artikel DesaKu'
              }),
    },
    Daftar_DesaKu: {
    	screen: Daftar_DesaKu,
    	 navigationOptions: () => ({
                title:'Daftar DesaKu'
              }),
    },
    Suara_DesaKu: {
    	screen: Suara_DesaKu,
    	 navigationOptions: () => ({
                title:'Suara DesaKu'
              }),
    },
    Wisata_DesaKu: {
    	screen: Wisata_DesaKu,
    	 navigationOptions: () => ({
                title:'Wisata DesaKu'
              }),
    },
})
export default createAppContainer(StackNavigator);

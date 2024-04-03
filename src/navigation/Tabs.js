import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Trade from '../screens/Trade';
import Wallet from '../screens/Wallet';
import {COLORS} from '../../constants';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import MyInvestment from '../screens/MyInvestment';

const CustomTabBarButton = ({children, onPress}) => {
  <TouchableOpacity
    style={{
      top: 30,
      justifyContent: 'center',
      backgroundColor: 'green',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45',
      }}>
      {children}
    </View>
  </TouchableOpacity>;
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',

          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          borderBlockColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          height: heightPercentageToDP(9),
          ...styles.shadow,
        },
        tabBarBackground: () => <View className="blur-sm"></View>,
        headerShown: false,
        tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/image/home.png')}
                resizeMode="contain"
                style={{
                  width: widthPercentageToDP(6),
                  height: heightPercentageToDP(5),
                  tintColor: focused
                    ? COLORS.green
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={Wallet}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/image/wallet_nav.png')}
                resizeMode="contain"
                style={{
                  width: widthPercentageToDP(6),
                  height: heightPercentageToDP(5),
                  tintColor: focused
                    ? COLORS.green
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Trade}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../../assets/image/logo.png')}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                  tintColor: COLORS.white,
                  backgroundColor: COLORS.green,
                  marginTop: -30,
                  borderRadius: 30,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyInvestment"
        component={MyInvestment}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/image/chart.png')}
                resizeMode="contain"
                style={{
                  width: widthPercentageToDP(6),
                  height: heightPercentageToDP(5),
                  tintColor: focused
                    ? COLORS.green
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/image/profile.png')}
                resizeMode="contain"
                style={{
                  width: widthPercentageToDP(6),
                  height: heightPercentageToDP(5),
                  tintColor: focused
                    ? COLORS.green
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;

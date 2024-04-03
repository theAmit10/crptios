import {
  View,
  Text,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import TopGainer from '../component/gainerLooser/TopGainer';
import TopLooser from '../component/gainerLooser/TopLooser';

const Tab = createMaterialTopTabNavigator();

const TabGainerLooser = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          borderRadius: heightPercentageToDP(2),
          margin: heightPercentageToDP(2),
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor:
          THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: FONT.medium,   
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarIndicator: false,
        tabBarBounces: true,
        tabBarAndroidRipple: false,
      }}>
      <Tab.Screen
        name="Top Gainer"
        component={TopGainer}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: focused
                    ? COLORS.white
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                  backgroundColor: focused
                    ? COLORS.green
                    : THEME.data === 'DARK'
                    ? COLORS.skyBlue
                    : COLORS.lightGray,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(4),
                  fontSize: heightPercentageToDP(2),
                  borderColor: 'white',
                  borderRadius: heightPercentageToDP(1),
                  overflow: 'hidden',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: FONT.bold,
                }}>
                Top Gainer
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Top Looser"
        component={TopLooser}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: focused
                    ? COLORS.white
                    : THEME.data === 'DARK'
                    ? COLORS.white
                    : COLORS.purpleDark,
                  backgroundColor: focused
                    ? COLORS.red
                    : THEME.data === 'DARK'
                    ? COLORS.skyBlue
                    : COLORS.lightGray,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(4),
                  fontSize: heightPercentageToDP(2),
                  overflow: 'hidden',
                  borderColor: 'white',
                  borderRadius: heightPercentageToDP(1),
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: FONT.bold,
                }}>
                Top Looser
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabGainerLooser;

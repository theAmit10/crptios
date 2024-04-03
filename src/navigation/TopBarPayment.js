import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ProgressBarAndroidComponent,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AccountDetails from '../component/payment/AccountDetails';
import CardDetails from '../component/payment/CardDetails';
import TopGainer from '../component/gainerLooser/TopGainer';
import SavedCards from '../component/payment/SavedCards';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const TopBarPayment = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: heightPercentageToDP(6),
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.gray2 : COLORS.purpleDark,
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
          backgroundColor:
            THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2,
        }, // Set it to an empty object to remove the indicator
        tabBarIndicator: false, // Set it to null to remove the indicator
        tabBarBounces: false,
      }}>
      <Tab.Screen
        name="Account Details"
        component={TopGainer}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'pink',
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
                    ? COLORS.lightGray
                    : COLORS.lightGray,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(5),
                  fontSize: heightPercentageToDP(2),
                  borderColor: 'white',
                  borderRadius: heightPercentageToDP(1),
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
        name="Card Details"
        component={CardDetails}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'pink',
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
                    ? COLORS.lightGray
                    : COLORS.lightGray,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(5),
                  fontSize: heightPercentageToDP(2),
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

      {/** <Tab.Screen name="Soved Cards" component={SavedCards} />  */}
    </Tab.Navigator>
  );
};

export default TopBarPayment;

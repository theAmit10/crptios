import React from 'react';
import {COLORS, FONT} from '../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HistoryRefarrel from '../component/history/HistoryRefarrel';
import HistoryWithdraw from '../component/history/HistoryWithdraw';
import HistoryTrade from '../component/history/HistoryTrade';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const TobBarHistory = () => {
  const THEME = useSelector(state => state.theme);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor:
          THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: FONT.medium,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.green,
        },
      }}>
      <Tab.Screen name="Referral Income" component={HistoryRefarrel} />

      <Tab.Screen name="Deposit/Withdraw" component={HistoryWithdraw} />

      <Tab.Screen name="Trade" component={HistoryTrade} />
    </Tab.Navigator>
  );
};

export default TobBarHistory;

import React from 'react';
import {COLORS, FONT} from '../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CreateTicket from '../component/helpdesk/CreateTicket';
import ExistingTicket from '../component/helpdesk/ExistingTicket';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const TabBarHelpDesk = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: heightPercentageToDP(6),
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
      <Tab.Screen name="Create Ticket" component={CreateTicket} />

      <Tab.Screen name="Existing" component={ExistingTicket} />
    </Tab.Navigator>
  );
};

export default TabBarHelpDesk;

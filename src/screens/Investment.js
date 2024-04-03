import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';
import HeaderTop from '../component/profile/HeaderTop';
import InvestmentItem from '../component/investment/InvestmentItem';

import URLHelper from '../api/URLhelper/URLHelper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Loading from '../component/Loading';

const Investment = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();
  const [investmentListData, setInvestmentList] = useState([]);
  const [showProgressBar, setProgressBar] = useState(true);

  useEffect(() => {
    getInvestmentList();
  }, []);

  const getInvestmentList = async () => {
    const apiUrl = URLHelper.BASE_URL + URLHelper.INVESTMENT_LIST;
    console.log(' :: Working on the Getting List :: ');

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      console.log('REQUEST STARTED');
      // console.log('Response:', response.data.data);
      setInvestmentList(response.data.data);
      setProgressBar(false)

      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false)
      Toast.show({
        type: 'error',
        text1: "Something went wrong",
        text2: "Please try again later"
      })
      if (error.response) {
        console.log('Error:', error.response);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Investment Plans'} />

      {
        showProgressBar ? (<View style={{ height: heightPercentageToDP(100), width: widthPercentageToDP(100), justifyContent: 'center', alignItems: 'center' }}><Loading /></View>) : (investmentListData && (
      <FlatList
        data={investmentListData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('InvestmentDetails', {
                data: item,
              })
            }>
            <InvestmentItem
              planAbout={item.title}
              investment={
                item.mininvestment + ' to ' + item.maxinvestment + ' USDT'
              }
              montlyrReturn={item.minreturn + '% to ' + item.maxreturn + '%'}
              planDuration={item.noofmonths}
            />
          </TouchableOpacity>
        )}
      />
      ))
      }
    </SafeAreaView>
  );
};

export default Investment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

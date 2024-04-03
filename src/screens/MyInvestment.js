import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';
import HeaderTop from '../component/profile/HeaderTop';
import InvestmentItem from '../component/investment/InvestmentItem';
import URLHelper from '../api/URLhelper/URLHelper';
import axios from 'axios';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Loading from '../component/Loading';

const MyInvestment = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();
  const [myinvestmentListData, setMyInvestmentList] = useState([]);
  const [showProgressBar, setProgressBar] = useState(true);

  const isFocused = useIsFocused()

  useEffect(() => {
    getMyInvestmentList();
  }, [isFocused]);

  // For My Investment list
  const getMyInvestmentList = async () => {
   
    const apiUrl = URLHelper.MY_INVESTMENT_LIST;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      console.log('REQUEST STARTED');

      setMyInvestmentList(response.data.data);
      setProgressBar(false);

      // let val = response.data;
      // console.log('#####################');
      // console.log(val.data.length);

      // val.data.map(item => {
      //   console.log(item);
      // });

      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again later',
      });
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
      <HeaderTop value={'Investment'} />

      {myinvestmentListData &&
        (myinvestmentListData.length == 0 ? (
          showProgressBar ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: heightPercentageToDP(3),
              }}>
              <Loading />
            </View>
          ) : (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  textAlign: 'center',
                }}>
                No Investment
              </Text>
            </View>
          )
        ) : (
          <FlatList
            data={myinvestmentListData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MyInvestmentDetails', {
                    data: item,
                  })
                }>
                <InvestmentItem
                  planAbout={item.title}
                  investment={
                    item.mininvestment + ' to ' + item.maxinvestment + ' USDT'
                  }
                  montlyrReturn={
                    item.minreturn + '% to ' + item.maxreturn + '%'
                  }
                  planDuration={item.noofmonths}
                />
              </TouchableOpacity>
            )}
          />
        ))}

      {/** Add new Investment */}
      {showProgressBar ? null : (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.green,
            margin: heightPercentageToDP(2),
            padding: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(2),
            marginBottom: heightPercentageToDP(11),
          }}
          onPress={() => navigation.navigate('Investment')}>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              textAlign: 'center',
            }}>
            Add New Investment
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default MyInvestment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

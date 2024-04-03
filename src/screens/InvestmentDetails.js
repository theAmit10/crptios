import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';
import HeaderTop from '../component/profile/HeaderTop';
import InvestmentItem from '../component/investment/InvestmentItem';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';

import URLHelper from '../api/URLhelper/URLHelper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const InvestmentDetails = ({ route }) => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();

  const { data } = route.params;
  console.log('Investment Details');
  console.log(data.maxinvestment);

  const [accountIdVal, setAccountId] = useState(1);
  const [packageVal, setPackageVal] = useState(1);
  const [investmentAmountVal, setInsvestmentAmount] = useState(0);
  const [showProgressBar, setProgressBar] = useState(false);

  useEffect(() => {
    getUserid();
    console.log('Account id :: ' + accountIdVal);
  }, []);

  const MakeInvest = async () => {
    if (!investmentAmountVal) {
      Toast.show('Enter Amount');
      Toast.show({
        type: 'error',
        text1: "Enter Investing Amount"
      })
    } else if (
      investmentAmountVal >= Number(data.mininvestment) &&
      investmentAmountVal <= Number(data.maxinvestment)
    ) {
      console.log(
        'Else : ' + accountIdVal + ' | ' + investmentAmountVal + ' | ',
      );
      setProgressBar(true);

      const apiUrl = URLHelper.MAKE_INVESTMENT;
      const bearerToken = ACCESS_TOKEN;
      // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

      const headers = {
        userapisecret: URLHelper.USER_SECRET_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN.data}`,
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('account_id', accountIdVal);
      formData.append('plan_id', data.id);
      formData.append('amount', investmentAmountVal);

      try {
        const response = await axios.post(apiUrl, formData, { headers });
        console.log('REGISTERING STARTED');
        console.log('Response:', response.data);

        if (response.data.status === true) {
          navigation.goBack();
          Toast.show({
            type: 'success',
            text1: 'Payment Success',
            text2: 'Successfully submited your request'
          });
        } else {
          if (response.data.message === 'You have already purchased this plan') {
            Toast.show({
              type: 'error',
              text1: 'Already Purchased',
              text2: response.data.message
            });
          } else {
            Toast.show({
              type: 'error',
              text1: response.data.message,
              text2: response.data.message
            });
          }


        }
        console.log('REGISTERING STOP');

        setProgressBar(false);

      } catch (error) {
        setProgressBar(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again later',
        });
        if (error.response) {
          console.log('Error:', error.response.data);
        } else {
          console.log('Error:', error.message);
        }
      }
    } else {

      Toast.show({
        type: 'info',
        autoHide: 2000,
        text1: 'Investment Amount',
        text2:
          'Must be Greater than ' +
          data.mininvestment +
          ' and Less than ' +
          data.maxinvestment,
      });
    }
  };

  const getUserid = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('userId');
      // setCode(jsonValue);
      setAccountId(jsonValue);
      console.log('Encrypted CODE is :: ' + jsonValue);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('error' + error);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Make New Invest '} />

      {data && (
        <InvestmentItem
          planAbout={data.title}
          investment={
            data.mininvestment + ' USDT to ' + data.maxinvestment + ' USDT'
          }
          montlyrReturn={data.minreturn + '% to ' + data.maxreturn + '%'}
          planDuration={data.noofmonths}
        />
      )}

      {/** Input Container */}

      <ScrollView>
        <View style={styles.inputContainer}>
          <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Account ID
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userNameInput,
                padding: heightPercentageToDP(1.5),
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
              }
            >
              {accountIdVal.toString()}
            </Text>
          </View>

          <View>
            <Text
              id="package"
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Select package
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                padding: heightPercentageToDP(1.5),
                ...styles.userNameInput,
              }}>
              {data.title +
                ' $' +
                data.mininvestment +
                ' to ' +
                '$' +
                data.maxinvestment}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Investment amount
            </Text>
            <TextInput
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userNameInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
              }
              onChangeText={setInsvestmentAmount}
              value={investmentAmountVal.toString()}
              inputMode="numeric"
            />
          </View>
        </View>

        {/** Invest button */}

        {showProgressBar ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: heightPercentageToDP(3),
            }}>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
            onPress={MakeInvest}>
            <Text
              style={{
                backgroundColor: COLORS.green,
                padding: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(2),
                margin: heightPercentageToDP(2),
                width: widthPercentageToDP(92),
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: heightPercentageToDP(2),
              }}>
              Invest
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvestmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: widthPercentageToDP(100),
    padding: heightPercentageToDP(2),
    alignItems: 'stretch',
    gap: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(3),
  },
  titleDescription: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 10,
  },

  containerTop: {
    height: heightPercentageToDP(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
  },
});

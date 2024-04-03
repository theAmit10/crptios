import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useSelector} from 'react-redux';
  import {useNavigation} from '@react-navigation/native';
  import * as Progress from 'react-native-progress';
  
  import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';
  import HeaderTop from '../../../component/profile/HeaderTop';
  import {COLORS, FONT} from '../../../../constants';
  import Toast from 'react-native-toast-message';
  import axios from 'axios';
  import URLHelper from '../../../api/URLhelper/URLHelper';
  
  const WithdrawUpi = () => {
    const THEME = useSelector(state => state.theme);
    const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  
    console.log(ACCESS_TOKEN.data);
  
    const navigation = useNavigation();
  
    const [upiHolderNameVal, setUpiHolderName] = useState('');
    const [upiIdval, setUpiIdCode] = useState('');
  
    const [amountVal, setAmount] = useState('');
    const [showProgressBar, setProgressBar] = useState(false);
  
  
  
    // for uploading Transaction content
    const submitWithdrawRequest = async () => {
      if (!upiHolderNameVal) {
        Toast.show({
          type: 'error',
          text1: 'Enter UPI Holder Name',
        });
      } else if (!upiIdval) {
        Toast.show({
          type: 'error',
          text1: 'Enter UPI ID',
        });
      }  else if (!amountVal) {
        Toast.show({
          type: 'error',
          text1: 'Enter Amount',
        });
      } else {
        setProgressBar(true);
  
        try {
          const formData = new FormData();
          formData.append('account_holder_name', accountHolderNameVal);
          formData.append('account_no', accountNumberVal);
          formData.append('confirm_account_no', confirmAccountNumberVal);
          formData.append('ifsc', ifscCodeval);
          formData.append('bank', bankNameVal);
          formData.append('branch', branchNameVal);
          formData.append('amount', amountVal);
  
          const response = await axios.post(URLHelper.API_WITHDRAW, formData, {
            headers: {
              userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
              Authorization: `Bearer ${ACCESS_TOKEN.data}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('Transaction Image updated successfully:', response.data);
          // console.warn('Transaction Image updated successfully:');
          setProgressBar(false);
  
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Bank Withdraw request submitted successfully.',
          });
          navigation.goBack();
        } catch (error) {
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data,
            });
            // console.error(
            //   'Request failed with status code',
            //   error.response.status,
            // );
            // console.error('Response data:', error.response.data);
          } else if (error.request) {
            // console.error('Request was made, but no response was received');
            Toast.show({
              type: 'error',
              text1: 'Request was made, but no response was received',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: error.message,
            });
            // console.error('Error setting up the request:', error.message);
          }
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
        <HeaderTop value={'Withdraw UPI '} />
  
        {/** Input Container */}
  
        <ScrollView>
          <View style={styles.inputContainer}>
            {/** Account Holder name */}
  
            <View>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                UPI Holder Name
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
                onChangeText={setUpiHolderName}
                value={upiHolderNameVal}></TextInput>
            </View>
  
            
  
            {/** IFSC Code */}
  
            <View>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                UPI ID
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
                onChangeText={setUpiIdCode}
                value={upiIdval}></TextInput>
            </View>
  
            
  
            {/** Amount */}
  
            <View>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Amount
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
                onChangeText={setAmount}
                value={amountVal}
                inputMode="decimal"
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity onPress={submitWithdrawRequest}>
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
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default WithdrawUpi;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      padding: heightPercentageToDP(2),
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
    paymentContainer: {
      borderRadius: heightPercentageToDP(2),
      padding: heightPercentageToDP(1),
    },
  });
  
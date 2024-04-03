import {
  FlatList,
  Platform,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import axios from 'axios';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import HeaderTop from '../../../component/profile/HeaderTop';
import { COLORS, FONT } from '../../../../constants';
import URLHelper from '../../../api/URLhelper/URLHelper';
import Loading from '../../../component/Loading';
import Toast from 'react-native-toast-message';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const UpiDeposit = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();

  const [accountIdVal, setAccountId] = useState('');
  const [amountVal, setAmount] = useState('');
  const [transactionVal, setTransactionAmount] = useState('');
  const [receiptVal, setReceipt] = useState('');
  const [remarkVal, setRemark] = useState('');

  // For UPI
  const [bankmodelVisible, setBankModelVisible] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(1);
  const [currentBank, setCurrentBank] = useState(null);
  const [imageFileName, setImageFileName] = useState('Choose a file');

  // Gettning Bank List
  const [bankListData, setbankList] = useState([]);

  const checkAndRequestPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (result === RESULTS.DENIED) {
      if (Platform.OS === 'android' && Platform.Version <= 29) { // Target Android 10 and above
        const permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('Permission not granted!');
          Toast.show({
            type: 'info',
            text1: 'Permission not granted!'
          })
          return;
        }

      }
    }

    // Call your DocumentPicker.pick() function here
    selectDoc();
  };

  useEffect(() => {
    getBankList();
  }, []);

  // for Selecting Bank account

  const selectBank = item => {
    console.log('Selected Bank :: ');
    console.log(item);
    setCurrentBank(item);
    setSelectedBankAccount(item.id);
  };

  // For Getting Bank List
  const getBankList = async () => {
    const apiUrl = URLHelper.PAYMENTG_LIST;
    const bearerToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };



    try {
      const response = await axios.get(apiUrl, { headers });
      console.log('REQUEST STARTED');
      console.log('Response:', response.data.data.upi);

      setbankList(response.data.data.upi);
      setCurrentBank(response.data.data.upi[0]);
      setSelectedBankAccount(response.data.data.upi[0].id);

      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: error.response,
        });
        // console.error('Error:', error.response);
      } else {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        // console.error('Error:', error.message);
      }
    }
  };

  // For Transaction Number

  // const source = require('../../../assets/image/user_placeholder.png');
  const [imageSource, setImageSource] = useState(null);
  const [showProgressBar, setProgressBar] = useState(false);

  // For Opening PhoneStorage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      if (doc) {
        console.log(doc);
        console.log(doc[0].uri);
        setImageSource({ uri: doc[0].uri });
        setImageFileName(doc[0].name);
      }

    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  // for uploading Transaction content
  const submitDeposit = async () => {
    if (!amountVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter Deposit Amount',
      });
      // console.error('Enter amount');
    } else if (!transactionVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter Transaction Number',
      });
      // console.error('Enter transaction number');
    } else if (!imageSource) {
      Toast.show({
        type: 'error',
        text1: 'Add Transaction Screenshot',
      });
      // console.error('Add Transaction Screenshot');
    } else {
      setProgressBar(true);

      try {
        const bearerToken =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

        const formData = new FormData();
        formData.append('payment_method_id', 3);
        formData.append('amount', amountVal);
        formData.append('transaction_id', transactionVal);
        // formData.append('bank_receipt', imageSource);
        formData.append('remarks', remarkVal);
        formData.append('bank_id', selectedBankAccount);
        formData.append('currency', 'INR');

        console.log('Image URI :: ' + imageSource.uri);

        // Resize the image
        try {
          console.log('Started Compressing Image');
          const resizedImage = await ImageResizer.createResizedImage(
            imageSource.uri,
            1000, // Adjust the dimensions as needed
            1000, // Adjust the dimensions as needed
            'JPEG',
            100, // Image quality (0-100)
            0, // Rotation (0 = no rotation)
            null,
          );

          console.log('Compressed Image :: ' + resizedImage.size);
          setImageSource(resizedImage);

          if (imageSource) {
            formData.append('bank_receipt', {
              uri: imageSource.uri,
              type: 'image/jpeg',
              name: 'bank_receipt.jpg',
            });
          }
        } catch (error) {
          // console.error('Error resizing the image:', error);
          Toast.show({
            type: 'error',
            text1: 'Error resizing the image:',
            text2: error,
          });
        }

        const response = await axios.post(URLHelper.DEPOSIT_API, formData, {
          headers: {
            userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
            Authorization: `Bearer ${ACCESS_TOKEN.data}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Transaction Image updated successfully:', response.data);

        // if (response.data.status == 'true') {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'UPI deposit request submitted successfully.',
          });
          navigation.goBack();
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Something went wrong',
        //     text2: response.data.message
        //   });
        // }
        // console.warn('Transaction Image updated successfully:');
        setProgressBar(false);

      } catch (error) {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Request was made, but no response was received',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: error.message,
          });
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
      <HeaderTop value={'UPI Deposit'} />

      {/** Input Container */}

      {bankListData.length != 0 ? (
        <ScrollView>
          <View style={styles.inputContainer}>
            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Exchanger Account
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  padding: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(2),
                }}
                onPress={() => setBankModelVisible(true)}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    flex: 1,
                  }}>
                  {selectedBankAccount}
                </Text>
                <FontAwesome
                  name="caret-down"
                  size={heightPercentageToDP(3)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={{
                    alignSelf: 'center',
                    opacity: 0.9,
                    marginStart: 2,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/** BANK ACCOUNT DETAILS */}

            {currentBank && (
              <View
                style={{
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.paymentContainer,
                }}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.subtitle,
                    fontSize: heightPercentageToDP(2),
                  }}>
                  UPI Details
                </Text>

                {/** account name */}

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      UPI Holder Name :
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,

                        width: widthPercentageToDP(50),
                      }}>
                      {currentBank.holdername}
                    </Text>
                  </View>
                </View>

                {/** bank name */}

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      UPI ID :
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                        width: widthPercentageToDP(50),
                      }}>
                      {currentBank.upiid}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Amount
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                inputMode="decimal"
                onChangeText={setAmount}
                value={amountVal}></TextInput>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Transaction number
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setTransactionAmount}
                value={transactionVal}
              />
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Receipt
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  padding: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(2),
                }}
                onPress={checkAndRequestPermission}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    flex: 1,
                  }}>
                  {imageFileName ? imageFileName : ''}
                </Text>
                <Feather
                  name="upload"
                  size={heightPercentageToDP(3)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={{
                    alignSelf: 'center',
                    opacity: 0.9,
                    marginStart: 2,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Remark
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setRemark}
                value={remarkVal}
                inputMode="text"
              />
            </View>
          </View>

          {/** Invest button */}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            {showProgressBar ? (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: heightPercentageToDP(3),
                }}>
                <Progress.Circle size={30} indeterminate={true} />
              </View>
            ) : (
              <TouchableOpacity onPress={submitDeposit}>
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
                  Deposit
                </Text>
              </TouchableOpacity>
            )}

            {/**  Email Models  */}

            <Modal
              animationIn={'slideInUp'}
              style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
              isVisible={bankmodelVisible}
              onTouchCancel={() => {
                setBankModelVisible(false);
              }}
              onBackdropPress={() => {
                setBankModelVisible(false);
              }}
              onBackButtonPress={() => {
                setBankModelVisible(false);
              }}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor:
                    THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                  width: '100%',
                  borderTopRightRadius: heightPercentageToDP(6),
                  borderTopLeftRadius: heightPercentageToDP(6),
                }}>
                <View style={styles.topView}></View>
                <View style={styles.modelContent}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.modelParentTitle,
                    }}>
                    Select a UPI ID
                  </Text>

                  {bankListData && (
                    <FlatList
                      data={bankListData}
                      keyExtractor={(item, index) => item.id}
                      renderItem={({ item }) => {
                        let selectedBankColor =
                          item.id === selectedBankAccount
                            ? COLORS.green
                            : COLORS.white;

                        return (
                          <TouchableOpacity
                            onPress={() => {
                              selectBank(item);
                            }}>
                            <View
                              style={{
                                backgroundColor:
                                  THEME.data === 'DARK'
                                    ? COLORS.skyBlue
                                    : COLORS.lightGray,
                                borderColor: selectedBankColor,
                                ...styles.cardContainer,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    backgroundColor:
                                      THEME.data === 'DARK'
                                        ? COLORS.purple
                                        : COLORS.white,
                                    borderColor:
                                      THEME.data === 'DARK'
                                        ? COLORS.purpleDark
                                        : COLORS.lightGray,
                                    ...styles.cardTopIcon,
                                  }}>
                                  <MaterialCommunityIcons
                                    name="check"
                                    size={20}
                                    color={selectedBankColor}
                                    style={{ alignSelf: 'center', opacity: 0.9 }}
                                  />
                                </View>

                                <MaterialCommunityIcons
                                  name="contactless-payment"
                                  size={heightPercentageToDP(3)}
                                  color={COLORS.green}
                                  style={{
                                    alignSelf: 'center',
                                    opacity: 0.9,
                                    marginStart: 2,
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: 3,
                                  marginVertical: heightPercentageToDP(2),
                                }}>
                                <View
                                  style={{ flex: 2, alignItems: 'flex-start' }}>
                                  <Text
                                    style={{
                                      color:
                                        THEME.data === 'DARK'
                                          ? COLORS.green
                                          : COLORS.green,
                                      ...styles.subSubTitle,
                                      fontSize: heightPercentageToDP(1.6),
                                    }}>
                                    Account Holder Name
                                  </Text>
                                  <Text
                                    style={{
                                      color:
                                        THEME.data === 'DARK'
                                          ? COLORS.white
                                          : COLORS.purpleDark,
                                      fontFamily: FONT.regular,
                                      fontSize: heightPercentageToDP(2),
                                      textAlignVertical: 'center',
                                    }}
                                    numberOfLines={1}>
                                    {item.holdername}
                                  </Text>
                                </View>

                                <View style={{ flex: 2, alignItems: 'center' }}>
                                  <Text
                                    style={{
                                      color:
                                        THEME.data === 'DARK'
                                          ? COLORS.green
                                          : COLORS.green,
                                      ...styles.subSubTitle,
                                      fontSize: heightPercentageToDP(1.6),
                                      textAlign: 'left',
                                      width: '100%',
                                    }}>
                                    UPI ID
                                  </Text>
                                  <Text
                                    style={{
                                      color:
                                        THEME.data === 'DARK'
                                          ? COLORS.white
                                          : COLORS.purpleDark,
                                      fontFamily: FONT.regular,
                                      fontSize: heightPercentageToDP(2),
                                      textAlignVertical: 'center',
                                      textAlign: 'left',
                                      width: '100%',
                                    }}
                                    numberOfLines={1}>
                                    {item.upiid}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}

                  <TouchableOpacity onPress={() => setBankModelVisible(false)}>
                    <Text style={styles.copybtn}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default UpiDeposit;

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
  cardContainer: {
    position: 'relative',
    borderRadius: heightPercentageToDP(1),
    borderWidth: 2,
    marginHorizontal: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(1),
    padding: heightPercentageToDP(1),
  },
  thirdTopContainer: {
    padding: heightPercentageToDP(1),
  },
  semiTitle: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  userInput: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2.5),
    backgroundColor: COLORS.purple,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 5,
    paddingStart: 10,
  },

  titleGreen: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    marginTop: 10,
  },

  addNewAccount: {
    backgroundColor: COLORS.green,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  removeAccount: {
    backgroundColor: COLORS.red,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  cardTopIcon: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
  },
  bottomTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  bottmContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: heightPercentageToDP(10),
    padding: 10,
    marginBottom: heightPercentageToDP(5),
    gap: 10,
  },

  subSubTitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    opacity: 0.8,
  },
  modelContent: {
    margin: heightPercentageToDP(2),
  },
  modelParentTitle: {
    fontFamily: FONT.extrabold,
    fontSize: 15,
    textAlignVertical: 'center',
    margin: heightPercentageToDP(2),
  },
  modeltitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    marginTop: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(2),
  },
  modelSubtitle: {
    marginHorizontal: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  copybtn: {
    color: COLORS.white,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    backgroundColor: COLORS.green,
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    textAlign: 'center',
  },
});

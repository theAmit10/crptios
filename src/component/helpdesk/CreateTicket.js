import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import {useCreateTicket} from '../../../utils/hooks';
import {createTicket} from '../../../stores/actions/createticket';

const CreateTicket = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

  const [subjectVal, setSubject] = useState('');
  const [messageVal, setMessage] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const dispatch = useDispatch();
  const loading = useCreateTicket(dispatch);

  console.log('LOADING :: ' + loading);

  const submitTicket = () => {
    console.log('Ticket Creating....');
    if (subjectVal.length < 2 || messageVal.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Enter required fields',
      });
    } else {
      dispatch(createTicket(subjectVal, messageVal, ACCESS_TOKEN.data));
      console.log('Ticket Created');
    }
  };

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.mainCointer,
      }}>
      <ScrollView>
        {/** Content Parent Container */}

        <View
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
            ...styles.contentTopConatainer,
          }}>
          {/** Content Container */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: heightPercentageToDP(3),
              backgroundColor: COLORS.green,
            }}
            className=" rounded-full ">
            <AntDesign
              name="customerservice"
              size={heightPercentageToDP(4)}
              color={COLORS.white}
              style={{alignSelf: 'center'}}
            />
          </View>

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.title,
            }}>
            Welcome to crypto Money HelpDesk
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.subtitle,
            }}>
            If you have any issue, open a ticket
          </Text>
        </View>

        <View
          style={{
            margin: heightPercentageToDP(2),
          }}>
          <Text style={styles.subSubTitle}>Subject</Text>
          <TextInput
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              borderColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.inputContainer,
              textAlign: 'left',
            }}
            placeholder="Enter your subject"
            placeholderTextColor={
              THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
            }
            onChangeText={setSubject}
            value={subjectVal}
          />

          <Text style={styles.subSubTitle}>Message</Text>
          <TextInput
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              borderColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.messageInputContainer,
              textAlign: 'left',
              textAlignVertical: 'top',
            }}
            placeholder="Enter your message"
            placeholderTextColor={
              THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
            }
            onChangeText={setMessage}
            value={messageVal}
            multiline={true}
            scrollEnabled={true}
          />
        </View>

        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: heightPercentageToDP(3),
            }}>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
        ) : (
          <TouchableOpacity onPress={submitTicket} activeOpacity={0.8}>
            <Text style={styles.addTicket}>Add Ticket</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateTicket;

const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
  },
  contentTopConatainer: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
    gap: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2.5),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  subSubTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(2),
  },
  addTicket: {
    color: COLORS.white,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    backgroundColor: COLORS.green,
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    textAlign: 'center',
    overflow: 'hidden'
  },
  inputContainer: {
    width: '95%',
    lineHeight: 20,
    fontFamily: FONT.regular,
    padding: 10,
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    marginEnd: 10,
  },
  messageInputContainer: {
    height: heightPercentageToDP(20),
    lineHeight: 20,
    fontFamily: FONT.regular,
    padding: 10,
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    marginEnd: 10,
  },
});

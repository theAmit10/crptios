import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';
import {COLORS, FONT} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchCoinMarket} from '../../stores/coinMarketSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TradeListing = () => {
  const navigation = useNavigation();

  const THEME = useSelector(state => state.theme);
  console.log('THEME : ' + THEME.data);

  const dispatch = useDispatch();

  const coins = useSelector(state => state.coinMarket.coins);

  useDispatch(() => {
    dispatch(fetchCoinMarket());
    console.log('Hey FROM EFFECt');
    coins.map(c => {
      console.log('DATA : ' + c.name);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: widthPercentageToDP(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            name={'arrowleft'}
            size={heightPercentageToDP(3)}
            color={THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.searchInput,
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            }}
            placeholder="Search"
            placeholderTextColor={COLORS.gray2}></TextInput>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{}}
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.gray
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.green
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  height: heightPercentageToDP(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  marginVertical: heightPercentageToDP(1),
                  borderRadius: heightPercentageToDP(1),
                  padding: heightPercentageToDP(1),
                  marginHorizontal: heightPercentageToDP(1),
                }}
                // on press
                // onPress={() => setSelectedCoin(item)}
              >
                {/** LOGO */}
                <View
                  style={{
                    width: widthPercentageToDP(15),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
                      padding: heightPercentageToDP(1),
                    }}
                    className="rounded-full ">
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </View>

                {/** NAME */}

                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                      fontFamily: FONT.semibold,
                      fontSize: heightPercentageToDP(2),
                    }}>
                    {item.name}
                  </Text>
                </View>

                {/** RIGHT CONTAINER */}

                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: heightPercentageToDP(1.5),
                      color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                      fontFamily: FONT.regular,
                    }}>
                    {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 10}}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default TradeListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    height: heightPercentageToDP(10),

    flexDirection: 'row',
    padding: heightPercentageToDP(1),
  },
  searchInput: {
    alignSelf: 'stretch',
    borderRadius: heightPercentageToDP(2),
    paddingStart: heightPercentageToDP(1),
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentContainerLeft: {
    flex: 1,
    backgroundColor: 'pink',
  },
  contentContainerRight: {
    flex: 1,
    backgroundColor: 'green',
  },
});

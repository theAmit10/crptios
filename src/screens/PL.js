import {View} from 'react-native';
import React from 'react';
import HeaderTop from '../component/profile/HeaderTop';
import TabGainerLooser from '../navigation/TabGainerLooser';

const PL = () => {
  return (
    <View className="flex-1">
      <HeaderTop value={'Top Gainer & Top Looser'} />
      <TabGainerLooser />
    </View>
  );
};

export default PL;

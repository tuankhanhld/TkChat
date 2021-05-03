import React from 'react';
import {Dimensions, Image, ImageBackground, View} from 'react-native';
import {Colors} from '../../../shared/styles';

type Props = {
  bgPhotoUrl: string;
};

const width = Dimensions.get('window').width;

export default function AddStoryCard({bgPhotoUrl}: Props) {
  return (
    <View
      style={{
        width: width / 3,
        height: 200,
        paddingRight: 10,
      }}>
      <ImageBackground
        imageStyle={{width: '100%', height: '100%', borderRadius: 10}}
        resizeMethod={'resize'}
        source={require('assets/imgs/status_bg_test.png')}
        style={{flex: 1}}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            padding: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            top: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>
          <Image source={require('assets/imgs/plus_icon.png')} />
        </View>
      </ImageBackground>
    </View>
  );
}

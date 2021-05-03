import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../shared/styles';

type Props = {
  userStory: any;
  mode: 'CREATE' | 'VIEW';
};

const width = Dimensions.get('window').width;

export default function StoryCard({userStory, mode}: Props) {
  return (
    <TouchableOpacity
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
        {mode === 'VIEW' ? (
          <View style={styles.avatarContainer}>
            <Image source={require('assets/imgs/avtar_story.png')} />
          </View>
        ) : (
          <View style={styles.addIconContainer}>
            <Image source={require('assets/imgs/plus_icon.png')} />
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    padding: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.STORY_DASHED,
    top: 5,
  },
  addIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    top: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

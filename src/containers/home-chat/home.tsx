import React from 'react';
import {View} from 'native-base';
import StoryCard from './components/story-card';
import {ScrollView} from 'react-native';
import HomeTopTabsNavigator from '../../navigatiors/AppHomeTabs';

type Props = {};

export default function HomeChat(props: Props) {
  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {/*<ScrollView*/}
      {/*  horizontal*/}
      {/*  showsHorizontalScrollIndicator={false}*/}
      {/*  style={{maxHeight: 200}}>*/}
      {/*  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>*/}
      {/*    <StoryCard userStory={'t'} mode={'CREATE'} />*/}
      {/*    <StoryCard userStory={'t'} mode={'VIEW'} />*/}
      {/*    <StoryCard userStory={'t'} mode={'VIEW'} />*/}
      {/*    <StoryCard userStory={'t'} mode={'VIEW'} />*/}
      {/*    <StoryCard userStory={'t'} mode={'VIEW'} />*/}
      {/*  </View>*/}
      {/*</ScrollView>*/}
      <HomeTopTabsNavigator />
    </View>
  );
}

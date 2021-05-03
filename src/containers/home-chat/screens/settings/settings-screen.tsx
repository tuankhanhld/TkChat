import React from 'react';
import {ScrollView} from 'react-native';
import {Body, Button, Icon, Left, ListItem} from 'native-base';
import AppText from '../../../../shared/components/text-builder/AppText';
import {Typography} from '../../../../shared/styles';

export default function SettingsScreen() {
  return (
    <ScrollView>
      <ListItem itemDivider>
        <AppText style={Typography.FONT_BOLD}>Personalize</AppText>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button>
            <Icon active name="notifications" />
          </Button>
        </Left>
        <Body>
          <AppText>Manage Notification</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon
              type={'MaterialCommunityIcons'}
              active
              name="form-textbox-password"
            />
          </Button>
        </Left>
        <Body>
          <AppText>Change Password</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'MaterialIcons'} active name="history" />
          </Button>
        </Left>
        <Body>
          <AppText>Clear History</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'MaterialIcons'} active name="favorite" />
          </Button>
        </Left>
        <Body>
          <AppText>Clear Favorites</AppText>
        </Body>
      </ListItem>
      <ListItem itemDivider>
        <AppText style={Typography.FONT_BOLD}>About and Information</AppText>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'MaterialIcons'} active name="library-books" />
          </Button>
        </Left>
        <Body>
          <AppText>Terms and Conditions</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'MaterialIcons'} active name="security" />
          </Button>
        </Left>
        <Body>
          <AppText>Privacy Policy</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'MaterialIcons'} active name="group" />
          </Button>
        </Left>
        <Body>
          <AppText>About Us</AppText>
        </Body>
      </ListItem>
      <ListItem itemDivider>
        <AppText style={Typography.FONT_BOLD}>Feedback and Support</AppText>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'AntDesign'} active name="message1" />
          </Button>
        </Left>
        <Body>
          <AppText>Contact Us</AppText>
        </Body>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: '#007AFF'}}>
            <Icon type={'FontAwesome'} active name="support" />
          </Button>
        </Left>
        <Body>
          <AppText>Support</AppText>
        </Body>
      </ListItem>
    </ScrollView>
  );
}

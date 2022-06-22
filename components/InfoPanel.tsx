import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated} from "react-native";
import { ListItem } from 'react-native-elements'
import {BlurView} from "expo-blur";
import {Icon} from "@rneui/base";
import {Linking} from 'react-native'


const InfoPanel = (props) => {
  return (
    <BlurView intensity={50} style={[props?.style, styles.blurViewStyles]}>
      <View style={{width:'100%'}} >
        <Text style={{fontSize: 19, lineHeight: 20, fontWeight: 'bold'}}>{props.name || 'Name'}</Text>

        <ListItem containerStyle={styles.containerStyle} bottomDivider>
          <Icon name={'place'} />
          <ListItem.Content>
            <ListItem.Title style={{fontSize:14}}>{props.address || ''}</ListItem.Title>
            <ListItem.Subtitle style={{fontSize:11}}>{props.originalAddress || ''}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem containerStyle={styles.containerStyle}>
          <Icon name={'phone'} />
          <ListItem.Content>
            <ListItem.Title>
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:' + props.pharmacyPhone)}>
                <Text>
                  {props.pharmacyPhone || ''}
                </Text>
              </TouchableOpacity>
            </ListItem.Title>

            <ListItem.Title>
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:' + props.homePhone)}>
                <Text>
                  {props.homePhone || ''}
                </Text>
              </TouchableOpacity>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurViewStyles: {
    width: '100%',
    height: 200,
    position: 'absolute',
    bottom:0,
    padding: 12,
  },
  containerStyle: {
    backgroundColor:"transparent",
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default InfoPanel;
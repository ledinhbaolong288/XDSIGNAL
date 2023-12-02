/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNewStory, postDataGlobal } from '../../services/requests';
import styles from "./styles";
import { SvgUri } from 'react-native-svg';
import { A } from '@expo/html-elements';
import StockTrend from '../StockTrend';
import Banner from '../Banner';
import Service from '../Service';
import { timeAgo } from '../../utils/commonUtils';

export default function NewStory() {


  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const storiesData = await getNewStory();
    setStories(storiesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const data = stories.items

  const getHeader = () => {
    return (
      <View style={{ width: "100%", display: 'flex', alignItems: "center", paddingHorizontal: 15, paddingTop: 6 }}>
        <Banner />
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.containerStoryLeft}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {item.relatedSymbols[0].logoid != null ?
                <SvgUri
                  width="18"
                  height="18"
                  uri={`https://s3-symbol-logo.tradingview.com/${item.relatedSymbols[0].logoid}.svg`}
                />
                : <View style={styles.logoNull}>
                  <Text style={styles.txtTimeAgo}>X</Text>
                </View>}
              <Text style={styles.txtTimeAgo}>
                {timeAgo(item.published * 1000)}
              </Text>
            </View>
            <A href={`https://www.tradingview.com${item.storyPath}`}>
              <Text style={styles.txtTitle} numberOfLines={2} ellipsizeMode='tail'>
                {item.title}
              </Text>
            </A>
          </View>
          <View style={styles.containerStoryRight}>
            <Image width={40} height={40} borderRadius={4} source={{ uri: `https://s3.tradingview.com/news/image/${item.previewImage.id}-resized.jpeg` }} />
          </View>
        </View>

      )}
      numColumns={1}
      keyExtractor={(item, index) => index}
      ListHeaderComponent={getHeader}
    />
  )
};
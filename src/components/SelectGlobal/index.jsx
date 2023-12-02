/* eslint-disable no-undef */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, FlatList, RefreshControl, Pressable } from 'react-native';
import { getDataForexs, getDataPrice } from '../../services/requests';
import CoinItem from '../CoinItem';
import Banner from '../Banner';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { onValue, ref } from 'firebase/database';
import { FIREBASE_DBR } from '../../../firebaseConfig';

export default function SelectGlobal(props) {
  const {
    vip, timeFrame, getValue
  } = props;

  const { t } = useTranslation();
  const db = FIREBASE_DBR;

  const dataFilter = [
    {
      title: t('active'),
    },
    {
      title: '1d',
    },
    {
      title: '7d',
    },
    {
      title: '1m',
    },
    {
      title: '2m',
    },
    {
      title: '3m',
    },
    {
      title: '1y',
    }
  ]

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(timeFrame);
  const [reload, setReload] = useState(0);

  // 1d
  const oneDay = Moment(new Date(new Date().valueOf() - 86400000)).format("YYYY-MM-DD")
  // // 7d
  const sevenDay = Moment(new Date(new Date().valueOf() - 604800000)).format("YYYY-MM-DD")
  // // 1m
  const oneMonth = Moment(new Date(new Date().valueOf() - 2592000000)).format("YYYY-MM-DD")
  // // 2m
  const twoMonth = Moment(new Date(new Date().valueOf() - 5184000000)).format("YYYY-MM-DD")
  // // 3m
  const threeMonth = Moment(new Date(new Date().valueOf() - 7776000000)).format("YYYY-MM-DD")
  // // 1y
  const oneYear = Moment(new Date(new Date().valueOf() - 31536000000)).format("YYYY-MM-DD")
  // 2y
  const twoYear = Moment(new Date(new Date().valueOf() - 63072000000)).format("YYYY-MM-DD")

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getDataForexs(btn === 1 ? oneDay : btn === 2 ? sevenDay : btn === 3 ? oneMonth : btn === 4 ? twoMonth : btn === 5 ? threeMonth : btn === 6 ? oneYear : twoYear, btn === 0 ? 1 : 2);
    setCoins(coinsData);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getDataForexs(btn === 1 ? oneDay : btn === 2 ? sevenDay : btn === 3 ? oneMonth : btn === 4 ? twoMonth : btn === 5 ? threeMonth : btn === 6 ? oneYear : twoYear, btn === 0 ? 1 : 2);
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    const startCountRef = ref(db, "reload");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      setReload(data)
    })
  }, [])

  useEffect(() => {
    fetchCoins();
  }, [btn, reload]);

  useEffect(() => {
    setBtn(timeFrame), fetchCoinsSeting(timeFrame);
  }, [reload]);

  const fetchCoinsSeting = async (btn) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getDataForexs(btn === 1 ? oneDay : btn === 2 ? sevenDay : btn === 3 ? oneMonth : btn === 4 ? twoMonth : btn === 5 ? threeMonth : btn === 6 ? oneYear : oneMonth, btn === 0 ? 1 : 2);
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchCoins();
    }, 60000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [btn]);


  const getHeader = () => {
    return (
      <>
        <Banner />
        {vip > 0 &&
          <View style={styles.containerFilter}>
            {dataFilter.map((item, index) =>
              <Pressable
                onPress={() => setBtn(index)}
              >
                <Text style={[styles.txt, {
                  backgroundColor: index === btn ? '#2962ff' : 'rgba(58,58,71,0.5)'
                }]}>{item.title}</Text>
              </Pressable>

            )}
          </View>
        }
      </>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={coins?.id}
        data={coins}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <CoinItem marketCoin={item} vipUpdate={vip} getValue={getValue}/>
        )
        }
        onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
        ListHeaderComponent={getHeader}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100
  },
  containerFilter: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  }
});
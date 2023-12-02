/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { getPriceQuote } from '../../services/requests';
import Banner from '../Banner';
import moment from 'moment';
import { t } from 'i18next';
import { MaterialIcons } from '@expo/vector-icons';
import QuoteOLHC from '../QuoteOLHC';

export default function PriceQuote(props) {

  const dataFilterTitle = [
    {
      title: 'H1',
    },
    {
      title: 'H4',
    },
    {
      title: 'Daily',
    }
  ];

  const dataFilterTitleTime = [
    {
      title: 'Current',
    },
    {
      title: 'Last',
    }
  ];

  const dataFilterFunc = [
    {
      title: 'None',
    },
    {
      title: 'Open',
    },
    {
      title: 'Low',
    },
    {
      title: 'High',
    },
    {
      title: 'Close',
    }
  ]



  const { data, coinsUser, count, countData } = props
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getPriceQuote(data.toString());
    setCoins(coinsData.quotes);
    setLoading(false);
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchCoins();
    }, count);
    return () => {
      clearInterval(intervalCall);
    };
  }, [data?.toString()])

  const [btn, setBtn] = useState(0);
  const [btnFunc, setBtnFunc] = useState(4);
  const [btnTime, setBtnTime] = useState(1);

  const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Banner />
          <View style={[styles.containerFilter, { flexDirection: 'column' }]}>
            <View style={styles.containerFilter}>
              {dataFilterTitle.map((item, index) =>
                <Pressable
                  style={{ width: "20%" }}
                  onPress={() => setBtn(index)}
                >
                  {btnFunc === 0 ?
                    <Text style={[styles.txt, {
                      backgroundColor: 'rgba(58,58,71,0.5)',
                    }]}>{item.title}</Text>
                    : <Text style={[styles.txt, {
                      backgroundColor: index === btn ? '#2962ff' : 'rgba(58,58,71,0.5)',
                    }]}>{item.title}</Text>
                  }
                </Pressable>

              )}
              {dataFilterTitleTime.map((item, index) =>
                <Pressable
                  style={{ width: "20%" }}
                  onPress={() => setBtnTime(index)}
                >
                  {btnFunc === 0 ?
                    <Text style={[styles.txt, {
                      backgroundColor: 'rgba(58,58,71,0.5)'
                    }]}>{item.title}</Text>
                    : <Text style={[styles.txt, {
                      backgroundColor: index === btnTime ? '#2962ff' : 'rgba(58,58,71,0.5)'
                    }]}>{item.title}</Text>}
                </Pressable>

              )}
            </View>
            <View style={[styles.containerFilter, { marginTop: 0 }]}>
              {dataFilterFunc.map((item, index) =>
                <Pressable
                  style={{ width: "20%" }}
                  onPress={() => setBtnFunc(index)}
                >
                  <Text style={[styles.txt, {
                    backgroundColor: index === btnFunc ? '#2962ff' : 'rgba(58,58,71,0.5)',
                  }]}>{item.title}</Text>
                </Pressable>

              )}
            </View>
          </View>
          {(btn === 0 && btnTime === 1 && btnFunc === 0) ?
            <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <MaterialIcons name="error-outline" size={30} color="#F3B664" />
              <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not data')}</Text>
            </View>
            : (btn === 2 && btnTime === 0 && btnFunc === 0) ?
              <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <MaterialIcons name="error-outline" size={30} color="#F3B664" />
                <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not data')}</Text>
              </View>
              : btnTime === 0 && btnFunc === 1 ?
                <FlatList
                  key={coins?.id}
                  data={coins}
                  nestedScrollEnabled={true}
                  renderItem={({ item, index }) => (
                    <QuoteOLHC itemQuote={item}
                      last={item.mid} time={date} open={item.mid} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                    />
                  )
                  }
                  onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                />
                : btnTime === 0 && btnFunc === 2 ?
                  <FlatList
                    key={coins?.id}
                    data={coins}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <QuoteOLHC itemQuote={item}
                        last={item.bid} time={date} open={item.bid} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                      />
                    )
                    }
                    onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                  />
                  : btnTime === 0 && btnFunc === 3 ?
                    <FlatList
                      key={coins?.id}
                      data={coins}
                      nestedScrollEnabled={true}
                      renderItem={({ item, index }) => (
                        <QuoteOLHC itemQuote={item}
                          last={item.ask} time={date} open={item.ask} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                        />
                      )
                      }
                      onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                    />
                    : btnTime === 0 && btnFunc === 4 ?
                      <FlatList
                        key={coins?.id}
                        data={coins}
                        nestedScrollEnabled={true}
                        renderItem={({ item, index }) => (
                          <QuoteOLHC itemQuote={item}
                            last={coinsUser == null ? 0 : coinsUser[index]?.close_h1_last} time={date} open={coinsUser == null ? 0 : coinsUser[index]?.close_h1_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                          />
                        )
                        }
                        onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                      />
                      : btn === 0 && btnTime === 1 && btnFunc === 1 ?
                        <FlatList
                          key={coins?.id}
                          data={coins}
                          nestedScrollEnabled={true}
                          renderItem={({ item, index }) => (
                            <QuoteOLHC itemQuote={item}
                              last={coinsUser == null ? 0 : coinsUser[index]?.open_h1_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h1} open={coinsUser == null ? 0 : coinsUser[index]?.open_h1_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                            />
                          )
                          }
                          onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                        />
                        : btn === 0 && btnTime === 1 && btnFunc === 2 ?
                          <FlatList
                            key={coins?.id}
                            data={coins}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) => (
                              <QuoteOLHC itemQuote={item}
                                last={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h1} open={coinsUser == null ? 0 : coinsUser[index]?.open_h1_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                              />
                            )
                            }
                            onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                          />
                          : btn === 0 && btnTime === 1 && btnFunc === 3 ?
                            <FlatList
                              key={coins?.id}
                              data={coins}
                              nestedScrollEnabled={true}
                              renderItem={({ item, index }) => (
                                <QuoteOLHC itemQuote={item}
                                  last={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h1} open={coinsUser == null ? 0 : coinsUser[index]?.open_h1_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                                />
                              )
                              }
                              onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                            />
                            : btn === 0 && btnTime === 1 && btnFunc === 4 ?
                              <FlatList
                                key={coins?.id}
                                data={coins}
                                nestedScrollEnabled={true}
                                renderItem={({ item, index }) => (
                                  <QuoteOLHC itemQuote={item}
                                    last={coinsUser == null ? 0 : coinsUser[index]?.close_h1_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h1} open={coinsUser == null ? 0 : coinsUser[index]?.open_h1_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h1_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h1_last}
                                  />
                                )
                                }
                                onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                              />
                              : btn === 1 && btnTime === 1 && btnFunc === 0 ?
                                <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                  <MaterialIcons name="error-outline" size={30} color="#F3B664" />
                                  <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not data')}</Text>
                                </View>
                                : btn === 1 && btnTime === 1 && btnFunc === 1 ?
                                  <FlatList
                                    key={coins?.id}
                                    data={coins}
                                    nestedScrollEnabled={true}
                                    renderItem={({ item, index }) => (
                                      <QuoteOLHC itemQuote={item}
                                        last={coinsUser == null ? 0 : coinsUser[index]?.open_h4_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h4} open={coinsUser == null ? 0 : coinsUser[index]?.open_h4_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h4_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h4_last}
                                      />
                                    )
                                    }
                                    onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                  />
                                  : btn === 1 && btnTime === 1 && btnFunc === 2 ?
                                    <FlatList
                                      key={coins?.id}
                                      data={coins}
                                      nestedScrollEnabled={true}
                                      renderItem={({ item, index }) => (
                                        <QuoteOLHC itemQuote={item}
                                          last={coinsUser == null ? 0 : coinsUser[index]?.low_h4_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h4} open={coinsUser == null ? 0 : coinsUser[index]?.open_h4_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h4_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h4_last}
                                        />
                                      )
                                      }
                                      onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                    />
                                    : btn === 1 && btnTime === 1 && btnFunc === 3 ?
                                      <FlatList
                                        key={coins?.id}
                                        data={coins}
                                        nestedScrollEnabled={true}
                                        renderItem={({ item, index }) => (
                                          <QuoteOLHC itemQuote={item}
                                            last={coinsUser == null ? 0 : coinsUser[index]?.high_h4_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h4} open={coinsUser == null ? 0 : coinsUser[index]?.open_h4_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h4_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h4_last}
                                          />
                                        )
                                        }
                                        onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                      />
                                      : btn === 1 && btnTime === 1 && btnFunc === 4 ?
                                        <FlatList
                                          key={coins?.id}
                                          data={coins}
                                          nestedScrollEnabled={true}
                                          renderItem={({ item, index }) => (
                                            <QuoteOLHC itemQuote={item}
                                              last={coinsUser == null ? 0 : coinsUser[index]?.close_h4_last} time={coinsUser == null ? 0 : coinsUser[index]?.time_h4} open={coinsUser == null ? 0 : coinsUser[index]?.open_h4_last} low={coinsUser == null ? 0 : coinsUser[index]?.low_h4_last} high={coinsUser == null ? 0 : coinsUser[index]?.high_h4_last}
                                            />
                                          )
                                          }
                                          onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                        />
                                        : btn === 2 && btnTime === 1 && btnFunc === 0 ?
                                          <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                            <MaterialIcons name="error-outline" size={30} color="#F3B664" />
                                            <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not data')}</Text>
                                          </View>
                                          : btn === 2 && btnTime === 1 && btnFunc === 1 ?
                                            <FlatList
                                              key={coins?.id}
                                              data={coins}
                                              nestedScrollEnabled={true}
                                              renderItem={({ item, index }) => (
                                                <QuoteOLHC itemQuote={item}
                                                  last={coinsUser == null ? 0 : coinsUser[index]?.open} time={coinsUser == null ? 0 : coinsUser[index]?.time} open={coinsUser == null ? 0 : coinsUser[index]?.open} low={coinsUser == null ? 0 : coinsUser[index]?.low} high={coinsUser == null ? 0 : coinsUser[index]?.high}
                                                />
                                              )
                                              }
                                              onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                            />
                                            : btn === 2 && btnTime === 1 && btnFunc === 2 ?
                                              <FlatList
                                                key={coins?.id}
                                                data={coins}
                                                nestedScrollEnabled={true}
                                                renderItem={({ item, index }) => (
                                                  <QuoteOLHC itemQuote={item}
                                                    last={coinsUser == null ? 0 : coinsUser[index]?.low} time={coinsUser == null ? 0 : coinsUser[index]?.time} open={coinsUser == null ? 0 : coinsUser[index]?.open} low={coinsUser == null ? 0 : coinsUser[index]?.low} high={coinsUser == null ? 0 : coinsUser[index]?.high}
                                                  />
                                                )
                                                }
                                                onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                              />
                                              : btn === 2 && btnTime === 1 && btnFunc === 3 ?
                                                <FlatList
                                                  key={coins?.id}
                                                  data={coins}
                                                  nestedScrollEnabled={true}
                                                  renderItem={({ item, index }) => (
                                                    <QuoteOLHC itemQuote={item}
                                                      last={coinsUser == null ? 0 : coinsUser[index]?.high} time={coinsUser == null ? 0 : coinsUser[index]?.time} open={coinsUser == null ? 0 : coinsUser[index]?.open} low={coinsUser == null ? 0 : coinsUser[index]?.low} high={coinsUser == null ? 0 : coinsUser[index]?.high}
                                                    />
                                                  )
                                                  }
                                                  onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                                />
                                                : btn === 2 && btnTime === 1 && btnFunc === 4 ?
                                                  <FlatList
                                                    key={coins?.id}
                                                    data={coins}
                                                    nestedScrollEnabled={true}
                                                    renderItem={({ item, index }) => (
                                                      <QuoteOLHC itemQuote={item}
                                                        last={coinsUser == null ? 0 : coinsUser[index]?.close} time={coinsUser == null ? 0 : coinsUser[index]?.time} open={coinsUser == null ? 0 : coinsUser[index]?.open} low={coinsUser == null ? 0 : coinsUser[index]?.low} high={coinsUser == null ? 0 : coinsUser[index]?.high}
                                                      />
                                                    )
                                                    }
                                                    onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
                                                  />
                                                  : <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                                    <MaterialIcons name="error-outline" size={30} color="#F3B664" />
                                                    <Text style={[styles.txtDescription, { fontSize: 16, marginTop: 10, color: "#F3B664" }]}>{t('not data')}</Text>
                                                  </View>
          }
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFilter: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    paddingVertical: 6,
    width: "100%",
    textAlign: "center"
  },
  color: '#FFF',
  fontWeight: '600',
  fontStyle: 'normal',
  fontSize: 14
});
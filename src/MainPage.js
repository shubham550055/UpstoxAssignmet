import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { FontStyle } from "./FontStyle";
import Header from "./Header";
import Constant from "./MainUrl";
import String from "./String";

const MainPage = () => {
  const [sharelistdata, setsharelistdata] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMainPageData = () => {
    return fetch(Constant.MainUrl)
      .then((response) => {
        response
          .json()
          .then((resjson) => {
            setsharelistdata(resjson.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("error", error);
          });
      })

      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    getMainPageData();
  }, []);

  let currentValue = sharelistdata.reduce((accumulator, { ltp, quantity }) => {
    return accumulator + ltp * quantity;
  }, 0);
  let totalInvestment = sharelistdata.reduce(
    (accumulator, { avg_price, quantity }) => {
      return accumulator + avg_price * quantity;
    },
    0
  );
  let totalPL = currentValue - totalInvestment;
  let todayPL = sharelistdata.reduce(
    (accumulator, { close, ltp, quantity }) => {
      return accumulator + (close - ltp) * quantity;
    },
    0
  );

  const renderListItem = ({ item, index }) => {
    let avgPrice = item.avg_price;
    let stockQuantity = item.quantity;
    let stockltp = item.ltp;
    let profitLoss = stockQuantity * stockltp - stockQuantity * avgPrice;

    return (
      <View style={styles.stocksListingContainer}>
        <View style={{ flex: 0.5 }}>
          <Text style={FontStyle.B14black}>{item.symbol}</Text>
          <Text style={FontStyle.S14black}>{item.quantity}</Text>
        </View>
        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
          <Text style={FontStyle.S14black}>
            {String.ltp}
            {String.rupees_symbol}
            {item.ltp.toFixed(2)}
          </Text>
          <Text style={FontStyle.S14black}>
            {String.pl}
            {String.rupees_symbol}
            {profitLoss.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  // const EmptyListMassage = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
      <Header />
      {isLoading ? (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color="#930078" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={sharelistdata}
            renderItem={renderListItem}
            key={(item, index) => index.toString()}
            // ListEmptyComponent={EmptyListMassage}
          />
          <View style={styles.portfolioContainer}>
            <View style={{ marginBottom: 20 }}>
              <View style={styles.digit_inline}>
                <Text style={FontStyle.B16black}>{String.cur_value}:</Text>
                <Text style={FontStyle.S16black}>
                  {String.rupees_symbol}
                  {currentValue.toFixed(2)}
                </Text>
              </View>
              <View style={styles.digit_inline}>
                <Text style={FontStyle.B16black}>{String.total_inv}:</Text>
                <Text style={FontStyle.S16black}>
                  {String.rupees_symbol}
                  {totalInvestment.toFixed(2)}
                </Text>
              </View>
              <View style={styles.digit_inline}>
                <Text style={FontStyle.B16black}>{String.today_P_L}:</Text>
                <Text style={FontStyle.S16black}>
                  {String.rupees_symbol}
                  {todayPL.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.digit_inline}>
              <Text style={FontStyle.B16black}>{String.p_l}:</Text>
              <Text style={FontStyle.S16black}>
                {String.rupees_symbol}
                {totalPL.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  stocksListingContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#D3D3D3",
  },
  portfolioContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
  },
  digit_inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

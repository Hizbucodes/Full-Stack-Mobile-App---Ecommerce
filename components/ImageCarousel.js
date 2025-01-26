import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COMMON_COLOR } from "../constants/commonColor";

const ImageCarousel = () => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

      flatlistRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, images?.length]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const images = [
    {
      id: "1",
      image:
        "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    },
    {
      id: "2",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    },
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image source={{ uri: item.image }} width={screenWidth} height={200} />
      </View>
    );
  };

  const renderDotIndicator = () => {
    return images.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={dot.id}
            style={{
              backgroundColor: COMMON_COLOR.primary,
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={dot.id}
            style={{
              backgroundColor: COMMON_COLOR.secondary,
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      }
    });
  };

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatlistRef}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {renderDotIndicator()}
      </View>
    </View>
  );
};

export default ImageCarousel;

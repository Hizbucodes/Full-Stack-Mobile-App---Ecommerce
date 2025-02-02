import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";

const ImageCarousel = ({
  images,
  autoScrollInterval,
  imageHeight,
  dotActiveColor,
  dotInactiveColor,
  resizeMode,
  showDotIndicator,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

      flatlistRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [activeIndex, images.length, autoScrollInterval]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{
          width: screenWidth,
          height: imageHeight,
          resizeMode: resizeMode,
        }}
      />
    </View>
  );

  const renderDotIndicator = () => {
    return images.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor:
            activeIndex === index ? dotActiveColor : dotInactiveColor,
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ));
  };

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
        {showDotIndicator && renderDotIndicator()}
      </View>
    </View>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ),
  autoScrollInterval: PropTypes.number,
  imageHeight: PropTypes.number,
  dotActiveColor: PropTypes.string,
  dotInactiveColor: PropTypes.string,
};

ImageCarousel.defaultProps = {
  images: [],
  autoScrollInterval: 5000,
  imageHeight: 200,
  dotActiveColor: "#000",
  dotInactiveColor: "#ccc",
};

export default ImageCarousel;

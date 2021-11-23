import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Ionicons, Octicons, AntDesign, Feather } from "@expo/vector-icons";
import { buttonColor } from "../../styles/global";

export const Circle = ({ title, onPress, img }) => {
  return (
    <TouchableOpacity style={styles.circleButtons} onPress={onPress}>
      <Image source={img}></Image>
      <Text style={styles.circleText}>{title}</Text>
    </TouchableOpacity>
  );
};
export const LargeButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.largeButton}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export const LargeButtonRadius = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.largeButtonRadius}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Octicons name="plus-small" size={30} color="black" />
    </TouchableOpacity>
  );
};
export const DecrementButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.quickButtonContainer} onPress={onPress}>
      <Feather name="minus" size={20} color={buttonColor} />
    </TouchableOpacity>
  );
};
export const LinkButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkButton}>{title}</Text>
    </TouchableOpacity>
  );
};
export const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.backButtonContainer}>
        <Ionicons name="ios-arrow-back" size={30} color={"#000"} />
      </View>
    </TouchableOpacity>
  );
};

export const BackButtonRestaurant = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.backButtonRestaurantContainer}>
        <Ionicons name="ios-arrow-back" size={30} color={"#000"} />
      </View>
    </TouchableOpacity>
  );
};

export const QuickButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.quickButtonContainer}>
        <AntDesign name="plus" size={20} color={buttonColor} />
      </View>
    </TouchableOpacity>
  );
};

export const TrackButton = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.trackButton,
        disabled ? { backgroundColor: "transparent", width: 0, height: 0 } : {},
      ]}
    >
      <Text style={styles.trackButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export const SolidButton = ({ onPress, title, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.solidButton, isSelected && styles.selectedBackground]}
    >
      <Text style={styles.solidButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
export const IconButton = ({ onPress, title, isSelected,img }) => {
  return (
    <View style={{justifyContent:"center",alignItems:"center", marginRight: 15}}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.iconButton, isSelected && styles.selectedBackground]}
      >
          <Image source={img} style={styles.iconImage}></Image>
      </TouchableOpacity>
      <Text style={styles.solidButtonTitle}>{title}</Text>
    </View>
  );
};
export const ProduktetButton = ({ onPress, title, isSelected }) => {
  return (
    <View style={{borderRadius: 10,justifyContent:"center",alignItems:"center", marginRight: 15}}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.produktetButton, isSelected && styles.selectedBackgroundProduktet]}
      >
          <Text style={[styles.produktetButtonTitle, isSelected && styles.selectedProduktetTitle]}>{title}</Text>
      </TouchableOpacity>
      
    </View>
  );
};

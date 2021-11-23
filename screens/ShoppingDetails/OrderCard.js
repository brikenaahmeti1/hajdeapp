import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import global, { grayColor } from "../../styles/global";
import moment from "moment";

function formatStatus(status) {
  switch (status) {
    case "PENDING":
      return "Në pritje";
    case "IN_PROGRESS":
      return "Në progres";
    case "ISSUE":
      return "Problem";
    case "COMPLETED":
      return "E kompletuar";
    case "REJECTED":
      return "E refuzuar";
    case "CANCELLED":
      return "E anuluar";
    default:
      return status;
  }
}

export default function UserCard({
  supplier,
  curierName,
  courierPhone,
  status,
  total,
  currency,
  orderDate,
  estimatedArrival,
  courierComment,
  issue,
  clientComment,
}) {
  return (
    <View style={styles.ordersContainer}>
      <Text style={styles.ordersTitle}>Informatat e porosisë</Text>
      {total === 0 ? null : (
        <View
          style={[
            styles.userList,
            {
              borderBottomColor: grayColor,
              borderBottomWidth: 1,
              marginVertical: 5,
            },
          ]}
        >
          <View style={[styles.userList]}>
            <Text style={styles.description}>Totali</Text>
            <Text style={styles.descriptionName}>
              {total} {currency}
            </Text>
          </View>
        </View>
      )}

      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Emri i furnizuesit</Text>
          <Text style={styles.descriptionName}>{supplier}</Text>
        </View>
      </View>

      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Emri i postierit</Text>
          <Text style={styles.descriptionName}>
            {curierName === null ? "Nuk ka të dhëna" : curierName}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Numri i postierit</Text>
          <Text style={styles.descriptionName}>
            {courierPhone === null ? "Nuk ka të dhëna" : courierPhone}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Statusi</Text>
          <Text style={styles.descriptionName}>{formatStatus(status)}</Text>
        </View>
      </View>

      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Data e porosisë</Text>
          <Text style={styles.descriptionName}>
            {moment(new Date(orderDate)).format("DD-MM-YYYY, HH:mm")}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Koha e dërgimit të porosisë</Text>
          <Text style={styles.descriptionName}>
            {estimatedArrival === null
              ? "Nuk ka të dhëna"
              : moment(new Date(estimatedArrival)).format("DD-MM-YYYY, HH:mm")}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Komenti i postierit</Text>
          <Text style={styles.descriptionName}>
            {courierComment === null ? "Nuk ka të dhëna" : courierComment}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.userList,
          {
            borderBottomColor: grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[styles.userList]}>
          <Text style={styles.description}>Komenti i klientit</Text>
          <Text style={styles.descriptionName}>
            {clientComment === undefined ? "Nuk ka të dhëna" : clientComment}
          </Text>
        </View>
      </View>
      {issue === null ? null : (
        <View
          style={[
            styles.userList,
            {
              borderBottomColor: grayColor,
              borderBottomWidth: 1,
              marginVertical: 5,
            },
          ]}
        >
          <View style={[styles.userList]}>
            <Text style={styles.description}>Problemet</Text>
            <Text style={styles.descriptionName}>
              {issue === null ? "Nuk ka të dhëna" : issue}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

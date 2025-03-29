import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { VehiclesAndDestination } from "../../../types/db";
import { COMPANY } from "../../../constants/COMPANY";
import { LOGO } from "../../../assets/images";
import { formatNumber } from "../../../helpers/functions";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    fontSize: 8,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
    border: 1,
    borderColor: "#222222",
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 7,
    alignSelf: "center", // Center the logo horizontally
  },
  section1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  storeTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
    padding: 0,
  },
  verticalTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
    padding: 0,
  },
  verticalRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "222222",
    paddingVertical: 0,
  },
  label: {
    width: "40%",
    backgroundColor: "rgba(0, 100, 0, 0.1)",
    fontWeight: "bold",
    // textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  value: {
    width: "60%",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRight: 1,
    borderLeft: 1,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    flex: 1,
    borderWidth: 1,
    borderColor: "222222",
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 10,
    color: "#888888",
  },
  // signatureStampContainer: {
  //   marginTop: 40,
  // },
  // signatureStamp: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 20,
  // },
  // signatureBox: {
  //   borderTopWidth: 1,
  //   borderTopColor: "#bfbfbf",
  //   width: "45%",
  //   textAlign: "center",
  //   paddingTop: 10,
  // },
  uppercase: {
    textTransform: "uppercase",
  },
  watermark: {
    position: "absolute",
    top: "0%",
    left: "0%",
    right: "-10%",
    bottom: "-10%",
    // bottom: "0%",
    // width: "100%",
    // height: "100%",
    opacity: 0.15, // Set opacity to make it a watermark
    zIndex: -1, // Ensure the watermark is behind the content
  },
  topWaybillNumber: {
    position: "absolute",
    top: 40,
    right: 40,
  },
  signatureStampContainer: {
    flexDirection: "row", // Layout items in a row
    justifyContent: "space-between", // Add space between elements
    alignItems: "flex-start", // Align items at the top
    marginTop: 10,
  },
  officerSection: {
    width: "40%", // Each officer section takes 40% of the width
  },
  officerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  officerName: {
    fontSize: 10,
    marginBottom: 30,
  },
  signatureStamp: {
    flexDirection: "row", // Signature and stamp side by side
    justifyContent: "space-between",
  },
  signatureBox: {
    borderTop: "1pt solid black", // Line for signature or stamp
    width: "70%",
    height: 30, // Adjust height for space
    justifyContent: "flex-end", // Push the text to the bottom
    // alignItems: "center",
    paddingTop: 8,
  },
  qrCodeContainer: {
    width: "20%", // QR code takes 20% of the width
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImage: {
    width: 100,
    height: 100, // Adjust size for the QR code
  },
});

interface ViewInfoProps {
  data: VehiclesAndDestination;
  qrCodeDataUri: string;
}

const ViewInfo: React.FC<ViewInfoProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Add the logo here */}
          <Image src={LOGO} style={styles.logo} /> {/* Update this path */}
          <Text
            style={{
              fontSize: 18, // Larger size for heading
              fontWeight: "bold", // Bold for emphasis
              textTransform: "uppercase", // Uppercase for consistent styling
            }}
          >
            {COMPANY.name} Vehicle Info
          </Text>
          <Text
            style={{
              fontSize: 12, // Smaller size for subheading
              fontWeight: "normal", // Less bold than the heading
              textTransform: "uppercase", // Uppercase for consistency
            }}
          >
            {COMPANY.address}
          </Text>
        </View>
        <View style={{ borderColor: "#222222", borderWidth: 1, padding: 20 }}>
          {/* Vertical Grouped Table */}
          <View style={styles.storeTable}>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>
                {data.destination_stock.warehouse}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {data.destination_stock.warehouse_info.address}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Receiver:</Text>
              <Text style={styles.value}>Store Keeper</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Receiver Phone:</Text>
              <Text style={styles.value}>
                {data.destination_stock.warehouse_info.stock_receiver_phone}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Waybill Number:</Text>
              <Text style={styles.value}>{data.waybill_number}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Other Number:</Text>
              <Text style={styles.value}>{data.other_waybill_number}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Date Loaded:</Text>
              <Text style={styles.value}>{data.date_dispatched}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Item Carried:</Text>
              <Text style={styles.value}>{data.item}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Quantity Carried:</Text>
              <Text style={styles.value}>{formatNumber(data.qty_carried)}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Quantity Received:</Text>
              <Text style={styles.value}>
                {data.qty_received ? formatNumber(data.qty_received) : "--"}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Package Status:</Text>
              <Text style={styles.value}>
                {data.packaged ? "Packaged" : "Not Packaged"}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Item Packaged:</Text>
              <Text style={styles.value}>{data.item_packaged || "--"}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Quantity Packaged:</Text>
              <Text style={styles.value}>
                {data.qty_packaged ? formatNumber(data.qty_packaged) : "--"}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Vehicle Number:</Text>
              <Text style={styles.value}>{data.vehicle_number}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Origin:</Text>
              <Text style={styles.value}>
                {data.from_external_stock
                  ? data.external_origin_stock.stock_purchases.seller
                  : data.origin_stock.warehouse}
              </Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Origin State:</Text>
              <Text style={styles.value}>{data.origin_state}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Transporter:</Text>
              <Text style={styles.value}>{data.transporter}</Text>
            </View>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Transport Fee:</Text>
              <Text style={styles.value}>
                N{data.transport_fee ? formatNumber(data.transport_fee) : "A"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ borderColor: "#222222", borderWidth: 1, padding: 20 }}>
          {/* Vertical Grouped Table */}
          <View style={styles.storeTable}>
            <View style={styles.verticalRow}>
              <Text style={styles.label}>Expense Title:</Text>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.label}>Order Number</Text>
            </View>
            {data.vehicle_expenses.map((expense, index) => (
              <View key={index} style={styles.verticalRow}>
                <Text style={styles.value}>{expense.title}:</Text>
                <Text style={styles.value}>
                  N{formatNumber(expense.amount)}
                </Text>
                <Text style={styles.value}>{expense.description}</Text>
                <Text style={styles.value}>{expense.date}</Text>
                <Text style={styles.value}>{expense.order_number}</Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            padding: 10,
            border: 1,
            borderColor: "#222222",
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            - This Document is a property of Boko Agro Allied Company -
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ViewInfo;

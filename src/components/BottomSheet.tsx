import BottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { StyleSheet } from "react-native";

const CustomBottomSheet = (props: BottomSheetProps) => {
  const snapPoints = useMemo(() => ["58%", "65%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet {...props} ref={bottomSheetRef} style={styles.bottomSheet} snapPoints={snapPoints}>
      {props.children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // "rgba(255, 255, 255, 0.8)",
    padding: 20,
    // minHeight: "50%",
  },
});

export default CustomBottomSheet;

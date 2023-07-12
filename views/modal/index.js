import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useModalStore } from '../../state/useModalStore';
import { useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';
import ModalSettings from '../Settings';
import ModalScanned from '../Scanned';

export default function Modal() {
  const color = useContext(themeContext);
  const { open, type, data, getModalClose } = useModalStore();
  const { modalOpen, modalType, modalData } = useModalStore();
  const [modalHeaderColor, setModalHeaderColor] = useState(color.light);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const dark = useUserStore(state => state.dark)

  useEffect(() => {
    getModalClose(bottomSheetRef);
    if (open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [open]);

  useEffect(() => {
    setModalHeaderColor(color.light);
  }, [dark]);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      modalOpen(false);
      modalType(-1);
      modalData(null);
    }
  }, []);

  const renderContent = () => {
    switch (type) {
      case 0:
        return (
          <ModalSettings
            closeModal={closeModal}
            setModalHeaderColor={setModalHeaderColor}
            // personData={data}
          />
        );
      case 1:
        return (
          <ModalScanned
            closeModal={closeModal}
            setModalHeaderColor={setModalHeaderColor}
            passes={data}
          />
        );
      default:
        return <></>;
    }
  };

  const closeModal = () => {
    bottomSheetRef.current.close();
      modalOpen(false);
      modalType(-1);
      modalData(null);
    };
    
    const onClose = () => {
      modalOpen(false);
      modalType(-1);
      modalData(null);
  };

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        opacity={1.9}
        disappearsOnIndex={-1}
        // pressBehavior='none'
        // onPress={closeModal}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      //** TESTING = Change back to index={-1} */
      index={-1}
      onClose={onClose}
      overDragResistanceFactor={10}
      enableOverDrag={false}
      handleStyle={{
        height: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: modalHeaderColor,
      }}
      onChange={handleSheetChanges}
      backdropComponent={open ? renderBackdrop : null}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: modalHeaderColor,
        borderRadius: 20,
      }}
    >
      {renderContent()}
    </BottomSheet>
  );
}

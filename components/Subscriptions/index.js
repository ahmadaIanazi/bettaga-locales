import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { usePaywallStore } from '../../state/usePaywallStore'
import useRevenueCat from '../../hooks/useRevenueCat';

export default function Subscriptions() {
    const { currentOffers, currentOffering, customerInfo, isSubscribed } = useRevenueCat();
    // const customerInfo = usePaywallStore((state) => state.customerInfo);

    /** LABELS AND TEXT */
    const header_label = 'Subscriptions'
    const header_subtitle = 'All your subscriptions'
    const subscription_title = 'Subscription Title'
    const subscription_expired = 'Expired'
    const subscription_active = 'Active'
    const subscription_price = 'Price'

    const activeSubscriptions = isSubscribed;
    console.log('ACTIVE currentOffers:', currentOffers);

  return (
    <View>

    </View>
  );

}


const styles = StyleSheet.create({

})
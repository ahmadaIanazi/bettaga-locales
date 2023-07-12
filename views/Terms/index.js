import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../widgets/header';

const termsData = [
  'Account Creation: In order to use our Card Builder service, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
  'Subscription Plans: We offer both annual and monthly subscription plans for our Card Builder service, which includes a 7-day free trial. Payment is required at the end of the trial period to continue using the service. You may cancel your subscription at any time by following the instructions on our website.',
  'License: Our Card Builder service grants you a limited, non-exclusive, non-transferable, revocable license to use the software to create and manage digital cards for your business. You may not modify, distribute, or reverse engineer the software.',
  'User Content: You retain ownership of any content you upload or create using our Card Builder service, but grant us a non-exclusive, royalty-free, worldwide license to use, copy, and display such content for the purposes of providing our service to you.',
  'Prohibited Use: You may not use our Card Builder service for any illegal or unauthorized purpose, and must comply with all applicable laws and regulations.',
  'Termination: We reserve the right to terminate or suspend your account at any time, without notice, for any reason, including but not limited to a breach of these Terms.'
];

const privacyData = [
  'Collection of Information: We collect information necessary to provide our Card Builder service, including your name, email address, and payment information. We do not share your information with third parties without your consent, except as required by law.',
  'Use of Information: We use your information to provide our service to you, to communicate with you about your account, and to improve our service. We may also use your information to send you promotional emails or other marketing materials, which you may opt-out of at any time.',
  'Security: We take reasonable measures to protect your information, including using industry-standard security technologies. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the security of your information.',
  'Cookies: We use cookies to improve your user experience and to track usage of our service. You may disable cookies in your browser settings, but some features of our service may not function properly.',
  'Changes to Privacy Policy: We reserve the right to update or modify this Privacy Policy at any time. If we make material changes to this policy, we will notify you by email or by posting a notice on our website.'
];

export default function ScreenTerms(){
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header to={'goBack'} buttonIcon={'close-circle'} />
        <ScrollView>

        <Text style={styles.header}>Terms of Service</Text>
        {termsData.map((term, index) => (
          <Text style={styles.text} key={index}>
            {term}
          </Text>
        ))}
        <Text style={styles.header}>Privacy Policy</Text>
        {privacyData.map((policy, index) => (
          <Text style={styles.text} key={index}>
            {policy}
          </Text>
        ))}
        <View style={{height: 200}}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12
  }
})